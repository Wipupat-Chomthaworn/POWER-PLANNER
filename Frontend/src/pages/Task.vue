<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Task Management Page</h2>
  
      <div v-for="task in tasks" :key="task.task_id" class="bg-white rounded-md p-4 shadow mb-4">
        <h3 class="text-lg font-medium">{{ task.task_name }}</h3>
        <p class="text-gray-600">{{ task.task_desc }}</p>
        <p class="text-gray-500 mt-2">Due Date: {{ task.due_date }}</p>
        <div class="flex justify-end mt-4">
          <button @click="editTask(task)" class="px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
        </div>
      </div>
  
      <div v-if="editedTask.id" class="bg-white rounded-md p-4 shadow">
        <h3 class="text-lg font-medium">Edit Task</h3>
        <form @submit.prevent="updateTask" class="mt-4">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium">Task Name</label>
            <input v-model="editedTask.name" type="text" id="name" class="w-full border border-gray-300 px-3 py-2 rounded-md" required>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-medium">Task Description</label>
            <textarea v-model="editedTask.description" id="description" class="w-full border border-gray-300 px-3 py-2 rounded-md" rows="4"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
//   import axios from 'axios';
import axios from '../plugins/axios';

  
  export default {
    data() {
      return {
        tasks: [],
        editedTask: {
          id: '',
          name: '',
          description: ''
        }
      };
    },
    mounted() {
      this.getTasks();
    },
    methods: {
      getTasks() {
        axios.get('/api/GetTasks')
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      editTask(task) {
        this.editedTask.id = task.task_id;
        this.editedTask.name = task.task_name;
        this.editedTask.description = task.task_desc;
      },
      updateTask() {
        axios.put(`/api/tasks/${this.editedTask.id}`, this.editedTask)
          .then(response => {
            console.log(response);
            this.editedTask.id = '';
            this.editedTask.name = '';
            this.editedTask.description = '';
            this.getTasks();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style>
  /* CSS styles here */
  </style>
  