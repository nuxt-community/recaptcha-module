class ReCaptcha {
  constructor ({ hideBadge, siteKey }) {
    if (!siteKey) {
      throw 'ReCaptcha error: No key provided'
    }

    this.siteKey = siteKey

    const scriptElement = document.createElement('script')
    const styleElement = document.createElement('style')

    scriptElement.addEventListener('error', () => {
      document.head.removeChild(scriptElement)
      throw 'ReCaptcha error: Failed to load script'
    })

    if (hideBadge) {
      scriptElement.addEventListener('load', () => {
        styleElement.innerHTML = '.grecaptcha-badge { display: none }'
        document.head.appendChild(styleElement)
      })
    }

    scriptElement.setAttribute('async', '')
    scriptElement.setAttribute('defer', '')
    scriptElement.setAttribute('src', `https://www.google.com/recaptcha/api.js?render=${siteKey}`)

    document.head.appendChild(scriptElement)
  }

  execute (action) {
    return new Promise(resolve => {
      if ('grecaptcha' in window) {
        resolve(window.grecaptcha.execute(
          this.siteKey,
          { action }
        ))
      }
    }).catch((e) => {
      throw 'ReCaptcha error: Failed to execute: ' + e
    })
  }
}

export default function (_, inject) {
  inject('recaptcha', new ReCaptcha(<%= serialize(options) %>))
}
