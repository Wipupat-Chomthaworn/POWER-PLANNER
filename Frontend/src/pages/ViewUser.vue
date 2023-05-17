<template>
    <SideBar />

    <div class="p-4 sm:ml-64">
        <h2 class="text-2xl font-bold mb-4">User Management</h2>
        <table class="w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">ID</th>
                    <th class="py-2 px-4 border-b">Name</th>
                    <th class="py-2 px-4 border-b">Email</th>
                    <th class="py-2 px-4 border-b">Roles</th>
                    <th class="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="py-2 px-4 border-b">{{ user.user_id }}</td>
                    <td class="py-2 px-4 border-b">{{ user.username }}</td>
                    <td class="py-2 px-4 border-b">{{ user.email }}</td>
                    <td class="py-2 px-4 border-b">{{ user.user_type }}</td>
                    <td class="py-2 px-4 border-b">
                        <button @click="deleteUser(user.id)" class="text-red-600" v-if="user.user_id != whoAreU">Delete</button>
                        <button @click="" class="text-red-600" v-if="user.user_id == whoAreU">YOU</button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
//   import axios from 'axios';
import axios from '../plugins/axios';
import SideBar from '../components/SideBar.vue';

export default {
    components: {
        SideBar,
    },
    data() {
        return {
            users: [],
            whoAreU: [],
        };
    },
    methods: {
        fetchUsers() {
            axios.get("/api/viewUser")
                .then(response => {
                    this.users = response.data.allUsers;
                    this.whoAreU = response.data.whoAreU;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteUser(userId) {
            axios.delete(`/api/users/${userId}`)
                .then(() => {
                    this.fetchUsers();
                    console.log(`User with ID ${userId} deleted successfully.`);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>
  