const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-opensourcerepos-gatsby-theme-opensourcerepos-src-pages-index-js": hot(preferDefault(require("/Users/santosh/Projects/opensourcerepos/blogs/node_modules/@opensourcerepos/gatsby-theme-opensourcerepos/src/pages/index.js"))),
  "component---node-modules-opensourcerepos-gatsby-theme-opensourcerepos-src-pages-new-blog-js": hot(preferDefault(require("/Users/santosh/Projects/opensourcerepos/blogs/node_modules/@opensourcerepos/gatsby-theme-opensourcerepos/src/pages/new-blog.js"))),
  "component---node-modules-opensourcerepos-gatsby-theme-opensourcerepos-src-pages-blog-js": hot(preferDefault(require("/Users/santosh/Projects/opensourcerepos/blogs/node_modules/@opensourcerepos/gatsby-theme-opensourcerepos/src/pages/blog.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/santosh/Projects/opensourcerepos/blogs/.cache/dev-404-page.js")))
}

