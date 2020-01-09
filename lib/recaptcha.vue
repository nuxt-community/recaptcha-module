<template>
  <div
    :data-sitekey="$recaptcha.siteKey"
    :data-size="$recaptcha.size || dataSize"
    :data-theme="dataTheme"
    :data-badge="dataBadge"
    :data-tabindex="dataTabindex"

    data-callback="recaptchaSuccessCallback"
    data-expired-callback="recaptchaExpiredCallback"
    data-error-callback="recaptchaErrorCallback"
    class="g-recaptcha"
  />
</template>

<script>
export default {
  beforeDestroy () {
    this.$recaptcha.destroy()
  },

  methods: {
    onError (message) {
      return this.$emit('error', message)
    },

    onSuccess (token) {
      return this.$emit('success', token)
    },

    onExpired () {
      return this.$emit('expired')
    }
  },

  mounted () {
    this.$recaptcha.init()

    this.$recaptcha.on('recaptcha-error', this.onError)
    this.$recaptcha.on('recaptcha-success', this.onSuccess)
    this.$recaptcha.on('recaptcha-expired', this.onExpired)
  },

  props: {
    dataTheme: {
      default: 'light',
      type: String,

      validator: value => {
        return ['dark', 'light'].includes(value)
      }
    },

    dataSize: {
      default: 'normal',
      type: String,

      validator: value => {
        return ['compact', 'normal', 'invisible'].includes(value)
      }
    },
    
    dataBadge: {
      default: 'bottomright',
      type: String,
      
      validator: value => {
        return ['bottomright', 'bottomleft', 'inline'].includes(value)
      }
    },
    
    dataTabindex: {
      default: 0,
      type: Number
    }
  }
}
</script>
