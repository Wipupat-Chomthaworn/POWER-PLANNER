<template>
  <!-- <Navbar/> -->
  <SideBar></SideBar>

  <div class="p-10 sm:ml-64 mt-10">
    <div class="flex justify-center">
      <div class="flex w-11/12">
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2 bg-blue-500 text-white p-2 rounded-md">Todo</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64 space-y-2" data-status="todo">
            <!-- Task items here -->
            <div v-for="task in filteredTasks('Todo')" :key="task.task_id"
              class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer task-item"
              :class="{ 'text-red-500': isTaskOverdue(task) }" :data-id="task.task_id">
              <div class="flex justify-between items-center">
                <h1>{{ task.task_name }}</h1>
                <div>
                  <button class="p-1 rounded-full bg-blue-500 text-white focus:outline-none"
                    @click="changeTaskStatus(task, 'doing')">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2 bg-yellow-500 text-white p-2 rounded-md">Doing</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64 space-y-2" data-status="doing">
            <!-- Task items here -->
            <div v-for="task in filteredTasks('Doing')" :key="task.task_id"
              class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer task-item"
              :class="{ 'text-red-500': isTaskOverdue(task) }" :data-id="task.task_id">
              <div class="flex justify-between items-center">
                <h1>{{ task.task_name }}</h1>
                <div>
                  <button class="p-1 rounded-full bg-blue-500 text-white focus:outline-none"
                    @click="changeTaskStatus(task, 'todo')">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z"/></svg>
                  </button>
                  <button class="p-1 rounded-full bg-blue-500 text-white focus:outline-none"
                    @click="changeTaskStatus(task, 'done')">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z"/></svg>

                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2 bg-green-500 text-white p-2 rounded-md">Done</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64 space-y-2" data-status="done">
            <!-- Task items here -->
            <div v-for="task in filteredTasks('Done')" :key="task.task_id"
              class="bg-green-100 rounded-md px-2 py-1 mb-2 cursor-pointer task-item"
              :class="text-green-400" :data-id="task.task_id">
              <div class="flex justify-between items-center">
                <h1>{{ task.task_name }}</h1>
                <div>
                  <button class="p-1 rounded-full bg-blue-500 text-white focus:outline-none"
                    @click="changeTaskStatus(task, 'doing')">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from '../plugins/axios';
import SideBar from '../components/SideBar.vue';

export default {
  components: {
    SideBar
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    getTasks() {
      // Fetch actual data from backend and update tasks
      axios.get('/api/GetTasks')
        .then(response => {
          console.log(response)
          this.tasks = response.data;
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeTaskStatus(task, status) {
      // Update the status of the task in the API
      axios.put(`/api/kanbanStatusTask/${task.task_id}`, { task_status: status })
        .then(response => {
          console.log(response)
          // Update the tasks locally
          // task.task_status = status;
        this.getTasks();
        })
        .catch(error => {
          console.log(error)
        })
    },
//     changeTaskStatus(task, status) {
//   // Find the task index in the tasks array
//   const index = this.tasks.findIndex(t => t.task_id === task.task_id);
//   if (index !== -1) {
//     // Update the task status locally
//     this.tasks[index].task_status = status;
//     // Reorder the tasks based on the status
//     const movedTask = this.tasks.splice(index, 1)[0];
//     if (status === 'doing') {
//       this.tasks.splice(index, 0, movedTask);
//     } else if (status === 'todo') {
//       this.tasks.splice(0, 0, movedTask);
//     } else if (status === 'done') {
//       this.tasks.push(movedTask);
//     }
//   }
// },



    isTaskOverdue(task) {
      const dueDate = new Date(task.due_date);
      const currentDate = new Date();
      return dueDate < currentDate;
    },
    filteredTasks(status) {
      return this.tasks.filter(task => task.task_status === status);
    }
  },
  created() {
    this.getTasks()
  }
}
</script>

<style scoped>
.task-item {
  transition: background-color 0.3s ease;
}

.task-item:hover {
  background-color: #F1F5F9;
}

.task-item.text-red-500 {
  background-color: #FEE2E2;
}
</style>
