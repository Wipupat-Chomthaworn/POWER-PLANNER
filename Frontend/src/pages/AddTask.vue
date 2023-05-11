<template>
    <div class="p-4 sm:ml-64">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">

          <!-- <div class="bg-{{ group.group_color }}-100 text-{{ group.group_color }}-700 rounded-md p-2 mb-4"> -->
            <div class="bg-green-100 text-black-700 rounded-md p-2 mb-4">
              <h1 class="text-2xl font-bold text-gray-800 mb-4">
              {{ group.group_name }}
              group 1
              </h1>
            </div>
            <!-- <p>Group color: {{ group.group_color }}</p> -->
          <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="py-10">
          <div class="max-w-xl mx-auto">
            <form @submit.prevent="addTask">
              <div class="mb-6">
                <label for="task_name" class="block text-sm font-medium text-gray-700">Task Name</label>
                <input type="text" id="task_name" name="task_name" v-model="taskName" autocomplete="off" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-6">
                <label for="task_desc" class="block text-sm font-medium text-gray-700">Task Description</label>
                <textarea id="task_desc" name="task_desc" v-model="taskDesc" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
              <div class="mb-6">
                <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
                <input type="date" id="due_date" name="due_date" v-model="dueDate" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="mb-6">
                <label for="notify_pref" class="block text-sm font-medium text-gray-700">Notify me when task is due</label>
                <div class="mt-1">
                  <div>
                    <label class="inline-flex items-center">
                      <input type="radio" id="notify_pref_yes" name="notify_pref" v-model="notifyPref" value="yes" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                      <span class="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center">
                      <input type="radio" id="notify_pref_no" name="notify_pref" v-model="notifyPref" value="no" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                      <span class="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddTask",
  data() {
    return {
      task_name: "",
      task_desc: "",
      task_status: "Todo",
      due_date: "",
      group_id: this.$route.params.group_id,
      notify_pref: "no",
    };
  },
  methods: {
    addTask() {
      const newTask = {
        task_name: this.task_name,
        task_desc: this.task_desc,
        task_status: this.task_status,
        due_date: this.due_date,
        group_id: this.group_id,
        notify_pref: this.notify_pref,
      };
      axios
        .post("http://localhost:3000/api/tasks/", newTask)
        .then((res) => {
          console.log(res.data);
          this.$router.push({ name: "TaskList", params: { group_id: this.group_id } });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // get the group ID from the URL
    const groupId = this.$route.params.groupId;

    // make a GET request to the backend to get the group data
    axios.get(`http://localhost:3000/api/TaskGroups/${groupId}`).then(response => {
      this.group = response.data;
    });

    // make a GET request to the backend to get the tasks for this group
    // axios.get(`/api/groups/${groupId}/tasks`).then(response => {
    //   this.tasks = response.data;
    // });
  },
  
};
</script>
<style>
.task-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
  