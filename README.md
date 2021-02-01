# Google reCAPTCHA

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Standard JS][standard-js-src]][standard-js-href]

> 🤖 Simple and easy Google reCAPTCHA integration with Nuxt.js

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
    hideBadge: Boolean, // Hide badge element (v3 & v2 via size=invisible)
    language: String,   // Recaptcha language (v2)
    siteKey: String,    // Site key for requests
    version: Number,     // Version
    size: String        // Size: 'compact', 'normal', 'invisible' (v2)
  },
  // ...
}
```

## Usage

### reCAPTCHA v2
1. Add `<recaptcha>` component iside your form:
```vue
<form @submit.prevent="onSubmit">
  <input autocomplete="true" placeholder="Email" type="email" v-model="email">
  <input autocomplete="current-password" placeholder="Password" type="password" v-model="password">
  <recaptcha />
  <button type="submit">Sign In</button>
</form>
```
2. Call `getResponse` inside form submit handler to get reCAPTCHA token:
```js
async onSubmit() {
  try {
    const token = await this.$recaptcha.getResponse()
    console.log('ReCaptcha token:', token)

    // send token to server alongside your form data

    // at the end you need to reset recaptcha
    await this.$recaptcha.reset()
  } catch (error) {
    console.log('Login error:', error)
  }
},
```
See: [v2 example](https://github.com/nuxt-community/recaptcha-module/tree/master/example/v2)

### reCAPTCHA v3
1. Call `init` function inside mounted hook of your page
```js
async mounted() {
  try {
    await this.$recaptcha.init()
  } catch (e) {
    console.error(e);
  }
}
```
2. Call `execute` function form submit handler to get reCAPTCHA token:
```js
async onSubmit() {
  try {
    const token = await this.$recaptcha.execute('login')
    console.log('ReCaptcha token:', token)

    // send token to server alongside your form data

  } catch (error) {
    console.log('Login error:', error)
  }
}
```
See: [v3 example](https://github.com/nuxt-community/recaptcha-module/tree/master/example/v3)

### Server Side
When you send you data + token to your server, you should verify the token on the server side to make sure it does not requested from a bot.
You can find out how to verify token on the server side by looking at the [server middleware](https://github.com/nuxt-community/recaptcha-module/tree/master/example/v2/api/recaptcha.js) inside v2 example. (The server side is same for both version)


## Info Hiding Badges

You're allowed to hide the badge (i.e. for v3 and v2 invisible), as long as you include the recaptcha branding in the user flow.

For example:

```html
<small>This site is protected by reCAPTCHA and the Google 
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
</small>
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
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/recaptcha-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/recaptcha-module
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/recaptcha-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/@nuxtjs/recaptcha
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
