
<template>
    <div>
      <line-chart :chart-data="chartData" :chart-options="chartOptions"></line-chart>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    components: {
      LineChart: Line,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        required: false,
        default: () => ({}),
      },
    },
  };
  </script>
  
  <style scoped>
    canvas {
      max-width: 100%;
      height: auto;
    }
  </style>
  