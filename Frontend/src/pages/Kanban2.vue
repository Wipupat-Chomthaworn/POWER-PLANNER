<template>
    <div>
      <div class="flex justify-center">
        <div class="flex w-11/12">
          <div class="w-1/4 p-4">
            <h2 class="text-lg font-medium mb-2">Late</h2>
            <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="late" v-dropzone="dropzoneOptions">
              <div v-for="task in tasks.late" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" v-draggable="draggableOptions" :data-id="task.task_id">
                {{ task.task_name }}
              </div>
            </div>
          </div>
          <div class="w-1/4 p-4">
            <h2 class="text-lg font-medium mb-2">Todo</h2>
            <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="todo" v-dropzone="dropzoneOptions">
              <div v-for="task in tasks.todo" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" v-draggable="draggableOptions" :data-id="task.task_id">
                {{ task.task_name }}
              </div>
            </div>
          </div>
          <div class="w-1/4 p-4">
            <h2 class="text-lg font-medium mb-2">Doing</h2>
            <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="doing" v-dropzone="dropzoneOptions">
              <div v-for="task in tasks.doing" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" v-draggable="draggableOptions" :data-id="task.task_id">
                {{ task.task_name }}
              </div>
            </div>
          </div>
          <div class="w-1/4 p-4">
            <h2 class="text-lg font-medium mb-2">Done</h2>
            <div class="bg-white shadow-sm rounded-md p-2 min-h-64" data-status="done" v-dropzone="dropzoneOptions">
              <div v-for="task in tasks.done" :key="task.task_id" class="bg-gray-100 rounded-md px-2 py-1 mb-2 cursor-pointer" v-draggable="draggableOptions" :data-id="task.task_id">
                {{ task.task_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
// import axios from 'axios'
import axios from '../plugins/axios';

import { mapState } from 'vuex'
import { draggable, dropzone } from 'vuedraggable'

export default {
  components: {
    draggable,
    dropzone
  },
  data () {
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
      }
    }
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    onDragEnd (event) {
      // Update the status of the task in the API
      axios.put(`/tasks/${event.item.id}`, { task_status: event.to.dataset.status })
        .then(response => {
          console.log(response)
          // Update the tasks in the store
          this.$store.dispatch('updateTask', { id: event.item.id, task_status: event.to.dataset.status })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTasks () {
      // Fetch actual data from backend and update tasks
      axios.get('/api/tasks')
        .then(response => {
          console.log(response)
          // Update the tasks in the store
          this.$store.dispatch('setTasks', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getTasks()
  }
}
</script>
