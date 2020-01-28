const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Components',
    description: 'Component library for Ziro',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/home/wermeson/Documents/wermeson/ziro/components/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Components',
        description: 'Component library for Ziro',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/wermeson/Documents/wermeson/ziro/components',
          templates:
            '/home/wermeson/Documents/wermeson/ziro/components/node_modules/docz-core/dist/templates',
          docz: '/home/wermeson/Documents/wermeson/ziro/components/.docz',
          cache:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/.cache',
          app: '/home/wermeson/Documents/wermeson/ziro/components/.docz/app',
          appPackageJson:
            '/home/wermeson/Documents/wermeson/ziro/components/package.json',
          gatsbyConfig:
            '/home/wermeson/Documents/wermeson/ziro/components/gatsby-config.js',
          gatsbyBrowser:
            '/home/wermeson/Documents/wermeson/ziro/components/gatsby-browser.js',
          gatsbyNode:
            '/home/wermeson/Documents/wermeson/ziro/components/gatsby-node.js',
          gatsbySSR:
            '/home/wermeson/Documents/wermeson/ziro/components/gatsby-ssr.js',
          importsJs:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/app/imports.js',
          rootJs:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/app/root.jsx',
          indexJs:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/app/index.jsx',
          indexHtml:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/app/index.html',
          db:
            '/home/wermeson/Documents/wermeson/ziro/components/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
