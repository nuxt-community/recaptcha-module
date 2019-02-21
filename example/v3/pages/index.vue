<template>
  <section class="index-page">
    <h2>Sign In</h2>

    <form @submit.prevent="onSubmit">
      <input
        autocomplete="true"
        placeholder="Email"
        type="email"
        v-model="email"
      >
      
      <input
        autocomplete="current-password"
        placeholder="Password"
        type="password"
        v-model="password"
      >
      
      <button type="submit">Sign In</button>
    </form>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: 'test@example.com',
    password: '123',
  }),

  async mounted() {
    await this.$recaptcha.init()
  },

  methods: {
    async onSubmit() {
      try {
        const token = await this.$recaptcha.execute('login')
        console.log('ReCaptcha token:', token)
      } catch (error) {
        console.log('Login error:', error)
      }
    },
  },
}
</script>
