<script setup lang="ts">
defineProps<{
  size: number;
  color: string;
  fill?: boolean;
}>();
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 582 523"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M307.804 499.45C298.614 502.694 283.479 502.694 274.289 499.45C195.908 472.693 20.7673 361.067 20.7673 171.871C20.7673 88.3551 88.0669 20.7853 171.043 20.7853C220.233 20.7853 263.748 44.5699 291.047 81.3278C318.345 44.5699 362.13 20.7853 411.051 20.7853C494.026 20.7853 561.326 88.3551 561.326 171.871C561.326 361.067 386.185 472.693 307.804 499.45Z"
      :stroke="color"
      stroke-width="40.5419"
      stroke-linecap="round"
      stroke-linejoin="round"
      :fill="fill ? color : ''"
    />
  </svg>
</template>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
