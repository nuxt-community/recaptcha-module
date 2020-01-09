import { EventEmitter } from 'events'
import Vue from 'vue'

const API_URL = 'https://www.google.com/recaptcha/api.js'

class ReCaptcha {
  constructor ({ hideBadge, language, siteKey, version, size }) {
    if (!siteKey) {
      throw new Error('ReCaptcha error: No key provided')
    }

    if (!version) {
      throw new Error('ReCaptcha error: No version provided')
    }

    this._elements = {}

    this._eventBus = null
    this._ready = false

    this.hideBadge = hideBadge
    this.language = language || 'en'

    this.siteKey = siteKey
    this.version = version
    this.size = size
  }

  destroy () {
    if (this._ready) {
      this._ready = false

      const { head } = document
      const { style } = this._elements

      const scripts = [...document.head.querySelectorAll('script')]
        .filter(script => script.src.includes('recaptcha'))

      if (scripts.length) {
        scripts.forEach(script => head.removeChild(script))
      }

      if (head.contains(style)) {
        head.removeChild(style)
      }
    }
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
      throw new Error('ReCaptcha error: Failed to execute')
    }
  }

  getResponse () {
    return new Promise((resolve, reject) => {
      if ('grecaptcha' in window) {
        if(this.size == 'invisible'){
          window.grecaptcha.execute()

          window.recaptchaSuccessCallback = token => {
            this._eventBus.emit('recaptcha-success', token)
            resolve(token)
          }

          window.recaptchaErrorCallback = error => {
            this._eventBus.emit('recaptcha-error', error)
            reject(error)
          }
        } else {
          const response = window.grecaptcha.getResponse()

          if (response) {
            this._eventBus.emit('recaptcha-success', response)
            resolve(response)
          } else {
            const errorMessage = 'Failed to execute'

            this._eventBus.emit('recaptcha-error', errorMessage)
            reject(errorMessage)
          }
        }
        
      }
    })
  }

  init () {
    if (this._ready) {
      return Promise.resolve()
    }

    this._eventBus = new EventEmitter()
    this._elements = {
      script: document.createElement('script'),
      style: document.createElement('style')
    }

    const { script, style } = this._elements

    script.addEventListener('error', () => {
      document.head.removeChild(script)
      throw new Error('ReCaptcha error: Failed to load script')
    })

    script.setAttribute('async', '')
    script.setAttribute('defer', '')

    if (this.version === 2) {
      script.setAttribute('src', API_URL + '?hl=' + this.language)
    } else {
      script.setAttribute('src', API_URL + '?render=' + this.siteKey)
    }

    document.head.appendChild(script)

    window.recaptchaSuccessCallback = (token) => this._eventBus.emit('recaptcha-success', token)
    window.recaptchaExpiredCallback = () => this._eventBus.emit('recaptcha-expired')
    window.recaptchaErrorCallback = () => this._eventBus.emit('recaptcha-error', 'Failed to execute')

    this._ready = new Promise(resolve => {
      script.addEventListener('load', () => {
        if (this.version === 3 && this.hideBadge) {
          style.innerHTML = '.grecaptcha-badge { display: none }'
          document.head.appendChild(style)
        } else if(this.version === 2 && this.hideBadge) {
          // display: none DISABLES the spam checking!
          // ref: https://stackoverflow.com/questions/44543157/how-to-hide-the-google-invisible-recaptcha-badge
          style.innerHTML = '.grecaptcha-badge { visibility: hidden; }'
          document.head.appendChild(style)
        }

        window.grecaptcha.ready(resolve)
      })
    })

    return this._ready
  }

  on (event, callback) {
    return this._eventBus.on(event, callback)
  }

  reset () {
    if (this.version === 2) {
      window.grecaptcha.reset()
    }
  }
}

export default function (_, inject) {
  Vue.component('recaptcha', () => import('./recaptcha.vue'))
  inject('recaptcha', new ReCaptcha(<%= serialize(options) %>))
}
