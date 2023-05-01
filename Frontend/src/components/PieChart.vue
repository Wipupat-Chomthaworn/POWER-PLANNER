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
 
 export default {
   data() {
     return {
       chart: null,
       chartData: {
         labels: ['Done', 'Todo'],
         datasets: [
           {
             backgroundColor: ['#36A2EB', '#FF6384'],
             data: [10, 5]
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
 