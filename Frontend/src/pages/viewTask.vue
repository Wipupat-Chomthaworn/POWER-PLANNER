<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">All Tasks</h1>
      <div class="bg-white shadow-md rounded-md p-4">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="py-2">ID</th>
              <th class="py-2">Name</th>
              <th class="py-2">Description</th>
              <th class="py-2">Status</th>
              <th class="py-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td class="py-2">{{ task.id }}</td>
              <td class="py-2">{{ task.name }}</td>
              <td class="py-2">{{ task.description }}</td>
              <td class="py-2">{{ task.status }}</td>
              <td class="py-2">{{ task.dueDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: []
      };
    },
    methods: {
      fetchTasks() {
        axios.get('/api/tasks')
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      }
    },
    mounted() {
      this.fetchTasks();
    }
  };
  </script>
  
  <style>
  /* Custom styles here */
  </style>
  