<template>
    <div class="p-4 sm:ml-64">
      <h2 class="text-2xl font-bold mb-3 mt-5">Subtask Page</h2>
  
      <!-- Add Subtask -->
      <form @submit="addSubtask" class="mb-4">
        <div class="form-group">
          <label for="subtaskName">Subtask Name:</label>
          <input type="text" class="form-control" id="subtaskName" v-model="newSubtask.name" required>
        </div>
        <br>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Add Subtask
        </button>
      </form>
  
      <!-- Display Subtasks -->
      <h2 class="text-xl font-bold mb-2">Subtask List</h2>
      <ul>
        <li v-for="subtask in subtasks" :key="subtask.id">
          {{ subtask.name }}
          <button @click="removeSubtask(subtask.id)"
            class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-2 rounded">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        subtasks: [],
        newSubtask: {
          name: '',
        },
      };
    },
    methods: {
      async addSubtask() {
        try {
          const response = await axios.post('/api/subtasks', this.newSubtask);
          this.subtasks.push(response.data);
          this.newSubtask.name = '';
        } catch (error) {
          console.error(error);
        }
      },
      async removeSubtask(subtaskId) {
        try {
          await axios.delete(`/api/subtasks/${subtaskId}`);
          this.subtasks = this.subtasks.filter(subtask => subtask.id !== subtaskId);
        } catch (error) {
          console.error(error);
        }
      },
      async fetchSubtasks() {
        try {
          const response = await axios.get('/api/subtasks');
          this.subtasks = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      this.fetchSubtasks();
    },
  };
  </script>
  