<template>
  <section class="index-page">
    <h2>Sign In</h2>

    <form @submit.prevent="onSubmit">
      <input
        placeholder="Email"
        type="email"
        v-model="email">

      <input
        placeholder="Password"
        type="password"
        v-model="password">

      <button type="submit">Sign In</button>
    </form>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    async onSubmit () {
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
        console.log('Ooops!', error)
      }
    }
  }
}
</script>
