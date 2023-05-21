<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm">
                <h2 class="text-2xl text-gray-800 font-bold mb-6">Forgot Password</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email Address
                    </label>
                    <input v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address" required />
                    <input v-model="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="OTP" type="OTP" placeholder="Enter your OTP" required />
                    <!-- getotp -->
                    
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit" :disabled="loading">
                        {{ loading ? 'Submitting...' : 'Submit' }}
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/log">
                        Back to Login
                    </a>
                </div>
            </form>
            <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        @click="getotp()"> Request OTP</button>
            <div v-if="message" class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mt-4 mb-2"
                role="alert">
                <p class="font-bold">{{ message }}</p>
            </div>
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error:</strong>
                <span class="block sm:inline">{{ error }}</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            loading: false,
            message: "",
            error: "",
        };
    },
    methods: {
        submitForm() {
            this.loading = true;
            this.message = "";
            this.error = "";

            axios
                .post("/api/forgot-password", { email: this.email })
                .then((response) => {
                    this.loading = false;
                    this.message = response.data.message;
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>
  
<style>
/* Add Tailwind CSS styles here or import Tailwind CSS framework */
</style>
  