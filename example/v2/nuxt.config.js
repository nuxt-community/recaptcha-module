const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['../../lib/module', {
      siteKey: '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-',
      version: 2,
    }]
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
