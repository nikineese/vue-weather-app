<script setup lang="ts">
defineProps<{
  size: number;
  color: string;
}>();
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 31 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.52356 0L0 5.38854L2.82054 8.14013L9.79354 15.0573L2.82054 21.8599L0 24.4968L5.52356 30L8.34409 27.2484L15.4346 20.3312L22.4076 27.2484L25.1106 30L30.7517 24.4968L27.9312 21.8599L20.8406 15.0573L27.9312 8.14013L30.7517 5.38854L25.1106 0L22.4076 2.75159L15.4346 9.55414L8.34409 2.75159L5.52356 0Z"
      :fill="color"
    />
  </svg>
</template>

<style scoped></style>
