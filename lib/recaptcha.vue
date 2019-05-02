<template>
  <div
    :data-sitekey="$recaptcha.siteKey"
    :data-size="dataSize"
    :data-theme="dataTheme"

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
    }
  },

  mounted () {
    this.$recaptcha.init()

    this.$recaptcha.on('recaptcha-error', this.onError)
    this.$recaptcha.on('recaptcha-success', this.onSuccess)
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
        return ['compact', 'normal'].includes(value)
      }
    }
  }
}
</script>
