<template>
  <div class="g-recaptcha" />
</template>

<script>
export default {
  props: {
    siteKey: {
      type: String,
      default: ''
    },

    dataTheme: {
      default: 'light',
      type: String,

      validator: (value) => {
        return ['dark', 'light'].includes(value)
      }
    },

    dataSize: {
      default: null,
      type: String,

      validator: (value) => {
        return ['compact', 'normal', 'invisible'].includes(value)
      }
    },

    dataBadge: {
      default: 'bottomright',
      type: String,

      validator: (value) => {
        return ['bottomright', 'bottomleft', 'inline'].includes(value)
      }
    },

    dataTabindex: {
      default: 0,
      type: Number
    }
  },

  computed: {
    computedDataSize() {
      return (this.dataSize || this.$recaptcha.size) || 'normal'
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },

  mounted() {
    this.$recaptcha.init().then(() => {
      this.$recaptcha.render(this, {
        siteKey: this.siteKey || this.$recaptcha.siteKeyV2,
        size: this.computedDataSize,
        theme: this.dataTheme,
        badge: this.dataBadge,
        tabindex: this.dataTabindex
      })
    })

    this.$recaptcha.on('recaptcha-error', this.onError)
    this.$recaptcha.on('recaptcha-success', this.onSuccess)
    this.$recaptcha.on('recaptcha-expired', this.onExpired)
  },

  methods: {
    onError(message) {
      return this.$emit('error', message)
    },

    onSuccess(token) {
      return this.$emit('success', token)
    },

    onExpired() {
      return this.$emit('expired')
    }
  }
}
</script>
