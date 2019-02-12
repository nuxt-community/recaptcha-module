<template>
  <section class="index-page">
    <h2>Sign In</h2>

    <form @submit.prevent="onSubmit">
      <input
        v-model="email"
        placeholder="Email"
        type="email"
      >

      <input
        v-model="password"
        placeholder="Password"
        type="password"
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
    email: '',
    password: ''
  }),

  mounted() {
    this.$recaptcha.init()
  },

  methods: {
    async onSubmit() {
      try {
        const token = await this.$recaptcha.execute('sign-in')

        const credentials = {
          email: this.email,
          password: this.password,
          token
        }

        await fetch('https://example.com/api/sign-in', {
          body: JSON.stringify({ credentials })
        })
      } catch (error) {
        console.log('Ooops!', error) // eslint-disable-line no-console
      }
    }
  }
}
</script>
