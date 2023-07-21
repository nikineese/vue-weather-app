<script setup lang="ts">
import { Tab } from "@/entities/tabs/model/types";
import TabButton from "@/entities/tabs/ui/tab-button.vue";
defineProps<{
  activeTab: Tab;
}>();
</script>

<template>
  <div class="tabs-selector">
    <tab-button
      v-for="tab in Tab"
      :tab="tab"
      @click="$emit('selectTab', tab)"
      :is-active="activeTab === tab"
    />
  </div>
</template>

<style scoped>
.tabs-selector {
  display: flex;
  gap: 10px;
}

@media (max-width: 1100px) {
  .tabs-selector {
    justify-content: center;
  }
}
</style>
