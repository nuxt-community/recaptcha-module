const { resolve } = require('path');

module.exports = {
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    [
      '../../lib/module',
      {
        siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        size: 'invisible',
        hideBadge: true,
        version: 2
      }
    ]
  ],

  srcDir: __dirname,

  render: { resourceHints: false },
  rootDir: resolve(__dirname, '..')
};
