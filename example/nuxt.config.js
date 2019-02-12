const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['@@', {
      hideBadge: true,
      siteKey: '6LeE3ZAUAAAAANVaDO60w4ZBK44khqO7OpsitZNY'
    }]
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
