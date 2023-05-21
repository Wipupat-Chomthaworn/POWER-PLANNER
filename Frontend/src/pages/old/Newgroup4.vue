<template>
  <div>
    <SideBar />
    <div class="p-4 sm:ml-64">
      <h2 class="text-2xl font-bold mb-4">Create a new task group</h2>
      <form @submit="createTaskGroup" class="mb-4">
        <div class="flex items-center mb-4">
          <label for="taskGroupName" class="w-32 mr-4">Task group name:</label>
          <input type="text" class="border border-gray-300 px-2 py-1 rounded" id="taskGroupName" v-model="newTaskGroup.group_name" required>
        </div>
        <div class="flex items-center mb-4">
          <label for="taskGroupColor" class="w-32 mr-4">Task group color:</label>
          <input type="color" class="border border-gray-300 px-2 py-1 rounded" id="taskGroupColor" v-model="newTaskGroup.group_color" required>
        </div>
        <div class="flex items-center mb-4">
          <label for="taskGroupDescription" class="w-32 mr-4">Task group description:</label>
          <textarea class="border border-gray-300 px-2 py-1 rounded" id="taskGroupDescription" v-model="newTaskGroup.group_description"></textarea>
        </div>
        <button type="submit" class="bg-yellow-500 text-white py-2 px-4 rounded">Create Task Group</button>
      </form>
      <hr class="my-6">
      <h2 class="text-2xl font-bold mb-4">
        <span @click="toggleCollapse" style="cursor: pointer;">All task groups:</span>
      </h2>
      <div v-if="taskGroups.length === 0" class="text-gray-500">No task groups found</div>
      <ul v-else :class="{ 'hidden': isCollapsed }" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <li v-for="(taskGroup, index) in taskGroups" :key="index" class="bg-white shadow rounded-lg p-4">
          <router-link :to="'/task-groups/' + taskGroup.id" class="flex flex-col items-center">
            <div class="w-20 h-20 rounded-full mb-4" :style="{ backgroundColor: taskGroup.group_color }"></div>
            <h4 :style="taskGroupStyle(taskGroup)" class="text-lg font-medium text-gray-900 truncate">{{ taskGroup.group_name }}</h4>
            <p class="text-sm text-gray-500 truncate">Color: {{ taskGroup.group_color }}</p>
            <p class="text-sm text-gray-500">{{ taskGroup.group_description }}</p>
          </router-link>
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
          this.newTaskGroup.group_name = '';
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
    }
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>
