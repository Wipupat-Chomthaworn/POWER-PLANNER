<template>
   <!-- <Navbar></Navbar> -->
   <SideBar></SideBar>
   <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
         <!-- <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800"> -->
         <h1
            class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-6xl h1x-5 py-5 text-center mr-2 mb-2"
         >
            Welcome to Power Planner
            <!-- {{ user.username }} -->
            !
            <!-- Owen! -->
         </h1>
         <!-- </div> -->
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">

               <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">               You have
               <span class="text-blue-600 dark:text-blue-500">{{ tasks.length }}</span> task </h1>
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mb-4">
            <div id="pie" class="flex items-center justify-center rounded bg-white-50 h-28 dark:bg-gray-800">
               <pie-chart :data="chartData"></pie-chart>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <ul>
               <li>{{ this.done }} TaskDone</li>

               <li>{{ this.doing }} TaskDoing</li>
               
               <li>{{ this.todo }} TaskTodo</li></ul>
            </div>
            <!-- <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  A list of upcoming deadlines
               </p>
               <ul class="mt-2">
                  <li v-for="task in tasksDueToday" :key="task.task_id" class="text-lg text-gray-700 dark:text-gray-300">
                     {{ task.task_name }}
                  </li>
               </ul>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  A section for alerts or notifications
               </p>
            </div> -->
         </div>
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               A list of recently Incomplete tasks
            </p>
         </div>
         <div v-for="task in tasks" :key="task.task_id" class="grid grid-cols-1 gap-4">
            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
               <li class="pb-3 sm:pb-4">
                  <span v-if="task.task_status !== 'Done'">
                  <router-link :to="`/taskGroups/${task.group_id}/tasks`" class="text-lg text-blue-500 hover:text-yellow-400">
                     {{ task.task_name }}
                  </router-link>
               </span>
               </li>
            </ul>
         </div>
         <!-- <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div> -->
      </div>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';
import PieChart from '../components/PieChart.vue';
// import axios from 'axios';
import axios from '../plugins/axios';

export default {
   components: {
      Navbar,
      SideBar,
      PieChart,
   },
   data() {
      return {
         tasks: [],
         chartData: null,
         done : 0,
         doing: 0,
         todo: 0,
      };
   },
   created() {
      axios
         .get('/api/GetTasks')
         .then((response) => {
            const tasks = response.data;
            this.tasks = response.data;
            this.done  = tasks.filter((task) => task.task_status === 'Done').length;
            this.todo = tasks.filter((task) => task.task_status === 'Todo').length;
            this.doing = tasks.filter((task) => task.task_status === 'Doing').length;
            console.log("getted",this.todo,this.doing,this.done)
         })
         .catch((error) => {
            console.log('home', error.message);
            console.error(error);
         });
   },
   computed: {
      tasksDueToday() {
         const today = new Date();
         return this.tasks.filter((task) => {
            const taskDate = new Date(task.due_date);
            return taskDate.toDateString() === today.toDateString();
         });
      },
   },
};
</script>
