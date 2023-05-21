<template>
  <!-- <Navbar/> -->
  <SideBar></SideBar>

  <div class="p-10 sm:ml-64 mt-10">
    <div class="flex justify-center">
      <div class="flex w-11/12">
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2">Todo</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="todo" v-dropzone="dropzoneOptions">
            <draggable v-model="tasks" :options="draggableOptions">
              <div v-for="task in filteredTasks('Todo')" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" :class="{ 'text-red-500': isTaskOverdue(task) }" :data-id="task.task_id">
                <h1>{{ task.task_name }}</h1>
              </div>
            </draggable>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2">Doing</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="doing" v-dropzone="dropzoneOptions">
            <draggable v-model="tasks" :options="draggableOptions">
              <div v-for="task in filteredTasks('Doing')" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" :class="{ 'text-red-500': isTaskOverdue(task) }" :data-id="task.task_id">
                <h1>{{ task.task_name }}</h1>
              </div>
            </draggable>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <h2 class="text-lg font-medium mb-2">Done</h2>
          <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="done" v-dropzone="dropzoneOptions">
            <draggable v-model="tasks" :options="draggableOptions">
              <div v-for="task in filteredTasks('Done')" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" :class="{ 'text-red-500': isTaskOverdue(task) }" :data-id="task.task_id">
                <h1>{{ task.task_name }}</h1>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';
import { draggable, dropzone } from 'vuedraggable'
import SideBar from '../components/SideBar.vue';

export default {
  components: {
    draggable,
    dropzone,
    SideBar
  },
  data() {
    return {
      draggableOptions: {
        disabled: false,
        forceFallback: true,
        dropzoneSelector: '.dropzone'
      },
      dropzoneOptions: {
        accept: function (element, source) {
          return source.classList.contains('dropzone')
        }
      },
      tasks: []
    }
  },
  methods: {
    onDragEnd(event) {
      // Update the status of the task in the API
      axios.put(`/tasks/${event.item.id}`, { task_status: event.to.dataset.status })
        .then(response => {
          console.log(response)
          // Update the tasks locally
          this.updateTaskStatus(event.item.id, event.to.dataset.status);
        })
        .catch(error => {
          console.log(error)
        })
    },
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
    updateTaskStatus(taskId, status) {
      const taskIndex = this.tasks.findIndex(task => task.task_id === taskId);
      if (taskIndex !== -1) {
        const updatedTask = { ...this.tasks[taskIndex], task_status: status };
        this.$set(this.tasks, taskIndex, updatedTask);
      }
    },
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
.draggable {
  cursor: grab;
}
</style>
