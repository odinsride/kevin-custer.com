---
title: Demo Post
date: 2020-02-18
published: true
tags: ['Vue']
author: Kevin C
excerpt: >-
  Something clever here
---

Paperclip was an infamous gem in the Rails world which provided file upload capabilities for Rails projects.  The gem was deprecated shortly after the release of Rails 5.2, which included a similar built-in capability known as ActiveStorage. This guide is intended to help with migrating a Rails project using the Paperclip gem (specifically with Amazon S3 storage), to using the recently added **ActiveStorage** feature of Rails 5.2+.

## Summary

The Paperclip to ActiveStorage migration will require 2 Git branches which will need to be deployed in separate phases to your production/staging environment. Here is a summary of what will be covered in this guide:

 * Branch 1
   1. Enable Active Storage
   2. Migrate Paperclip Data
 * Branch 2
   1. Update Config to use ActiveStorage
   2. Update Models, Views, and Controllers
   3. Migrate Attachment Files
   4. Code Cleanup
 * Deploy the Migration
   1. Test!
   2. Deploy Branch 1
   3. Deploy Branch 2


## Assumptions

This guide assumes the following:

* Your project is running on or can easily be upgraded to Rails 5.2 (Not tested in Rails 6)
* Your project uses Postgres as the database (Not tested on other databases)
* Your project uses Paperclip 6.0.0
* Your project uses Amazon S3 for Paperclip storage (although the steps can easily be modified for other services or local storage)
* You are responsible for appropriately testing your codebase before, during, and after going down this migration path :)

## Let's Migrate!

This migration will require 2 branches and a phased deployment to production/staging.  In the first branch, ActiveStorage will be enabled and the existing Paperclip data will be migrated into ActiveStorage format. Because the migration script relies on Paperclip functions, this branch will need to be kept separate and deployed first before Paperclip is removed from the project.

In the second branch, ActiveStorage will be activated, models and views will be updated, and the actual attachments will be copied to the ActiveStorage directory structure.

### Branch 1

#### 1. Enable ActiveStorage

The first step to migrating to ActiveStorage is to enable it in the project. This consists of making sure it's included in the application config, as well as running a rake task to generate a migration which will create the tables necessary for ActiveStorage.

##### Include ActiveStorage in Application Config

```ruby
# config/application.rb
require 'active_storage/engine'
```

Alternatively, if your application config contains:

```ruby
# config/application.rb
require 'rails/all'
```

... then there's nothing you need to change here, you've already included all Rails components :)

##### Generate and Run ActiveStorage Migration

```
$ rails active_storage:install
```

This will generate the migration for the tables needed by ActiveStorage which will include two tables:

* `active_storage_attachements` - holds information about how the attachment relates to a model
* `active_storage_blobs` - holds information about the attachment itself, such as file type, filename, checksum, etc.

Now, run this migration to create the tables.

```
$ rails db:migrate
```

Now that the structure for ActiveStorage is in place, the next step will be to move the data produced by Paperclip file uploads to the new ActiveStorage structure.



#### 2. Migrate Paperclip Data

This step will consist of creating and running a Rake task which will copy all of the data generated from Paperclip file uploads into the new format required by ActiveStorage.

While Paperclip adds attachment columns directly to the Model tables, such as *avatar_file_name*, *avatar_content_type*, etc, ActiveStorage stores this information in the two dedicated tables generated in step 1. 

##### Create a Rake Task
In the `lib/tasks` folder, create a new file named `migrate_paperclip_data.rake`

Paste the following code into the file:

```ruby
# lib/tasks/migrate_paperclip_data.rake
require 'open-uri'

namespace :migrate_paperclip do
  desc 'Migrate the paperclip data'
  task move_data: :environment do
    # Prepare the insert statements
    prepare_statements

    # Eager load the application so that all Models are available
    Rails.application.eager_load!

    # Get a list of all the models in the application
    models = ActiveRecord::Base.descendants.reject(&:abstract_class?)

    # Loop through all the models found
    models.each do |model|
      puts 'Checking Model [' + model.to_s + '] for Paperclip attachment columns ...'

      # If the model has a column or columns named *_file_name,
      # We are assuming this is a column added by Paperclip.
      # Store the name of the attachment(s) found (e.g. "avatar") in an array named attachments
      attachments = model.column_names.map do |c|
        Regexp.last_match(1) if c =~ /(.+)_file_name$/
      end.compact

      # If no Paperclip columns were found in this model, go to the next model
      if attachments.blank?
        puts '  No Paperclip attachment columns found for [' + model.to_s + '].'
        puts ''
        next
      end

      puts '  Paperclip attachment columns found for [' + model.to_s + ']: ' + attachments.to_s

      # Loop through the records of the model, and then through each attachment definition within the model
      model.find_each.each do |instance|
        attachments.each do |attachment|
          # If the model record doesn't have an uploaded attachment, skip to the next record
          next if instance.send(attachment).path.blank?

          # Otherwise, we will convert the Paperclip data to ActiveStorage records
          create_active_storage_records(instance, attachment, model)
        end
      end
      puts ''
    end
  end
end

private

def prepare_statements
  # Get the id of the last record inserted into active_storage_blobs
  # This will be used in the insert to active_storage_attachments
  # Postgres
  get_blob_id = 'LASTVAL()'
  # mariadb
  # get_blob_id = 'LAST_INSERT_ID()'
  # sqlite
  # get_blob_id = 'LAST_INSERT_ROWID()'

  # Prepare two insert statements for the new ActiveStorage tables
  ActiveRecord::Base.connection.raw_connection.prepare('active_storage_blob_statement', <<-SQL)
    INSERT INTO active_storage_blobs (
      key, filename, content_type, metadata, byte_size, checksum, created_at
    ) VALUES ($1, $2, $3, '{}', $4, $5, $6)
  SQL

  ActiveRecord::Base.connection.raw_connection.prepare('active_storage_attachment_statement', <<-SQL)
    INSERT INTO active_storage_attachments (
      name, record_type, record_id, blob_id, created_at
    ) VALUES ($1, $2, $3, #{get_blob_id}, $4)
  SQL
end

def create_active_storage_records(instance, attachment, model)
  puts '    Creating ActiveStorage records for [' +
       model.name + ' (ID: ' + instance.id.to_s + ')] ' +
       instance.send("#{attachment}_file_name") +
       ' (' + instance.send("#{attachment}_content_type") + ')'

  build_active_storage_blob(instance, attachment)
  build_active_storage_attachment(instance, attachment, model)
end

def build_active_storage_blob(instance, attachment)
  # Set the values for the new ActiveStorage records based on the data from Paperclip's fields
  # for active_storage_blobs
  created_at = instance.updated_at.iso8601
  blob_key = key(instance, attachment)
  filename = instance.send("#{attachment}_file_name")
  content_type = instance.send("#{attachment}_content_type")
  file_size = instance.send("#{attachment}_file_size")
  file_checksum = checksum(instance.send(attachment))

  blob_values = [blob_key, filename, content_type, file_size, file_checksum, created_at]

  # Insert the converted blob record into active_storage_blobs
  insert_record('active_storage_blob_statement', blob_values)
end

def build_active_storage_attachment(instance, attachment, model)
  # Set the values for the new ActiveStorage records based on the data from Paperclip's fields
  # for active_storage_attachments
  created_at = instance.updated_at.iso8601
  blob_name = attachment
  record_type = model.name
  record_id = instance.id

  attachment_values = [blob_name, record_type, record_id, created_at]

  # Insert the converted attachment record into active_storage_attachments
  insert_record('active_storage_attachment_statement', attachment_values)
end

def insert_record(statement, values)
  ActiveRecord::Base.connection.raw_connection.exec_prepared(
    statement,
    values
  )
end

def key(_instance, _attachment)
  # Get a new key
  SecureRandom.uuid
  # Alternatively:
  # instance.send("#{attachment}").path
end

def checksum(attachment)
  # Get a checksum for the file (required for ActiveStorage)

  # local files stored on disk:
  # url = "#{Rails.root}/public/#{attachment.path}"
  # Digest::MD5.base64digest(File.read(url))

  # remote files stored on a cloud service:
  url = attachment.url
  Digest::MD5.base64digest(Net::HTTP.get(URI(url)))
end
```

The rake task code is quite long, but I've commented thoroughly so it is clear how it all works. I have also added some logging messages so useful information is displayed while running the rake task.

##### Run the Rake Task

Next, run the rake task from a terminal window:

```
$ rails migrate_paperclip:move_data
Checking Model [User] for Paperclip attachment columns ...
  No Paperclip attachment columns found for [User].

Checking Model [Account] for Paperclip attachment columns ...
  No Paperclip attachment columns found for [Account].

Checking Model [Transaction] for Paperclip attachment columns ...
  Paperclip attachment columns found for [Transaction]: ["receipt"]
    Creating ActiveStorage records for [Transaction (ID: 102)] 2019-07-02_Dusty_Lindgren.png (image/png)
    Creating ActiveStorage records for [Transaction (ID: 103)] 2019-07-08_Mac_Yost.png (image/png)
    Creating ActiveStorage records for [Transaction (ID: 104)] 2019-06-22_Mrs._Kerrie_Anderson.png (image/png)
    Creating ActiveStorage records for [Transaction (ID: 105)] 2019-07-08_Elvis_O'Conner.png (image/png)
    Creating ActiveStorage records for [Transaction (ID: 106)] 2019-07-19_Jessica_Kunde.png (image/png)
```

As stated before, I included some logging statements to the rake script which can be seen here. The rake task will go through each model of the application, look for a Paperclip attachment, and then copy any attachment information found to the new ActiveStorage tables. If you check the 2 ActiveStorage tables using a DB client, you should now see the Paperclip data that was migrated to ActiveStorage format.

Now that the ActiveStorage data is in place, the next step is to create a new branch (from the current branch), and update the application config, models, and views to use ActiveStorage.

### Branch 2

In the second branch, the config files, models, and views will be updated to use ActiveStorage. Additionally, the attachments will need to be relocated to a new directory path structure on the Amazon S3 bucket.

#### 1. Update Config Files

To make the rails app use ActiveStorage, the config files need to be updated as follows. As stated before, this guide is focused specifically on S3 storage, so adjust to your needs.

##### Add Storage Definitions to storage.yml

Replace the values with however you are storing your application secrets. I have a separate S3 bucket set up for development and test instances, which is why there are two storage definitions defined here.

```yaml
# config/storage.yml
amazondev:
  service: S3
  access_key_id: <%= ENV['AWS_ACCESS_KEY_ID'] %>
  secret_access_key: <%= ENV['AWS_SECRET_ACCESS_KEY'] %>
  region: <%= ENV['S3_REGION'] %>
  bucket: <%= ENV['S3_BUCKET_NAME_DEV'] %>

amazon:
  service: S3
  access_key_id: <%= ENV['AWS_ACCESS_KEY_ID'] %>
  secret_access_key: <%= ENV['AWS_SECRET_ACCESS_KEY'] %>
  region: <%= ENV['S3_REGION'] %>
  bucket: <%= ENV['S3_BUCKET_NAME'] %>
```



##### Update Environment Config Files

Next, the environment config files need to be updated to use the storage definitions from *storage.yml*. In this example, `test.rb` will be identical to `development.rb`, so it's omitted from the guide.

```ruby
# config/environments/development.rb
config.active_storage.service = :amazondev

# # Paperclip settings
# config.paperclip_defaults = {
#   storage: :s3,
#   s3_credentials: {
#     bucket: ENV['S3_BUCKET_NAME_DEV'],
#     access_key_id: ENV['AWS_ACCESS_KEY_ID'],
#     secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
#     s3_region: ENV['S3_REGION'],
#     s3_host_name: ENV['S3_HOST_NAME']
#   },
#   s3_protocol: 'https'
# }
```

```ruby
# config/environments/production.rb
config.active_storage.service = :amazon

# # Paperclip settings
# config.paperclip_defaults = {
#   storage: :s3,
#   s3_credentials: {
#     bucket: ENV['S3_BUCKET_NAME'],
#     access_key_id: ENV['AWS_ACCESS_KEY_ID'],
#     secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
#     s3_region: ENV['S3_REGION'],
#     s3_host_name: ENV['S3_HOST_NAME']
#   },
#   s3_protocol: 'https'
# }
```

Note that the Paperclip config settings have been commented out as they are being replaced by the ActiveStorage config. They can be safely removed later after testing.

Now that ActiveStorage has been activated, it's time to update the application's Models, Views, and Controllers.

#### 2. Update Models, Views, and Controllers

Please refer to the [ActiveStorage](https://guides.rubyonrails.org/v5.2/active_storage_overview.html#attaching-files-to-records) documentation for full details, but generally speaking, this is a straightforward process in which you should be changing the following pieces of code:

##### Models

```ruby
has_attached_file :attachment
```

... becomes ...

```ruby
has_one_attached :attachment
```

> ActiveStorage does not presently support native validations, though there are workarounds for this which can be found with some simple searching.  If you are using Paperclip's `validates_attachment_content_type` you will want to either disable this for now, or look into a workaround before proceeding.

If you are using multiple attachments in Paperclip via a helper Model/Controller, ActiveStorage contains an alternative which will negate the need for a helper Model:

```ruby
has_many_attached :attachments
```
---
##### Views

###### exists? becomes attached?

```ruby
@model.attachment.exists?
```

... becomes ...

```ruby
@model.attachment.attached?
```
<br />
###### url(:size) becomes variant(resize: "dimensions")
```ruby
@model.attachment.url(:thumb)
```
... becomes ...

```ruby
@model.attachment.variant(resize: "100x100")
```
<br />
###### .url becomes url_for()

```ruby
@model.attachment.url
```

... becomes ...

```ruby
url_for(@model.attachment)
```
<br />

There are some other handy fields you can reference such as filename, and byte_size:

```ruby
@model.attachment.filename
@model.attachment.bite_size
```
---
##### Controllers

There shouldn't be anything to update in a basic Controller as long as the attachment is listed in the strong parameters:

```ruby
def user_params
  params.require(:user) \
        .permit(:username, :email, :avatar)
end
```

After updating the models, views, and controllers to use ActiveStorage, the Paperclip attachments need to be copied to a directory structure that ActiveStorage understands.

#### 3. Migrate Attachments

A new rake task needs to be created to migrate the Paperclip attachments from a Paperclip directory structure to an ActiveStorage directory structure. A rake task will be created that reads the attachment information from the Paperclip fields, generates the Amazon S3 URL for each record's attachment, and then copies it to the new ActiveStorage location on S3.

In the `lib/tasks` folder, create a new file named `migrate_paperclip_attachments.rake`

Paste the following code into this file:

```ruby
# frozen_string_literal: true

namespace :migrate_paperclip do
  desc 'Migrate the paperclip attachments'
  task move_attachments: :environment do
    # Eager load the application so that all Models are available
    Rails.application.eager_load!

    # Get a list of all the models in the application
    models = ActiveRecord::Base.descendants.reject(&:abstract_class?)

    # Loop through all the models found
    models.each do |model|
      puts 'Checking Model [' + model.to_s + '] for Paperclip attachment columns ...'

      errs = []
      err_ids = []

      # If the model has a column or columns named *_file_name,
      # We are assuming this is a column added by Paperclip.
      # Store the name of the attachment(s) found (e.g. "avatar") in an array named attachments
      attachments = model.column_names.map do |c|
        Regexp.last_match(1) if c =~ /(.+)_file_name$/
      end.compact

      # For each attachment on the model, migrate the attachments
      attachments.each do |attachment|
        migrate_attachment(attachment, model, errs, err_ids)
      end

      next if errs.empty?

      # Display records that have errors
      puts ''
      puts 'Errored attachments:'
      puts ''

      errs.each do |err|
        puts err
      end

      # Display list of errored attachment IDs
      puts ''
      puts 'Errored attachments list of IDs (use for SQL statements)'
      puts err_ids.join(',')
      puts ''
    end
  end
end

private

def migrate_attachment(attachment, model, errs, err_ids)
  model.where.not("#{attachment}_file_name": nil).find_each do |instance|
    # Set the S3 Bucket based on environment
    bucket = Rails.env.production? ? ENV['S3_BUCKET_NAME'] : ENV['S3_BUCKET_NAME_DEV']
    region = ENV['S3_REGION']

    # Set attachment details
    instance_id = instance.id
    filename = instance.send("#{attachment}_file_name")
    extension = File.extname(filename)
    content_type = instance.send("#{attachment}_content_type")
    original = CGI.unescape(filename.gsub(extension, "_original#{extension}"))

    puts '  [' + model.name + ' (ID: ' +
         instance_id.to_s + ')] ' \
         'Copying to ActiveStorage location: ' + original

    # Paperclip stores attachments in a directory structure such as:
    # 000/000/001 = Instance ID 1
    # 000/050/250 = Instance ID 50250
    # 999/999/999 = Instance ID 999999999
    # We need to build the appropriate path to get the correct URL for the attachment
    instance_path = instance_id.to_s.rjust(9, '0')
    instance_path = instance_path.scan(/.{1,3}/).join('/')

    # Build the S3 URL
    url = "https://#{bucket}.s3.#{region}.amazonaws.com/#{model.name.downcase.pluralize}/#{attachment.pluralize}/#{instance_path}/original/#{filename}"
    # puts '    ' + url

    # Copy the original Paperclip attachment to its new ActiveStorage location
    # For debugging/testing purposes, comment out this section and print the URL to log to verify the correctness
    begin
      instance.send(attachment.to_sym).attach(
        io: open(url),
        filename: filename,
        content_type: content_type
      )
    rescue StandardError => e
      puts '    ... error! ...'
      errs.push("[#{model.name}][#{attachment}] - #{instance_id} - #{e}")
      err_ids.push(instance_id)
    end
  end
end
```

Again, I have commented this code so it's easier to understand. This rake task will loop through all models in the application, and for each model containing Paperclip attachment columns, it will then search the model's records for those with attachments.  When a record with an attachment is found, the rake task will then generate the URL of the attachment, and then re-attach that file to the record with the now-enabled ActiveStorage methods, which essentially copies the file on the S3 bucket from the Paperclip path to the ActiveStorage path. 

You may need to modify the URL portion depending on your application environment and S3 settings.

When ready to test, simply execute:

```
$ rails migrate_paperclip:move_attachments
```

You will see some output such as:

```
Checking Model [User] for Paperclip attachment columns ...
Checking Model [Account] for Paperclip attachment columns ...
Checking Model [Transaction] for Paperclip attachment columns ...
  [Transaction (ID: 102)] Copying to ActiveStorage location: 2019-06-27_Janett_Stamm_II_original.png
  [Transaction (ID: 103)] Copying to ActiveStorage location: 2019-07-05_Douglass_Waters_original.png
  [Transaction (ID: 104)] Copying to ActiveStorage location: 2019-06-27_Lore_O'Reilly_original.png
  [Transaction (ID: 105)] Copying to ActiveStorage location: 2019-07-09_Rosamaria_Wehner_original.png
  [Transaction (ID: 106)] Copying to ActiveStorage location: 2019-06-25_Jacquelyne_Crona_original.png
  [Transaction (ID: 1107)] Copying to ActiveStorage location: 2019-06-27_Mr._Lacy_Olson_original.png
  [Transaction (ID: 1108)] Copying to ActiveStorage location: 2019-07-14_Adria_Cormier_original.png
  [Transaction (ID: 1109)] Copying to ActiveStorage location: 2019-06-27_Daron_Considine_original.png
  [Transaction (ID: 1110)] Copying to ActiveStorage location: 2019-07-10_Blair_Walsh_PhD_original.png
  [Transaction (ID: 1111)] Copying to ActiveStorage location: 2019-06-29_Keila_Nicolas_original.png
```

For reference, the URLs generated by this script for my application look like this:

```
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/000/102/original/2019-06-27_Janett_Stamm_II.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/000/103/original/2019-07-05_Douglass_Waters.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/000/104/original/2019-06-27_Lore_O'Reilly.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/000/105/original/2019-07-09_Rosamaria_Wehner.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/000/106/original/2019-06-25_Jacquelyne_Crona.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/001/107/original/2019-06-27_Mr._Lacy_Olson.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/001/108/original/2019-07-14_Adria_Cormier.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/001/109/original/2019-06-27_Daron_Considine.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/001/110/original/2019-07-10_Blair_Walsh_PhD.png
https://#{bucket}.s3.#{region}.amazonaws.com/transactions/attachments/000/001/111/original/2019-06-29_Keila_Nicolas.png
```

-

##### Note on Error Handling

You will notice that some error handling is included in the above rake task which will capture and collect any erroneous records that occur when trying to copy the attachment file. When running the rake task, the IDs of those records will be printed to the console at the end, along with the error message. Additionally, a comma separated list of the instance IDs will also be printed which can easily be copied for use in SQL statements.
 
When running the rake task for my application, I had many errors due to the actual file missing from the S3 bucket. I cannot explain why this happened, but the database was telling the script there is an attachment when the attachment file did not exist. 

The workaround for this (at least for me since the attachments were not critical to recover) was to do some manual data cleanup. I copied the list of erroneous record IDs, and opened up pgAdmin.

I first queried `active_storage_attachments` filtering on the list of erroneous record IDs and on the record type:

```sql
SELECT blob_id
  FROM active_storage_attachments
 WHERE record_type = 'Transaction'
   AND record_id IN ( ... comma-separated list of erroneous record IDs ... )
```

I saved this list of `blob_id` values for later use - they must be deleted but cannot be deleted until the `active_storage_attachments` records are deleted due to an FK constraint.

Next, I deleted the records in `active_storage_attachments` from the first query:

```sql
DELETE
  FROM active_storage_attachments
 WHERE record_type = 'Transaction'
   AND record_id IN ( ... comma-separated list of erroneous record IDs ... )
```

Then, I was able to remove the records in `active_storage_blobs`:

```sql
DELETE
  FROM active_storage_blobs
 WHERE id = ( ... comma-separated list of blob_id values from
```

Finally, as an optional step, I set the original Paperclip fields for these records to NULL:

```sql
UPDATE transactions
   SET attachment_file_name = NULL,
       attachment_content_type = NULL,
       attachment_file_size = NULL,
       attachment_updated_at = NULL
 WHERE id IN ( ... comma-separated list of erroneous record IDs ... )
```
Hopefully you will not run into any issues, but I wanted to share this step for real-world expectations :)

-

If the rake task was successful, our work here is almost finished. It's time to remove the last bits of Paperclip from the application.

#### 4. Code Cleanup

In this final step, the Paperclip gem can be removed from the application's Gemfile, and any commented out Paperclip code can also be removed. I'm assuming you've at least made sure everything is working in Development by this point, right? Go ahead and remove any Paperclip references! :)

### Deploy the Migration

As described before, this migration needs to be done in phases due to the reliance on Paperclip functions in the first rake task. Much of this will be left to you depending on your deployment methodologies and CI setup, but these steps should be adaptable to any situation.

#### 1. Test!

Testing is always important in any application change, much less a large change such as this. Before migrating to production, make sure to do lots of unit testing, [update your RSpec tests](https://github.com/thoughtbot/paperclip/blob/master/MIGRATING.md#update-your-tests), and deploy to a staging/test server first.  I would also recommend backing up/duplicating your production S3 bucket prior to performing the deployment.

#### 2. Deploy Branch 1



The first step in deployment will be to deploy branch 1 to production, run the migrations, and then the rake task:

```
$ rails migrate_paperclip:move_data
```

#### 3. Deploy Branch 2

Next, the second branch needs to be deployed to production, and then the second rake task can be run:

```
$ rails migrate_paperclip:move_attachments
```

Once finished, the old Paperclip S3 folder can be removed and your application is now on ActiveStorage!


## References

* [ActiveStorage](https://guides.rubyonrails.org/v5.2/active_storage_overview.html), Rails Guides
* [Migrating from Paperclip to ActiveStorage](https://github.com/thoughtbot/paperclip/blob/master/MIGRATING.md), thoughtbot (Mike Burns)
* [Migrating from Paperclip to ActiveStorage](https://blog.codeminer42.com/migrating-from-paperclip-to-activestorage-b37ef187fb17), Leonardo Negreiros

