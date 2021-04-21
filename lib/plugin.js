import { EventEmitter } from 'events'
import Vue from 'vue'

const API_URL = 'https://www.recaptcha.net/recaptcha/api.js'

class ReCaptcha {
  constructor ({ hideBadge, language, siteKey, version, size }) {
    if (!siteKey) {
      throw new Error('ReCaptcha error: No key provided')
    }

    if (!version && !Array.isArray(siteKey)) {
      throw new Error('ReCaptcha error: siteKey must be array when version not provided')
    } else if (!version && typeof(siteKey) == 'string') {
      throw new Error('ReCaptcha error: No version provided')
    }

    this._elements = {}

    this._eventBus = null
    this._ready = false

    this.hideBadge = hideBadge
    this.language = language

    this.siteKey = siteKey
    this.version = version
    this.size = size
  }

  get siteKeyV2() {
    if (this.version === 2) return this.siteKey;
    else if (Array.isArray(this.siteKey)) return this.siteKey[0];
    else return null;
  }

  get siteKeyV3() {
    if (this.version === 3) return this.siteKey;
    else if (Array.isArray(this.siteKey)) return this.siteKey[1];
    else return null;
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

      const badge = document.querySelector('.grecaptcha-badge')
      if (badge) {
        badge.remove()
      }
    }
  }

  async execute (action) {
    try {
      await this.init()

      if ('grecaptcha' in window) {
        return window.grecaptcha.execute(
          this.siteKeyV3,
          { action }
        )
      }
    } catch (error) {
      throw new Error(`ReCaptcha error: Failed to execute ${error}`)
    }
  }

  getResponse (widgetId) {
    return new Promise((resolve, reject) => {
      if ('grecaptcha' in window) {
        if(this.size == 'invisible'){
          window.grecaptcha.execute(widgetId)

          window.recaptchaSuccessCallback = token => {
            this._eventBus.emit('recaptcha-success', token)
            resolve(token)
          }

          window.recaptchaErrorCallback = error => {
            this._eventBus.emit('recaptcha-error', error)
            reject(error)
          }
        } else {
          const response = window.grecaptcha.getResponse(widgetId)

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
      // make sure caller waits until recaptcha get ready
      return this._ready
    }

    this._eventBus = new EventEmitter()
    this._elements = {
      script: document.createElement('script'),
      style: document.createElement('style')
    }

    const { script, style } = this._elements

    script.setAttribute('async', '')
    script.setAttribute('defer', '')

    const params = []
    if (this.siteKeyV3) { params.push('render=' + this.siteKeyV3) }
    if (this.language) { params.push('hl=' + this.language) }
    script.setAttribute('src', API_URL + '?' + params.join('&'))

    window.recaptchaSuccessCallback = (token) => this._eventBus.emit('recaptcha-success', token)
    window.recaptchaExpiredCallback = () => this._eventBus.emit('recaptcha-expired')
    window.recaptchaErrorCallback = () => this._eventBus.emit('recaptcha-error', 'Failed to execute')

    this._ready = new Promise((resolve, reject) => {
      script.addEventListener('load', () => {
        if (this.hideBadge) {
          style.innerHTML = '.grecaptcha-badge { visibility: hidden; }'
          document.head.appendChild(style)
        }

        window.grecaptcha.ready(resolve)
      })

      script.addEventListener('error', () => {
        document.head.removeChild(script)
        reject('ReCaptcha error: Failed to load script')
        this._ready = null;
      })

      document.head.appendChild(script)
    })

    return this._ready
  }

  on (event, callback) {
    return this._eventBus.on(event, callback)
  }

  reset (widgetId) {
    if (this.siteKeyV2 || typeof widgetId !== 'undefined') {
      window.grecaptcha.reset(widgetId)
    }
  }

  render (reference, options) {
    return window.grecaptcha.render(reference.$el || reference, Object.assign({
      "sitekey": this.siteKeyV2,
      "size": this.size
    },
    options,
    {
      "callback": "recaptchaSuccessCallback",
      "expired-callback": "recaptchaExpiredCallback",
      "error-callback": "recaptchaErrorCallback",
    }));
  }
}

export default function (_, inject) {
  const { recaptcha = {} } = _.$config || {}
  const options = {
    ...<%= serialize(options) %>,
    ...recaptcha,
  }

  Vue.component('Recaptcha', () => import('./recaptcha.vue'))
  inject('recaptcha', new ReCaptcha(options))
}
