<template>
  <div
    id="g-recaptcha"
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

  destroyed () {
    try {
      let container = document.querySelector('iframe[title="recaptcha challenge"]').parentNode.parentNode

      if (container.nodeName === 'DIV') {
        container.remove()
      }
    } catch (error) {
      // fail silently
    }
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
