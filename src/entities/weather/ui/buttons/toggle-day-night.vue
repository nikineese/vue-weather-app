<script setup lang="ts">
import { SunIcon, MoonIcon } from "@/shared/ui";
import type { ChartLabel } from "../../model";
defineEmits(["changeType"]);
defineProps<{
  chartType: ChartLabel;
}>();
</script>

<template>
  <div
    class="toggle"
    :class="{ active: chartType === 'day' || chartType === 'night' }"
  >
    <moon-icon
      @click="$emit('changeType', 'night')"
      v-if="chartType === 'day'"
      :size="25"
      color="#707070"
    />
    <sun-icon
      @click="$emit('changeType', 'day')"
      v-else
      :size="25"
      color="#707070"
    />
  </div>
</template>

<style scoped>
.toggle {
  cursor: pointer;
  border-bottom: 2px solid #707070;
  user-select: none;
}
.active {
  border-bottom: 2px solid #1ecaef;
}
</style>
