<script setup lang="ts">
import Chart from "chart.js/auto";
import { computed, onMounted, ref, watch } from "vue";
import type { ForecastItem } from "@/shared/api/weather/types";
import { forecastListToChartData, forecastListToChartLabels } from "../../lib";
import { generateId } from "@/shared/helpers";
import type { ChartLabel } from "../../model";
const { type, name, list } = defineProps<{
  type: ChartLabel;
  name: string;
  list: ForecastItem[];
}>();
const chart = ref();
const chartId = generateId();

const drawChart = (weatherChartData) => {
  chart.value?.destroy();
  const ctx = document.getElementById(
    `weather-chart-${type}-${chartId}`,
  ) as HTMLCanvasElement;
  chart.value = new Chart(ctx, weatherChartData);
};

const weatherChartData = computed(() => ({
  type: type === "days" || type === "hours" ? "line" : "bar",
  data: {
    labels: forecastListToChartLabels(type, list),
    datasets: [
      {
        data: forecastListToChartData(type, list),
        borderColor: "#646464",
        backgroundColor: type === "day" ? "#ffe1a1" : "#3d3d67",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: name,
      },
    },
  },
}));

watch(list, () => {
  drawChart(weatherChartData.value);
});

onMounted(() => {
  drawChart(weatherChartData.value);
});
</script>

<template>
  <div class="chart">
    <canvas :id="`weather-chart-${type}-${chartId}`"></canvas>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 250px;
  @media (max-width: 1100px) {
    width: 450px;
  }
  @media (max-width: 575px) {
    width: 280px;
    height: 200px;
  }
}
</style>
