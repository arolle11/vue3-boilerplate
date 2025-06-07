<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ref } from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  data: {
    type: Object as () => {
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    },
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});

const chartData = ref({
  labels: props.data.labels,
  datasets: props.data.datasets,
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: !!props.title,
      text: props.title,
    },
  },
  cutout: "70%",
});
</script>
