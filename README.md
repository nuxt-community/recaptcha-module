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

## Runtime config

```js
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_SITE_KEY // for example
    }
  }
}
```

## Usage

### reCAPTCHA v2

1. Add `<recaptcha>` component inside your form:

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

1. Call `init` function inside `mounted` hook of your page

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

3. Call `destroy` function inside `beforeDestroy` hook of the page. (This will remove reCAPTCHA scripts, styles and badge from the page)

```js
beforeDestroy() {
  this.$recaptcha.destroy()
}
```

See: [v3 example](https://github.com/nuxt-community/recaptcha-module/tree/master/example/v3)

### Handling success, expire and error Events on Recaptcha component 

in your vue component where the `<recapcha />` is included you can bind events ` @success, @expires and @error ` to trigger  when the recaptcha is either validate successfully, timedout or triggers an error. Hence, 

```vue
<form @submit.prevent="onSubmit">
  <input autocomplete="true" placeholder="Email" type="email" v-model="email">
  <input autocomplete="current-password" placeholder="Password" type="password" v-model="password">
  <recaptcha @success="onSuccess" @expired="onExpires" @error="onError" />
  <button type="submit">Sign In</button>
</form>
```

in your vue script inside the methods
```js
async onSuccess(token){
  console.log("recaptcha validates successfully with token")
}

async onExpires(){
  console.log("recaptcha validation expires")
}

async onError(message){
  console.log("recaptcha error with message " + message)
}
```

note: the onExpires method does not take any parameter

See: [v2 example](https://github.com/nuxt-community/recaptcha-module/blob/master/example/v2/pages/index.vue)


### Server Side

When you send `data + token` to the server, you should verify the token on the server side to make sure it does not requested from a bot.
You can find out how to verify token on the server side by looking at the [server middleware](https://github.com/nuxt-community/recaptcha-module/tree/master/example/v2/api/recaptcha.js) inside v2 example. (The server side is same for both versions)


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
