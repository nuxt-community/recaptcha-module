const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['../../../lib/module', {
      mode: 'enterprise',

      hideBadge: true,
      siteKey: process.env.RECATPCHA_KEY,

      version: 3
    }]
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
