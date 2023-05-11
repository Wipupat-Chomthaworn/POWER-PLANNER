<template>
    <div>
      <p v-if="$store.state.user">{{ $store.state.user.name }}</p>
      <button @click="login">Log in</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login() {
        // do login logic...
        const user = { name: 'John' }
        this.$store.dispatch('setUser', user)
      },
    },
  }
  </script>
  