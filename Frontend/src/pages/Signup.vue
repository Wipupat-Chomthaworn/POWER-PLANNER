<template>
    <div class="mt-16">
      <br>
      <form class="max-w-lg mx-auto my-8 p-6 rounded-lg shadow-lg bg-white" @submit.prevent="submitForm">
        <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-gray-700 font-bold mb-2" for="first-name">First Name</label>
            <input v-model="form.first_name" :class="{ 'border-red-500': formErrors.first_name }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first-name" type="text" placeholder="First Name" />
            <p v-if="formErrors.first_name" class="text-red-500 text-xs italic">{{ formErrors.first_name }}</p>
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2" for="last-name">Last Name</label>
            <input v-model="form.last_name" :class="{ 'border-red-500': formErrors.last_name }"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last-name" type="text" placeholder="Last Name" />
            <p v-if="formErrors.last_name" class="text-red-500 text-xs italic">{{ formErrors.last_name }}</p>
          </div>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Email Address</label>
          <input v-model="form.email" :class="{ 'border-red-500': formErrors.email }"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email Address" />
          <p v-if="formErrors.email" class="text-red-500 text-xs italic">{{ formErrors.email }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="phone-number">Phone Number</label>
          <input v-model="form.phone" :class="{ 'border-red-500': formErrors.phone }"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number" type="text" placeholder="Phone Number" />
          <p v-if="formErrors.phone" class="text-red-500 text-xs italic">{{ formErrors.phone }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
          <input v-model="form.password" :class="{ 'border-red-500': formErrors.password }"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="**********" />
          <p v-if="formErrors.password" class="text-red-500 text-xs italic">{{ formErrors.password }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="confirm-password">Confirm Password</label>
          <input v-model="form.confirmPassword" :class="{ 'border-red-500': formErrors.confirmPassword }"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password" type="password" placeholder="**********" />
          <p v-if="formErrors.confirmPassword" class="text-red-500 text-xs italic">{{ formErrors.confirmPassword }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button :disabled="formSubmitted"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            {{ formSubmitted ? 'Submitting...' : 'Sign Up' }}
          </button>
          <p class="text-sm text-gray-600 mt-2">
            <!-- Already have an account? <router-link :to="{ name: 'login' }">Log in here</router-link>. -->
          </p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        },
        formErrors: {},
        formSubmitted: false,
      };
    },
    methods: {
      validateForm() {
        const errors = {};
        if (!this.form.first_name) {
          errors.first_name = 'Please enter your first name.';
        }
        if (!this.form.last_name) {
          errors.last_name = 'Please enter your last name.';
        }
        if (!this.form.email) {
          errors.email = 'Please enter your email address.';
        }
        if (!this.form.phone) {
          errors.phone = 'Please enter your phone number.';
        }
        if (!this.form.password) {
          errors.password = 'Please enter a password.';
        }
        if (!this.form.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password.';
        } else if (this.form.password !== this.form.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match.';
        }
        this.formErrors = errors;
        return Object.keys(errors).length === 0;
      },
      async submitForm() {
        if (this.validateForm()) {
          try {
            const response = await axios.post('http://localhost:3000/signup', this.form);
            console.log(response);
            if (response.status === 200) {
              this.formSubmitted = true;
              Swal.fire({
                icon: 'success',
                title: "Congratulations! You've successfully created your account.",
                confirmButtonText: `Go Login`,
              }).then((result) => {
                if (result.isConfirmed) {
                  // redirect to sign in page
                  this.$router.push('/log');
                }
              });
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              //   text: `${error.response.data}`,
              footer: 'This email or username is already in use.'
            })
          }
        }
      },
    },
  };
  </script>
  