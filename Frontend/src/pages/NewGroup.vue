<template>
  <div>
    <NavBar />
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
      <h2>
        <span @click="toggleCollapse" style="cursor: pointer;">All task groups:</span>
      </h2>
      <div v-if="taskGroups.length === 0">No task groups found</div>
      <ul v-else :class="{ 'hidden': isCollapsed }">
        <li v-for="(taskGroup, index) in taskGroups" :key="index">
          <h4 :style="taskGroupStyle(taskGroup)">{{ taskGroup.group_name }}</h4>
          <p>Color: {{ taskGroup.group_color }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import axios from "../plugins/axios";
import axios from '../plugins/axios'
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';

export default {
  name: 'App',
  components: {
    NavBar, SideBar,
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
    }
  }
}
</script>

<style scoped>
/* Add tailwind styles here */
</style>
