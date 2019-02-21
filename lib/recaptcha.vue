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
  mounted () {
    this.$recaptcha.init()
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
