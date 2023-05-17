<!-- <template>
    <div>
       <canvas ref="chart"></canvas>
    </div>
 </template>
 
 <script>
 import Chart from 'chart.js';
 
 export default {
    mounted() {
       this.renderChart();
    },
    methods: {
       renderChart() {
          const ctx = this.$refs.chart.getContext('2d');
          const chart = new Chart(ctx, {
             type: 'pie',
             data: {
                labels: ['Tasks Completed', 'Tasks Remaining'],
                datasets: [{
                   label: 'Tasks',
                   data: [5, 10],
                   backgroundColor: ['#36a2eb', '#ff6384']
                }]
             }
          });
       }
    }
 }
 </script>
  -->


  <template>
   <div>
     <canvas ref="chart"></canvas>
   </div>
 </template>
 
 <script>
 import Chart from 'chart.js';
//  import axios from 'axios';
import axios from '../plugins/axios';

 
 export default {
   data() {
     return {
       chart: null,
       chartData: {
         labels: ['Todo','Doing', 'Done'],
         datasets: [
           {
             backgroundColor: ['#FF6384', '#36A2EB',  '#936584'],
             data: [10, 5, 6]
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
     axios.get('/api/GetTasks').then(response => {
      console.log("Pie res", response.data)
       const doneCount = response.data.filter(task => task.task_status === 'Done').length;
       const todoCount = response.data.filter(task => task.task_status === 'Todo').length;
       const doingCount = response.data.filter(task => task.task_status === 'Doing').length;
       this.chartData.datasets[0].data = [todoCount, doingCount, doneCount];
       this.chart.update();
     });
   }
 };
 </script>
 