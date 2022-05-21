const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['../../../lib/module', {
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
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
