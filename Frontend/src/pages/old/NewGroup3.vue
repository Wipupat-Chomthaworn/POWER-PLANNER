<template>
    <div>
      <!-- <Navbar /> -->
      <SideBar />
      <div class="p-4 sm:ml-64">
        <h2>Create a new task group</h2>
        <br>
        <form @submit="createTaskGroup">
          <div class="form-group">
            <label for="taskGroupName">Task group name:</label>
            <input type="text" class="form-control" id="taskGroupName" v-model="newTaskGroup.group_name" required>
          </div>
          <div class="form-group">
            <label for="taskGroupColor">Task group color:</label>
            <input type="color" class="form-control" id="taskGroupColor" v-model="newTaskGroup.group_color" required>
          </div>
          <br>
          <button type="submit" class="btn btn-warning rounded-full">Create Task Group</button>
        </form>
        <hr>
        <h2 class="mb-4">
          <span @click="toggleCollapse" style="cursor: pointer;">All task groups:</span>
        </h2>
        <div v-if="taskGroups.length === 0">No task groups found</div>
        <ul v-else :class="{ 'hidden': isCollapsed }" class="max-w-full flex flex-wrap">
          <li v-for="(taskGroup, index) in taskGroups" :key="index" class="pb-3 sm:pb-4 flex items-center w-full bg-gray-100 rounded-lg p-4 mb-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-full" :style="{ backgroundColor: taskGroup.group_color }"></div>
            </div>
            <div class="flex-1 min-w-0 ml-3">
              <h4 :style="taskGroupStyle(taskGroup)" class="text-lg font-medium text-gray-900 truncate dark:text-white">{{ taskGroup.group_name }}</h4>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">Color: {{ taskGroup.group_color }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../plugins/axios';
  import Navbar from '../components/Navbar.vue';
  import SideBar from '../components/SideBar.vue';
  
  export default {
    name: 'App',
    components: {
      Navbar,
      SideBar,
    },
    data() {
      return {
        newTaskGroup: {
          group_name: '',
          group_color: '#000000',
        },
        taskGroups: [],
        isCollapsed: false,
      }
    },
    mounted() {
      this.getAllTaskGroups();
    },
    methods: {
      createTaskGroup() {
        axios.post('http://localhost:3000/api/addTaskGroups', this.newTaskGroup)
          .then((response) => {
            this.newTaskGroup.name = '';
            this.newTaskGroup.group_color = '#000000';
            this.getAllTaskGroups();
            alert(response);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getAllTaskGroups() {
        axios.get('http://localhost:3000/api/taskGroups')
          .then((response) => {
            this.taskGroups = response.data;
            console.log("res", response);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      taskGroupStyle(taskGroup) {
        return {
          color: taskGroup.group_color,
        };
      },
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add tailwind styles here */
  </style>
  