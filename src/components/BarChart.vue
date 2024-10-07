<template>
  <Bar :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getRelativePosition } from 'chart.js/helpers';
//import { rendimentoBruto } from '@/pages/Simul.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed:{
    myStyles (){
      return{
        height: Immutable,
        position: getRelativePosition
      }
    }
  },
  data() {
    return {
      chartData: {
        labels: [ 'CDB/LC', 'Debênture', 'LCI & LCA ', 'Tesouro Direto', 'Poupança'],
        datasets: [
          {
            label: 'Investimentos',
            backgroundColor: '#FCFC30',
            data: [40, 20, 12, 10, 20], // rendimentoBruto, /* Valores de cada investimento*/
            indexAxis: 'y' // Transforma em barras horizontais
          }
        ]
      }
    }
  }
}
</script>
