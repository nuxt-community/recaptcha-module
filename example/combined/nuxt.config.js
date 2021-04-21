const { resolve } = require('path')

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    ['../../lib/module', {
      hideBadge: true,
      siteKey: [
        '6LecsLIaAAAAAEeBOiX7b4rSwMDNL9zhIXlPNEB1', // v2 site key
        '6LfembIaAAAAACPEdfjUpSmmYqMyJZn-ZU0aFUvb' // v3 site key
      ]
    }]
  ],

  serverMiddleware: [
    { path: '/api/check-token', handler: '~/api/recaptcha' }
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
}
