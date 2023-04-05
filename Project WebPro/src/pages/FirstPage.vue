<template>
  <div class="bg-purple-50 min-h-screen flex flex-col justify-center items-center">
    <div class="max-w-lg w-full px-8 py-16 rounded-lg bg-white shadow-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Welcome to Power Planner</h1>
      <p class="text-gray-600 leading-7 mb-10">
        Power Planner is the ultimate tool for staying organized and on top of your busy life. With customizable features and intuitive design, you'll be able to easily manage your tasks, appointments, and goals all in one place. Say goodbye to forgotten deadlines, missed meetings, and stress-induced anxiety. With Power Planner, you can finally take control of your life and achieve your goals with ease.
      </p>
      <div class="flex flex-col md:flex-row md:justify-between items-center">

        <!-- <button @click="showLoginModal" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg mb-4 md:mb-0">Log In</button>
        <button @click="showRegisterModal" class="bg-purple-300 hover:bg-purple-400 text-gray-800 font-bold py-2 px-6 rounded-lg">Register</button> -->

        <button @click="getStart()" class="bg-purple-300 hover:bg-purple-400 text-gray-800 font-bold py-2 px-6 rounded-lg">Get Started</button>
        <!-- <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="text-black   hover:text-white , rounded-md px-3 py-2 text-md font-medium"
                aria-current='page'>{{ item.name }}</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoginModalVisible: false,
      isRegisterModalVisible: false,
    };
  },
  methods: {
    showLoginModal() {
      this.isLoginModalVisible = true;
    },
    hideLoginModal() {
      this.isLoginModalVisible = false;
    },
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    hideRegisterModal() {
      this.isRegisterModalVisible = false;
    },
  },
};
</script>

<style>
/* // Your Tailwind styles here */
</style>
