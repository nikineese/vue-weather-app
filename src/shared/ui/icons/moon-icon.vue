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
    viewBox="0 0 584 601"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5253 312.471C32.5721 456.195 154.528 573.128 300.485 579.547C403.464 584.012 495.56 536.011 550.817 460.381C573.701 429.404 561.422 408.752 523.188 415.729C504.49 419.078 485.234 420.473 465.14 419.636C328.672 414.054 217.042 299.912 216.483 165.117C216.204 128.837 223.739 94.5107 237.414 63.2542C252.484 28.6487 234.344 12.1832 199.46 26.9743C88.9455 73.58 13.3158 184.931 22.5253 312.471Z"
      :stroke="color"
      stroke-width="41.8615"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped></style>
