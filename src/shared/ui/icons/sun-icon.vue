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
    viewBox="0 0 596 596"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M298.047 473.497C395.074 473.497 473.728 394.843 473.728 297.816C473.728 200.79 395.074 122.134 298.047 122.134C201.02 122.134 122.365 200.79 122.365 297.816C122.365 394.843 201.02 473.497 298.047 473.497Z"
      :stroke="color"
      stroke-width="40.5419"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M491.026 490.795L487.512 487.282M487.512 108.35L491.026 104.836M105.067 490.795L108.581 487.282M298.047 29.6989V27.5366M298.047 568.095V565.933M29.9296 297.816H27.7673M568.326 297.816H566.164M108.581 108.35L105.067 104.836"
      :stroke="color"
      stroke-width="54.0559"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped></style>
