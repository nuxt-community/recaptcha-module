import Vue from 'vue'

class ReCaptcha {
  constructor ({ hideBadge, siteKey }) {
    if (!siteKey) {
      throw new Error('ReCaptcha error: No key provided')
    }

    this._ready = false

    this.siteKey = siteKey
    this.hideBadge = hideBadge
  }

  init () {
    if (this._ready) {
      return Promise.resolve()
    }

    const scriptElement = document.createElement('script')
    const styleElement = document.createElement('style')

    scriptElement.addEventListener('error', () => {
      document.head.removeChild(scriptElement)
      throw new Error('ReCaptcha error: Failed to load script')
    })

    scriptElement.setAttribute('async', '')
    scriptElement.setAttribute('defer', '')
    scriptElement.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`)

    document.head.appendChild(scriptElement)

    this._ready = new Promise(resolve => {
      scriptElement.addEventListener('load', () => {
        if (this.hideBadge) {
          styleElement.innerHTML = '.grecaptcha-badge { display: none }'
          document.head.appendChild(styleElement)
        }

        window.grecaptcha.ready(() => {
          resolve()
        })
      })
    })

    return this._ready
  }

  async execute (action) {
    try {
      await this.init()

      if ('grecaptcha' in window) {
        return window.grecaptcha.execute(
          this.siteKey,
          { action }
        )
      }
    } catch (error) {
      throw new Error(`ReCaptcha error: Failed to execute: ${error}`)
    }
  }
}

export default function (_, inject) {
  Vue.component('recaptcha', () => import('./recaptcha.vue'))
  inject('recaptcha', new ReCaptcha(<%= serialize(options) %>))
}
