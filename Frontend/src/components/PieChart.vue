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
  import { Pie } from 'vue-chartjs';
  
  export default {
    extends: Pie,
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart(this.data, {
        responsive: true,
        maintainAspectRatio: false
      });
    }
  };
  </script>
  