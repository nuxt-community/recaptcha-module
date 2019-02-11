'use strict'

const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.recaptcha
  }

  this.addPlugin({
    fileName: 'recaptcha.js',
    options,

    src: resolve(__dirname, 'plugin.js'),
    ssr: false
  })
}

module.exports.meta = require('../package.json')
