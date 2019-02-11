# Google reCAPTCHA

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]

> Simple and easy Google reCAPTCHA integration with Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/recaptcha` dependency with `yarn` or `npm` into your project
2. Add `@nuxtjs/recaptcha` to `modules` section of `nuxt.config.js`
3. Configure it:

```js
{
  modules: [
    [
      '@nuxtjs/recaptcha', {
        /* reCAPTCHA options */
      }
    ],
  ]
}
```

using top level options

```js
{
  modules: [
    '@nuxtjs/recaptcha',
  ],

  recaptcha: {
    /* reCAPTCHA options */
  },
}
```

## Configuration

```js
{
  // ...
  recaptcha: {
    hideBadge: Boolean,    // Hide badge element
    siteKey: String,       // Site key for requests
  },
  // ...
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) mvrlin <mvrlin@pm.me>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/recaptcha.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/recaptcha
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/recaptcha/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/recaptcha
[circle-ci-src]: https://img.shields.io/circleci/project/github/@nuxtjs/recaptcha.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/@nuxtjs/recaptcha
[codecov-src]: https://img.shields.io/codecov/c/github/@nuxtjs/recaptcha.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/@nuxtjs/recaptcha
[david-dm-src]: https://david-dm.org/@nuxtjs/recaptcha/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/@nuxtjs/recaptcha
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
