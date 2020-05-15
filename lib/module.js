'use strict'

const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.recaptcha,
  }

  const siteKeyEnv = options.siteKeyEnvVariable || 'RECAPTCHA_KEY'

  this.addPlugin({
    fileName: 'recaptcha.js',
    options: { ...options, siteKey: options.siteKey || process.env[siteKeyEnv] },
    src: resolve(__dirname, 'plugin.js')
  })

  this.addTemplate({
    fileName: 'recaptcha.vue',
    src: resolve(__dirname, 'recaptcha.vue')
  })
}

module.exports.meta = require('../package.json')
