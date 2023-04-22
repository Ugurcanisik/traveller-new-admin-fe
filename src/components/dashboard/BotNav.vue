<template>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      ciroMax: null,
      ciroTotal: null,
      expenseMonth: null,
      expenseTotal: null
    }
  },
  methods: {
    month(value) {
      const month = {
        '01': 'Ocak',
        '02': 'Şubat',
        '03': 'Mart',
        '04': 'Nisan',
        '05': 'Mayıs',
        '06': 'Haziran',
        '07': 'Temmuz',
        '08': 'Ağustos',
        '09': 'Eylül',
        '10': 'Ekim',
        '11': 'Kasım',
        '12': 'Aralık'
      }
      return month[value]
    },
    chartCiro() {
      const ciro = this.$store.getters.allDashboard
      let monthName = []
      for (const i in ciro[0].chart.month) {
        monthName.push(this.month(ciro[0].chart.month[i]))
      }
      let mytotalIncomeChart = new Chart(this.$refs.chartCiro.id, {
        type: 'bar',
        data: {
          labels: monthName,
          datasets: [{
            label: "Total Income",
            backgroundColor: '#ff9e27',
            borderColor: 'rgb(23, 125, 255)',
            data: ciro[0].chart.total,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                display: false //this will remove only the label
              },
              gridLines : {
                drawBorder: false,
                display : false
              }
            }],
            xAxes : [ {
              gridLines : {
                drawBorder: false,
                display : false
              }
            }]
          },
        }
      });
    },
    charExpense() {
      const ciro = this.$store.getters.allDashboard
      let monthName = []
      for (const i in ciro[1].chart.month) {
        monthName.push(this.month(ciro[1].chart.month[i]))
      }
      let mytotalIncomeChart = new Chart(this.$refs.chartExpense.id, {
        type: 'bar',
        data: {
          labels: monthName,
          datasets: [{
            label: "Total Income",
            backgroundColor: '#ff9e27',
            borderColor: 'rgb(23, 125, 255)',
            data: ciro[1].chart.total,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                display: false //this will remove only the label
              },
              gridLines : {
                drawBorder: false,
                display : false
              }
            }],
            xAxes : [ {
              gridLines : {
                drawBorder: false,
                display : false
              }
            }]
          },
        }
      });
    },
  },
  computed: {
  },
  mounted() {

  },
  watch: {

  }
}
</script>
