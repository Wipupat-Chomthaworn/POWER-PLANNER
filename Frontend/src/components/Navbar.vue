
<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <a href="/home" class="flex ml-2 md:mr-24">
            <!-- <img src="../assets/logo.jpg" class="h-8 mr-3" alt="Power Planner Logo" /> -->
            <img src="../assets/logo2d2.png" class="h-8 mr-3" alt="Power Planner Logo" />

            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Power Planner
            </span>
          </a>
        </div>
        <!-- User Pic -->
        <div class="flex items-center" id="userInfo" v-if="isLoggedIn">
          <div class="flex items-center ml-3">
            <div>
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" :src="userAvatar"
                  alt="user photo">
              </button>
            </div>
            <div 
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  <!-- Neil Sims -->
                  {{ user.username }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  <!-- neil.sims@flowbite.com -->
                  {{ user.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem">
                    Settings</a>
                </li>
                <li>
                  <a href="/" @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
// import axios from 'axios';
import axios from '../plugins/axios';


export default {
  // props: {
  //   isLoggedIn: {
  //     type: Boolean,
  //     required: true,
  //   },
  //   // Other props
  // },
  data() {
    return {
      user: {
        username: '',
        email: '',
        Avatar: '../assets/avatar.jpg'
      },
      isLoggedIn : false
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  watch: {
    // isLoggedIn(newStatus) {
    //   if (newStatus) {
    //     // User logged in
    //     // Perform any necessary actions
    //     this.fetchUserInfo(); // Refresh user data
    //     window.location.reload()
    //     console.log("watch:", newStatus)

    //   } else {
    //     // User logged out
    //     // Perform any necessary actions
    //     console.log("watch else")

    //   }
    // }
  },
//   computed: {
//     isLoggedIn() {
//       if (!this.isLoggedIn)
//           this.fetchUserInfo(); // Refresh user data
//         // window.location.reload()
//         this.isLoggedIn = true
//         console.log("computed")
//     }
//   // userAvatar() {
//   //   return this.user.Avatar;
//   // }
// },
  methods: {
    fetchUserInfo() {
      axios.get('/api/user')
        .then(response => {
          this.isLoggedIn = true,
          this.user.username = response.data.username;
          this.user.email = response.data.email;
          // this.user.Avatar = response.data.Avatar;
        })
        .catch(error => {
          console.log(error);
          this.isLoggedIn = false
        });
    },
    logout() {
    // Remove the "token" from localStorage
    localStorage.clear();
  }
  }
};
</script>