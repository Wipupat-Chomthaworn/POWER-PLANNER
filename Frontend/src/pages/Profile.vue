<template>
     <SideBar></SideBar>
  <div class="max-w-lg mx-auto mt-16">
    <h2 class="text-2xl font-bold mb-4">User Profile</h2>
    <div class="flex items-center mb-4">
      <img :src="profilePicture" class="w-16 h-16 rounded-full mr-4" alt="Profile Picture" />
      <div>
        <input type="file" @change="changeProfilePicture" class="mb-2" />
        <p class="text-sm text-gray-600">Allowed formats: JPEG, PNG</p>
      </div>
    </div>
    <form @submit.prevent="updateProfile" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="username">Username</label>
        <input v-model="user.username" id="username" type="text" placeholder="Username"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="first-name">First Name</label>
          <input v-model="user.firstName" id="first-name" type="text" placeholder="First Name"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="last-name">Last Name</label>
          <input v-model="user.lastName" id="last-name" type="text" placeholder="Last Name"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="phone-number">Phone Number</label>
        <input v-model="user.phone" id="phone-number" type="text" placeholder="Phone Number"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="password">New Password</label>
        <input v-model="user.newPassword" id="password" type="password" placeholder="New Password"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="confirm-password">Confirm Password</label>
        <input v-model="user.confirmPassword" id="confirm-password" type="password" placeholder="Confirm Password"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">Update Profile</button>
        <p class="text-sm text-gray-600 mt-2">
          <!-- Additional links or information can be placed here. -->
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';
import axios from '../plugins/axios';
export default {
  components: {
      SideBar,Navbar
   },
  data() {
    return {
      user: {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        newPassword: '',
        confirmPassword: '',
      },
      profilePicture: 'default-profile-picture.jpg', // Default profile picture URL
    };
  },
  methods: {
    changeProfilePicture(event) {
      const file = event.target.files[0];
      // Perform necessary file validations and upload the file
      // Update the profile picture URL once uploaded
      // For example:
      // uploadProfilePicture(file).then(url => {
      //   this.profilePicture = url;
      // });
    },
    updateProfile() {
      // Perform necessary validations and update the user profile
      // For example:
      // updateUserProfile(this.user).then(() => {
      //   // Profile updated successfully
      //   // Show success message or redirect to another page
      // });
    },
  },
};
</script>
