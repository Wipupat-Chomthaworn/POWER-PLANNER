<template>
   <div>
     <canvas ref="chart"></canvas>
   </div>
 </template>
 
 <script>
 import Chart from 'chart.js';
 
 export default {
   data() {
     return {
       chart: null,
       chartData: {
         labels: ['Done', 'Todo'],
         datasets: [
           {
             
             data: [1, 2],
             backgroundColor: ['#36A2EB', '#FF6384'],
           }
         ]
       }
     };
   },
   mounted() {
     // Initialize chart with mock data
     this.chart = new Chart(this.$refs.chart, {
       type: 'pie',
       data: this.chartData
     });
 
     // Fetch actual data from backend and update chart
     axios.get('/api/tasks').then(response => {
       const doneCount = response.data.filter(task => task.status === 'done').length;
       const leftCount = response.data.filter(task => task.status === 'left').length;
       this.chartData.datasets[0].data = [doneCount, leftCount];
       this.chart.update();
     });
   }
 };
 </script>
 