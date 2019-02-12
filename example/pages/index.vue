<template>
  <section class="index-page">
    <h2>Sign In</h2>

    <form @submit.prevent="onSubmit">
      <input
        v-model="email"
        placeholder="Email"
        type="email"
        autocomplete="true"
      >

      <input
        v-model="password"
        placeholder="Password"
        type="password"
        autocomplete="current-password"
      >

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
    password: '123'
  }),

  mounted() {
    this.$recaptcha.homepage()
  },

  methods: {
    async onSubmit() {
      try {
        const token = await this.$recaptcha.login()

        console.log('ReCaptcha Token:', token) // eslint-disable-line no-console
        alert('ReCaptcha Validated!')

        // const credentials = {
        //   email: this.email,
        //   password: this.password,
        //   token
        // }

        // await fetch('https://example.com/api/sign-in', {
        //   body: JSON.stringify({ credentials })
        // })
      } catch (error) {
        console.log('Login error:', error) // eslint-disable-line no-console
      }
    }
  }
}
</script>
