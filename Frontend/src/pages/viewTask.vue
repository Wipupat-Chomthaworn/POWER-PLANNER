<template>
  <div>
    <SideBar />
    <div class="p-4 sm:ml-64">
      <h1 class="text-3xl font-bold mb-4">All Tasks</h1>
      <div class="bg-white shadow-md rounded-md p-4">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="py-2">User ID</th>
              <th class="py-2">Name</th>
              <!-- <th class="py-2">Description</th> -->
              <th class="py-2">Status</th>
              <th class="py-2">Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.updated_at">
              <td class="py-2">{{ task.user_id }}</td>
              <td class="py-2">{{ task.task_name }}</td>
              <!-- <td class="py-2">{{ task.task_desc }}</td> -->
              <td class="py-2">{{ task.task_status }}</td>
              <td class="py-2">{{ task.updated_at }}</td>
              <!-- <td class="py-2">{{ task.user_id }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import axios from '../plugins/axios';
import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';

export default {
  name: 'adminTask',
  components: {
    Navbar,
    SideBar,
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    fetchTasks() {
      axios.get('/api/viewTask')
        .then(response => {
          this.tasks = response.data.allTask;
          console.log(this.tasks)
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
          alert("You are not authorized to view")
        });
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
/* Custom styles here */

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.table th {
  text-align: left;
  font-weight: bold;
}

.table tbody tr:hover {
  background-color: #f7fafc;
}
</style>
