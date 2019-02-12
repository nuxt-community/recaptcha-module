const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['@@', {
      hideBadge: true,
      siteKey: '6Lfuro4UAAAAAEeQta_WHUy4z25f8tArT0l6wsKo'
    }]
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
