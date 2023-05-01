


<template>
   <!-- <Navbar></Navbar> -->
   <SideBar></SideBar>
   <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 
   border-none
   rounded-lg dark:border-gray-700 mt-14">
      <!-- <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-black-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-black-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div> -->
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-black-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               Welcome to the Planner 
               <!-- {{ user.username }} -->
               Owen!
            </p>
         </div>
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-black-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               <!-- u have complete -->
               <!-- <TimelineGraph :data="timelineData" /> -->
               
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mb-4">
            <div id="pie" class="flex items-center justify-center rounded bg-white-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  There are 
                 

               </p>
               <pie-chart :data="chartData"></pie-chart>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">u have complete 100 task</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">A list of recently completed tasks</p>
            </div>
         </div>
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-black-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500"> A list of recently completed tasks</p>
         </div>
         <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-black-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';
import PieChart from '../components/PieChart.vue';
import TimelineGraph from '../components/TimelineGraph.vue'
import axios from 'axios'

export default {
   components: {
      Navbar,
      SideBar,
      PieChart,
      TimelineGraph,
   },
   data() {
    return {
      chartData: null,
      timelineData: [
        { date: '2023-01-01', completedTasks: 0, totalTasks: 5 },
        { date: '2023-01-02', completedTasks: 2, totalTasks: 6 },
        { date: '2023-01-03', completedTasks: 4, totalTasks: 8 },
        { date: '2023-01-04', completedTasks: 6, totalTasks: 9 },
        { date: '2023-01-05', completedTasks: 8, totalTasks: 10 },
        { date: '2023-01-06', completedTasks: 10, totalTasks: 12 },
        { date: '2023-01-07', completedTasks: 12, totalTasks: 15 }
      ],
      //data here
    };
  },
  created() {
    axios.get('/api/tasks')
      .then(response => {
        const tasks = response.data;
        const done = tasks.filter(task => task.status === 'done').length;
        const left = tasks.filter(task => task.status === 'left').length;
        this.chartData = {
          labels: ['Done', 'Left'],
          datasets: [
            {
              data: [done, left],
              backgroundColor: ['#36a2eb', '#ff6384']
            }
          ]
        };
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>