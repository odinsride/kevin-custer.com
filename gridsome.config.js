// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Kevin Custer',
  siteUrl: 'https://www.kevin-custer.com',

  templates: {
    Project: '/project/:title',
    Post: '/blog/:title',
    Tag: '/tag/:id',
    Job: '/job/:title'
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/projects/*.md',
        typeName: 'Project'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/jobs/*.md',
        typeName: 'Job'
      }
    },    
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/success'],
        config: {
          '/blog/*': {
            changefreq: 'monthly',
            priority: 0.5
          },
          '/portfolio': {
            changefreq: 'monthly',
            priority: 0.7
          },
          '/resume': {
            changefreq: 'monthly',
            priority: 0.8
          },
          '/contact': {
            changefreq: 'yearly',
            priority: 0.9
          },
          '/': {
            changefreq: 'weekly',
            priority: 0.3
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-feed',
      options: {
        contentTypes: ['Post'],
        feedOptions: {
          title: 'Kevin Custer - Blog',
          description: 'A blog about software development, technology, and open source'
        },
        rss: {
          enabled: true,
          output: '/rss.xml'
        },
        nodeToFeedItem: (node) => ({
          title: node.title,
          date: node.date,
          content: node.excerpt,
          author: [
            {
              name: node.author
            }
          ]
        })
      }
    },
    {
      use: "gridsome-plugin-tailwindcss"
    },
    {
      use: 'vee-validate'
    }
  ],
  
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      autolinkHeadings: false,
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}
