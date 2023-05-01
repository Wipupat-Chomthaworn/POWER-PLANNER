<template>
    <div>
      <line-chart :data="chartData" :options="chartOptions"></line-chart>
    </div>
  </template>
  
  <script>
import { Line } from 'vue-chartjs';
import Chart from 'chart.js';

  
  export default {
    extends: Line,
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    mounted () {
      this.renderChart({
        labels: this.data.map(d => d.date),
        datasets: [
          {
            label: 'Tasks Completed',
            borderColor: '#1E90FF',
            data: this.data.map(d => d.completedTasks)
          },
          {
            label: 'Tasks Created',
            borderColor: '#FF6347',
            data: this.data.map(d => d.totalTasks)
          }
        ]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }]
        }
      })
    }
  }
  </script>
  