const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['../../../lib/module', {
      mode: 'enterprise',
      siteKey: process.env.RECATPCHA_KEY,
      size: 'invisible',
      hideBadge: false,
      version: 2
    }]
  ],

  serverMiddleware: [
    { path: '/api/check-token', handler: '~/api/recaptcha' }
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
