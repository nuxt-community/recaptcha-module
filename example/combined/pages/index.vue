<template>
  <section class="index-page">
    <h2>With v2</h2>

    <form @submit.prevent="onSubmitV2">
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
        @error="onError"
        @success="onSuccess"
        @expired="onExpired"
      />

      <button type="submit">
        Sign In
      </button>
    </form>

    <hr>
    <h2>With v3</h2>

    <form @submit.prevent="onSubmitV3">
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
      <button type="submit">
        Sign In
      </button>
    </form>
    <hr>
    <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: 'test@example.com',
    password: '123'
  }),

  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async onSubmitV2() {
      try {
        const token = await this.$recaptcha.getResponse()
        console.log('v2 ReCaptcha token:', token)
        const response = await fetch('/api/check-token', {
          method: 'POST',
          body: JSON.stringify({
            v: 2,
            token,
            email: this.email,
            password: this.password
          })
        }).then(res => res.json())
        console.log('v2 Server Response: ', response)
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('v2 Login error:', error)
      }
    },
    async onSubmitV3() {
      try {
        const token = await this.$recaptcha.execute('login')
        console.log('v3 ReCaptcha token:', token)
        const response = await fetch('/api/check-token', {
          method: 'POST',
          body: JSON.stringify({
            v: 3,
            token,
            email: this.email,
            password: this.password
          })
        }).then(res => res.json())
        console.log('v3 Server Response: ', response)
      } catch (error) {
        console.log('v3 Login error:', error)
      }
    },
    onSuccess(token) {
      console.log('v2 Succeeded:', token)
    },

    onExpired() {
      console.log('v2 Expired')
    },
    onError(error) {
      console.log('v2 Error happened:', error)
    }
  }
}
</script>
