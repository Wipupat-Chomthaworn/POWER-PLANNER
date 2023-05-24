<template>
  <SideBar></SideBar>
  <div class="max-w-lg mx-auto mt-16">
    <h2 class="text-2xl font-bold mb-4">User Profile</h2>
    <div class="flex items-center mb-4">
      <img :src="'http://localhost:5173/src/assets/' + this.user.avatar" class="w-16 h-16 rounded-full mr-4"
        alt="Profile Picture" />
      <div>
        <!-- <input type="file" @change="changeavatar" class="mb-2" />
        <p class="text-sm text-gray-600">Allowed formats: JPEG, PNG</p> -->
        <select v-model="this.user.avatar" class="border border-gray-300 px-2 py-1 rounded">
          <!-- <option value="">Select an option</option> -->
          <option value="avatar.jpg">Option 1</option>
          <option value="avatar2.jpg" selected="selected">Option 2</option>
          <option value="avatar3.jpg">Option 3</option>
          <option value="avatar4.jpg">Option 4</option>
          <option value="avatar5.jpg">Option 5</option>


        </select>

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
          <input v-model="user.first_name" id="first-name" type="text" placeholder="First Name"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="last-name">Last Name</label>
          <input v-model="user.last_name" id="last-name" type="text" placeholder="Last Name"
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
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    SideBar, Navbar
  },
  data() {
    return {
      user: {
        username: '',
        first_name: '',
        last_name: '',
        phone: '',
        newPassword: '',
        confirmPassword: '',
        avatar: 'avatar.jpg', // Default profile picture URL
      },
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    // changeavatar(event) {
    //   const file = event.target.files[0];
    //   // Perform necessary file validations and upload the file
    //   // Update the profile picture URL once uploaded
    //   // For example:
    //   // uploadavatar(file).then(url => {
    //   //   this.avatar = url;
    //   // });
    // },
    getProfile() {
      axios.get('/api/user')
        .then(response => {
          const userProfile = response.data;
          this.user = userProfile;
        })
        .catch(error => {
          console.error(error);
          // Handle error case
        });
    },
    updateProfile() {
      // Perform necessary validations and update the user profile
      axios.put('/api/updateProfile', this.user)
        .then(response => {
          alert(response.data)
          this.getProfile()
          // Profile updated successfully
          // Show success message or redirect to another page
        })
        .catch(error => {
          console.error(error);
          // Handle error case
        });
    },
  },
};
</script>
