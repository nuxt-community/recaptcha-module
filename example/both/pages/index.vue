<template>
  <section class="index-page">
    <h2>Sign In</h2>

    <form @submit.prevent="onSubmit">
      <input
        v-model="email"
        autocomplete="true"
        placeholder="Email"
        type="email"
      >

      <input
        v-model="password"
        autocomplete="current-password"
        placeholder="Password"
        type="password"
      >
      <recaptcha
        id="v2-normal"
        site-key="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      />
      <button type="submit">
        Sign In
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: 'test@example.com',
    password: '123',
    widgetId: 0
  }),

  async mounted() {
    await this.$recaptcha.init()

    this.widgetId = this.$recaptcha.render('v2-normal', {
      sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    })
  },

  methods: {
    async onSubmit() {
      try {
        const tokenV2 = await this.$recaptcha.getResponse(this.widgetId)
        console.log('V2 ReCaptcha token:', tokenV2)

        const token = await this.$recaptcha.execute('login')
        console.log('V3 ReCaptcha token:', token)

        this.$recaptcha.reset(this.widgetId)
      } catch (error) {
        console.log('Login error:', error)
      }
    }
  }
}
</script>
