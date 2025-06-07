<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  data: {
    type: Object as () => {
      labels: string[];
      datasets: {
        label: string;
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
      position: "top" as const,
    },
    title: {
      display: !!props.title,
      text: props.title,
    },
  },
});
</script>
