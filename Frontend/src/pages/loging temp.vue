<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <img src="" alt="">
      <div class="w-full max-w-md">
        <div class="flex justify-between">
  
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" @click="mode = 'sign'"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              <svg aria-hidden="true" class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"></path>
              </svg>
              Sign Up
            </button>
            <button type="button" @click="mode = 'log'"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b rounded-r-md border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              <!-- <img src="../assets/log in sym.png" alt=""> -->
              Log In!
            </button>
          </div>
  
        </div>
        <form @submit.prevent="signup" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-show="mode === 'sign'">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <br>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="first-name">
              First Name:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first-name" type="text" placeholder="First Name" v-model="signupData.firstName" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="last-name">
              Last Name:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last-name" type="text" placeholder="Last Name" v-model="signupData.lastName" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" placeholder="Email" v-model="signupData.email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone">
              Phone:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone" type="tel" placeholder="Phone" v-model="signupData.phone" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password" v-model="signupData.password" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="confirm-password">
              Confirm Password:
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password" type="password" placeholder="Confirm Password" v-model="signupData.confirmPassword"
              required />
            <p v-if="passwordsMatch" class="text-green-500">Passwords match!</p>
            <p v-else class="text-red-500">Passwords do not match!</p>
          </div>
  
          <button class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :class="{ 'bg-green-500': passwordsMatch, 'bg-red-500': !passwordsMatch }" type="submit"
            :disabled="!passwordsMatch">
            Sign Up
          </button>
        </form>
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-show="mode === 'log'">
          <!-- Login form fields -->
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username OR Email
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com" v-model="loginData.email" required>
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
              password</label>
            <input type="password" id="log-password" v-model="loginData.password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
          </div>
          <!-- <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required>
              </div>
              <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div> -->
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  
        </form>
      </div>
    </div>
  </template>
    
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        signupData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmpassword: '',
  
        },
        loginData: {
          email: '',
          password: '',
        },
        mode: 'sign', // 'signup' or 'login'
      };
    },
    computed: {
      passwordsMatch() {
        return this.signupData.password === this.signupData.confirmPassword
          // && this.signupData.confirmPassword.lenth > 8
          ;
      },
      methods: {
        async signup() {
          console.log('signup');
  
          // Handle Sign Up form submission here
        },
        async login() {
          try {
            console.log('login', loginData);
            // Handle Log In form submission here
  
            await axios.post('http://localhost:3000/log', { params: { email: this.loginData.email, password: this.loginData.password } })
              .then(response => {
                console.log(response);
                if (response.status === 200) {
                  router.push('/remaining');
                }
              });
          } catch (error) {
            console.error(error.response.data);
            alert(error.response.data);
          }
  
          //   axios.post('http://localhost:3000/log', {
          //     email: this.loginData.email,
          //     password: this.loginData.password
          //   })
          //   .then(response => {
          //     // Handle successful login
          //     console.log('Login successful:', response.data);
          //     alert('Log in success');
          //   })
          //   .catch(error => {
          //     // Handle login error
          //     console.error('Login error:', error);
          //     // Show error message to user, e.g. using a toast or alert
          //     alert('Log in failed. Please check your email and password.');
          //   });
          //   },
          // },
  
        },
      }
    }
  }
  </script>