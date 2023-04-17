
<template>
    <SideBar></SideBar>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">My Tasks</h1>
      <div class="flex flex-col">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2"></th>
              <th class="px-4 py-2">Task</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Notify</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) in groups" :key="index">
              <td class="px-4 py-2 font-semibold text-gray-900" :style="{ backgroundColor: group.color }">{{ group.name }}
              </td>
              <td class="px-4 py-2" v-for="(task, index) in group.task_name"></td>
            </tr>
            <tr v-for="(task, index) in selectedTasks" :key="index">
              <td class="px-4 py-2"></td>
              <td class="px-4 py-2 font-semibold text-gray-900">
                <div class="flex items-center">
                  <input class="mr-2" type="text" v-model="task.task_name" :disabled="task.isEditingName === false">
                  <button class="text-blue-500 hover:text-blue-700 focus:outline-none"
                    @click="task.isEditingName = !task.isEditingName">{{ task.isEditingName ? 'Save' : 'Edit' }}</button>
                </div>
              </td>
              <td class="px-4 py-2">
                <div class="flex items-center">
                  <textarea class="mr-2" v-model="task.task_desc" :disabled="task.isEditingDesc === false"></textarea>
                  <button class="text-blue-500 hover:text-blue-700 focus:outline-none"
                    @click="task.isEditingDesc = !task.isEditingDesc">{{ task.isEditingDesc ? 'Save' : 'Edit' }}</button>
                </div>
              </td>
              <td class="px-4 py-2">
                <button class="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none"
                  @click="task.task_status = 'Done'">{{ task.task_status === 'Done' ? 'Done' : 'Not Done' }}</button>
              </td>
              <td class="px-4 py-2">
                <button class="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none"
                  @click="task.notify_preference = !task.notify_preference">{{ task.notify_preference ? 'Yes' : 'No'
                  }}</button>
              </td>
              <td class="px-4 py-2">
                <button
                  class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from '../components/SideBar.vue'
  
  export default {
    data() {
      return {
        "groups": [
          {
            "name": "Personal",
            "color": "pink",
            "tasks": [
              {
                "task_name": "Workout",
                "task_desc": "Jog for 30 minutes, do 20 pushups, and stretch for 10 minutes",
                "task_status": "not done",
                "notify_preference": "yes",
                "subtasks": [
                  {
                    "subtask_name": "Jog for 30 minutes",
                    "subtask_status": "not done"
                  },
                  {
                    "subtask_name": "Do 20 pushups",
                    "subtask_status": "not done"
                  },
                  {
                    "subtask_name": "Stretch for 10 minutes",
                    "subtask_status": "not done"
                  }
                ]
              },
              {
                "task_name": "Groceries",
                "task_desc": "Buy milk, bread, and eggs",
                "task_status": "done",
                "notify_preference": "no",
                "subtasks": []
              }
            ]
          },
          {
            "name": "Work",
            "color": "purple",
            "tasks": [
              {
                "task_name": "Meeting with boss",
                "task_desc": "Discuss project timeline and deliverables",
                "task_status": "not done",
                "notify_preference": "yes",
                "subtasks": []
              },
              {
                "task_name": "Submit report",
                "task_desc": "Compile weekly progress report for team",
                "task_status": "not done",
                "notify_preference": "yes",
                "subtasks": [
                  {
                    "subtask_name": "Gather data",
                    "subtask_status": "not done"
                  },
                  {
                    "subtask_name": "Write report",
                    "subtask_status": "not done"
                  },
                  {
                    "subtask_name": "Review report",
                    "subtask_status": "not done"
                  }
                ]
              }
            ]
          }
        ],
        selectedGroup: "Personal",
        selectedTasks: [],
      };
    },
    created() {
      fetch("../data/data.json")
        .then(response => response.json())
        .then(data => {
          this.tasks = data.tasks
        })
    },
    mounted() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks) {
        this.tasks = storedTasks;
      }
      this.filterTasksByGroup(this.selectedGroup);
    },
    methods: {
      filterTasksByGroup(group) {
        this.selectedGroup = group;
        this.selectedTasks = this.tasks.filter(task => task.group === group);
      },
      saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    },
    watch: {
      tasks: {
        handler: "saveTasks",
        deep: true,
      }
    },
    components: { SideBar }
  }
  </script>
      
    
    <!-- <template>
        <SideBar></SideBar>
        <div class="bg-gray-100 py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold mb-4">Task Groups</h1>
            <div class="overflow-x-auto">
              <table class="table-auto border">
                <thead>
                  <tr>
                    <th class="px-4 py-2 border"></th>
                    <th class="px-4 py-2 border">Name</th>
                    <th class="px-4 py-2 border">Color</th>
                    <th class="px-4 py-2 border">Group Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(group, index) in groups" :key="index">
                    <td class="px-4 py-2 border">{{ index + 1 }}</td>
                    <td class="px-4 py-2 border">{{ group.name }}</td>
                    <td class="px-4 py-2 border">
                      <div class="bg-{{ group.color }}-500 rounded-md h-6 w-6"></div>
                    </td>
                    <td class="px-4 py-2 border">
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="toggleTasks(index)"
                      >
                        {{ group.showTasks ? 'Hide Tasks' : 'Show Tasks' }}
                      </button>
                      <ul v-if="group.showTasks" class="list-disc pl-4">
                        <li v-for="(task, index) in group.tasks" :key="index">
                          <span class="font-bold">{{ task.name }}:</span>
                          <ul class="list-disc pl-4">
                            <li v-for="(subtask, index) in task.subtasks" :key="index">
                              {{ subtask }}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
      
      <script>
      import data from '@/data/tasks.json';
      
      export default {
        data() {
          return {
            groups: data.groups.map(group => ({
              ...group,
              showTasks: false,
            })),
          };
        },
        methods: {
          toggleTasks(index) {
            this.groups[index].showTasks = !this.groups[index].showTasks;
          },
        },
      };
      </script>
      
      <style scoped>
      /* Add Tailwind CSS classes here */
      </style>
       -->



       <template>
  
        <div>
          <h1>owen</h1>
          <div v-for="group in groups">
            {{group.name}}
            <div v-for="task in tasks">
              <h1>{{ task.task_name }}</h1>
              <h2>{{ task.task_desc }} <span>{{ task.task_status }}</span> </h2>
              <div v-for="subtask in subtasks">
                <h2>{{ subtask.subtask_name }} <span> {{ subtask.subtask_status }}</span></h2>
              </div>
      
            </div>
          </div>
        </div>
      
      </template>
      
      <script>
      
        export default {
          data() {
            return {
              groups: [
                {
                  name: "Personal",
                  color: "pink",
                  tasks: [
                    {
                      task_name: "Workout",
                      task_desc: "Jog for 30 minutes, do 20 pushups, and stretch for 10 minutes",
                      task_status: "not done",
                      notify_preference: "yes",
                      subtasks: [
                        { subtask_name: "Jog for 30 minutes", subtask_status: "not done" },
                        { subtask_name: "Do 20 pushups", subtask_status: "not done" },
                        { subtask_name: "Stretch for 10 minutes", subtask_status: "not done" },
                      ],
                    },
                    {
                      task_name: "Groceries",
                      task_desc: "Buy milk, bread, and eggs",
                      task_status: "done",
                      notify_preference: "no",
                      subtasks: [],
                    },
                  ],
                },
                {
                  name: "Work",
                  color: "purple",
                  tasks: [
                    {
                      task_name: "Meeting with boss",
                      task_desc: "Discuss project timeline and deliverables",
                      task_status: "not done",
                      notify_preference: "yes",
                      subtasks: [],
                    },
                    {
                      task_name: "Submit report",
                      task_desc: "Compile weekly progress report for team",
                      task_status: "not done",
                      notify_preference: "yes",
                      subtasks: [
                        { subtask_name: "Gather data", subtask_status: "not done" },
                        { subtask_name: "Write report", subtask_status: "not done" },
                        { subtask_name: "Review report", subtask_status: "not done" },
                      ],
                    },
                  ],
                },
              ],
              openGroups: [],
            };
          },
          methods: {
          },
        };
      </script>
      