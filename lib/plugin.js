class ReCaptcha {
  constructor ({ hideBadge, siteKey }) {
    if (!siteKey) {
      throw 'ReCaptcha error: No key provided'
    }

    this.siteKey = siteKey
    this.hideBadge = hideBadge

    this.__initialized = false
  }

  init () {
    if (this.__initialized) {
      return Promise.resolve()
    }

    // Early set __initialized to prevent duplicate init() calls
    this.__initialized = true

    const scriptElement = document.createElement('script')
    const styleElement = document.createElement('style')

    scriptElement.addEventListener('error', () => {
      document.head.removeChild(scriptElement)
      throw 'ReCaptcha error: Failed to load script'
    })

    if (this.hideBadge) {
      scriptElement.addEventListener('load', () => {
        styleElement.innerHTML = '.grecaptcha-badge { display: none }'
        document.head.appendChild(styleElement)
      })
    }

    scriptElement.setAttribute('async', '')
    scriptElement.setAttribute('defer', '')
    scriptElement.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`)

    document.head.appendChild(scriptElement)

    return new Promise((resolve) => {
      scriptElement.addEventListener('load', () => {
        resolve()
      })
    })
  }

  async execute(action) {
    try {
      await this.init()
      if ('grecaptcha' in window) {
        return window.grecaptcha.execute(
          this.siteKey,
          { action }
        )
      }
    } catch (e) {
      throw new Error('ReCaptcha error: Failed to execute: ' + e)
    }
  }
}

export default function (_, inject) {
  inject('recaptcha', new ReCaptcha(<%= serialize(options) %>))
}
