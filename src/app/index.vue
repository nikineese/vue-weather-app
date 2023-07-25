<script setup lang="ts">
import { MainPage } from "@/features/weather-view/ui/index";
import { useGetGeolocation } from "@/shared/api";
import { Loader, LogoIcon } from "@/shared/ui";

const { geolocation } = useGetGeolocation();
</script>

<template>
  <header class="header">
    <logo-icon />
  </header>
  <MainPage class="main" v-if="geolocation" :geolocation="geolocation" />
  <loader v-else align-center />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
}
</style>
