---
title: "How to use Multiple Git Identities on One Host"
date: 2020-02-26
tags: ['Git']
author: Kevin Custer
excerpt: >-
  If you've ever found the need to make git commits using a different identity based on the repository, you'll
  be glad to hear that it's possible by using folder-specific git identity files and including them in your main
  .gitconfig ... it's quite simple to set up, and this guide will show you how!
---

## Intro

Many of us wear different hats in the development world, and it's very possible that you need to use git in every role - you might work for a company full-time, work for another company part-time, freelance here and there, have some personal projects, contribute to open source software, and... you get the idea.  If you do all of your work from the same machine, you probably don't want to use the same email address in your company commits as you do in your personal project commits, for example.  Here's how to use different Git identities in your projects!

## Folder Structure

You can really set up your folders however you want, as long as you keep your repos organized by identity to be used.  For example, you can have the following structure, where all of your work is organized into subfolders:

```
projects
├── personal
└── work
```

Any commits made to repos inside the `personal` folder should use your **Personal** identity, and any commits made to repos inside the `work` folder should use your **Work** identity.  The main takeaway here is that you should keep your repos separated by identity to use. Simple!

## Create "Identity" Files

The next step is to create identity files to distinguish yourself between your different work areas.  I keep mine inside my home folder next to my main `.gitconfig`, but you can really put them anywhere.  Using the folder structure previously mentioned, we would create the following files and set their identities like so:

#### .gitconfig-personal

```
[user]
	name = Kevin Custer
	email = bigkev@gmail.com
```

#### .gitconfig-work

```
[user]
	name = Kevin Custer
	email = mr.custer@fortune100.com
```

Now we have separate identities to use wherever we want!

## Update .gitconfig

The final step to get this all working is to update the main `.gitconfig` file.  Remove any existing `[user]` section in the file, and add the following in its place:

```
[includeIf "gitdir:~/dev/"]
	path = .gitconfig-personal
[includeIf "gitdir:~/dev-mt/"]
	path = .gitconfig-work
```

All done! Now, the main `.gitconfig` file is including an "extra" bit of config data based on the directory you're working on.

## Extra Credit

This technique doesn't have to stop with conditional identities in Git.  You can define any number of includes that contain differing settings, aliases, etc depending on the directory context you're working from. Tell your friends!