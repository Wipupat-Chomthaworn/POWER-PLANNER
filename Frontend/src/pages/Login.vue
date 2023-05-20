<template>
    <div class="p-4 sm:ml-64">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <img class="mx-auto h-10 w-auto" src="../assets/logo2d2.png" alt="Your Company"> -->
    <img src="../assets/apple.jpg" alt="">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit.prevent="loginUser">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" v-model="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" v-model="password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <router-link to="/sign" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create an account </router-link>
    </p>
  </div>
</div></div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token)
        console.log(response.data);
        // this.$store.dispatch('setUser', response.data.user);
        // this.showSuccessAlert();
        this.$router.push('/home');
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
        Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                    //   text: `${error.response.data}`,
                      footer: 'username or password invalid. Please try again'
                  })
      }
    }
  }
};
</script>

<style>
/* CSS styles here */
</style>