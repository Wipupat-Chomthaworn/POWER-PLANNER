


<template>
   <!-- <Navbar></Navbar> -->
   <SideBar></SideBar>
   <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 
   border-none
   rounded-lg dark:border-gray-700 mt-14">
      <!-- <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div> -->
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               Welcome to the Planner
               <!-- {{ user.username }} -->
               Owen!
            </p>
         </div>
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               u have  
               {{ tasks.length }}
               <!-- 10  -->
               task left
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4 mb-4">
            <div id="pie" class="flex items-center justify-center rounded bg-white-50 h-28 dark:bg-gray-800">
               <!-- <p class="text-2xl text-gray-400 dark:text-gray-500">+
                  piechart here
                 

               </p> -->
               <pie-chart :data="chartData"></pie-chart>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  A list of upcoming deadlines
               </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p class="text-2xl text-gray-400 dark:text-gray-500">
                  A section for alerts or notifications
               </p>
            </div>
         </div>
         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
               A list of recently completed tasks
            </p>
         </div>
         <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
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
            </div>
         </div>
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
      chartData: null
    };
  },
  created() {
    axios.get('/api/GetTasks')
      .then(response => {
        const tasks = response.data;
        this.tasks = response.data;
        const done = tasks.filter(task => task.status === 'done').length;
        const left = tasks.filter(task => task.status === 'left').length;
        this.chartData = {
          labels: ['Done', 'Todo'],
          datasets: [
            {
              data: [done, left],
              backgroundColor: ['#36a2eb', '#ff6384']
            }
          ]
        };
      })
      .catch(error => {
         console.log("home", error.message)
        console.error(error);
      });
  }
};
</script>