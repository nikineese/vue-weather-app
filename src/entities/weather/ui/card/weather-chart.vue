<script setup lang="ts">
import Chart from "chart.js/auto";
import { computed, onMounted, ref, toRefs } from "vue";
import type { ForecastItem } from "@/shared/api/weather/types";
import { forecastListToChartData, forecastListToChartLabels } from "../../lib";
import { generateId } from "@/shared/helpers";
import type { ChartLabel } from "../../model";
const props = defineProps<{
  type: ChartLabel;
  name: string;
  list: ForecastItem[];
}>();

const { type, name, list } = toRefs(props);

const chart = ref();
const chartId = generateId();

const drawChart = (weatherChartData) => {
  chart.value?.destroy();
  const ctx = document.getElementById(
    `weather-chart-${type.value}-${chartId}`,
  ) as HTMLCanvasElement;
  chart.value = new Chart(ctx, weatherChartData);
};

const weatherChartData = computed(() => ({
  type: type.value === "days" || type.value === "hours" ? "line" : "bar",
  data: {
    labels: forecastListToChartLabels(type.value, list.value),
    datasets: [
      {
        data: forecastListToChartData(type.value, list.value),
        borderColor: "#646464",
        backgroundColor: type.value === "day" ? "#ffe1a1" : "#3d3d67",
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
        text: name.value,
      },
    },
  },
}));
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
