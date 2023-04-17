<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 
           border-none
           rounded-lg dark:border-gray-700 mt-14">
      <SideBar></SideBar>
      <div class="main-content">
        <h1>owen</h1>
        <div v-for="group in groups">
          group name :{{ group.name }}
          <div v-for="task in group.tasks">
            <h1>task_name : {{ task.task_name }}</h1>
            <h2>task_desc : {{ task.task_desc }} <span>task_status:{{ task.task_status }}</span> </h2>
            <div v-for="subtask in task.subtasks">
              <h2>{{ subtask.subtask_name }} <span> status : {{ subtask.subtask_status }}</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import axios from 'axios'
export default {
  components: { SideBar },
  data() {
    return {
      groups: [

      ],
      openGroups: [],
    };
  },
  methods: {
  },
  mounted() {
    axios.get('http://localhost:3000/api/groups/1')
      .then(response => {
        this.groups = response.data.groups;
        console.log("fetch groups successful")
      })
      .catch(error => {
        console.log(error)
      })
  }
};
</script>
<style>
.container {
  display: flex;
  flex-direction: row;
}

.main-content {
  margin-left: 20px;
  /* adjust as needed */
  margin-top: 20px;
  /* adjust as needed */
  flex-grow: 1;
}
</style>





