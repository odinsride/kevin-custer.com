# kevin-custer.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/d3bafb5b-8882-461e-890a-99d2135f6300/deploy-status)](https://app.netlify.com/sites/kevin-custer/deploys)

This is my personal blog, resume, and portfolio.  It is built using [Gridsome](https://gridsome.org/) (a Vue static-site framework), which lets me write content in Markdown and publish articles using Git commits.  I am also using the following neat plugins:

* **Tailwind CSS** - the CSS framework
* **@gridsome/plugin-sitemap** - generates the sitemap
* **gridsome-plugin-feed** - generates an RSS feed for syndication
* **vue-disqus** - enables Disqus commenting system on blog articles

The site is deployed to [Netlify](https://netlify.com).

## Usage

This blog is licensed under the [MIT license](LICENSE). Feel free to fork/clone/copy this repository to use as a basis for your own blog. I do recommend that you will change at least the colors and fonts so it doesn't look just like mine :).  

### How to build on your own

1. Make sure you have `gridsome` installed
2. Clone this repository.
3. `cd` into the project directory.
4. Run `yarn` to install dependencies.
5. `gridsome develop` to start a local dev server at `http://localhost:8080`
6. Happy customizing! 🎉🙌
