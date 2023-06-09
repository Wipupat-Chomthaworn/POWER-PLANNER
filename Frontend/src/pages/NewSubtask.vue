<template>
  <div>
    <SideBar />
    <div class="p-4 sm:ml-64">
      <h2 class="text-2xl font-bold mb-3 mt-5">Create Subtask</h2>

      <form class="mb-4">
        <div class="form-group">
          <label for="subtaskDescription">Subtask Description:</label>
          <textarea class="form-control" id="subtaskDescription" v-model="newSubtask.subtask_desc" rows="4"
            required></textarea>
        </div>
        <br>
        <button type="submit" @click="createSubtask" class="bg-yellow-500 text-white py-2 px-4 rounded">Create
          Subtask</button>
      </form>

      <h2 class="text-2xl font-bold mb-4">Subtask List</h2>

      <div class="overflow-x-auto">
        <table class="w-full border">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-200">Subtask Description</th>
              <th class="px-4 py-2 bg-gray-200">Subtask Status</th>
              <th class="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subtask in subtasks" :key="subtask.subtask_id">
              <td class="px-4 py-2">{{ subtask.subtask_desc }}</td>
              <td class="px-4 py-2" :class="getSubtaskStatusColor(subtask.subtask_status)">
                {{ subtask.subtask_status }}
              </td>
              <td class="px-4 py-2">
                <button @click="markAsDone(subtask)" v-if="subtask.subtask_status === 'Todo'"
                  class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Mark as Done</button>
                <button @click="deleteSubtask(subtask)"
                  class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';
import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';

export default {
  name: 'SubtaskPage',
  components: {
    Navbar,
    SideBar,
  },
  data() {
    return {
      subtasks: [],
      newSubtask: {
        subtask_desc: '',
        subtask_status: 'Todo',
        task_id: this.$route.params.taskId,
      },
    };
  },
  created() {
    this.fetchSubtasks();
  },
  methods: {
    createSubtask() {
      if (this.newSubtask.subtask_desc.length > 255 || this.newSubtask.subtask_desc.length == 0) {
        alert("Invalid subtask desc character length")
      }
      else {
        axios
          .post(`/api/${this.$route.params.taskId}/addSubtask`, this.newSubtask)
        .then((response) => {
          // Reset form fields
          this.newSubtask.subtask_desc = '';
          alert(response.data.message);
          this.fetchSubtasks();
        })
        .catch((error) => {
          console.error(error);
        });
      }

    },
    fetchSubtasks() {
      axios
        .get(`/api/${this.newSubtask.task_id}/subtasks`)
        .then((response) => {
          this.subtasks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSubtaskStatusColor(subtaskStatus) {
      return subtaskStatus === 'Done' ? 'bg-green-500 text-white text-center' : 'bg-blue-500 text-white text-center';
    },
    markAsDone(subtask) {
      subtask.subtask_status = 'Done';
      axios
        .put(`/api/updateSubtask/${subtask.subtask_id}`, subtask)
        .then((response) => {
          alert("Mask As Done!");
          this.fetchSubtasks();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteSubtask(subtask) {
      axios
        .delete(`/api/del/${subtask.subtask_id}`)
        .then((response) => {
          alert("Deleted");
          this.fetchSubtasks();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
}

.table {
  display: table;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #e2e8f0;
}

.table tbody+tbody {
  border-top: 2px solid #e2e8f0;
}

.table .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.5rem;
}

.table-bordered {
  border: 1px solid #e2e8f0;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #e2e8f0;
}</style>
