<script setup lang="ts">
defineProps<{
  tab: string;
  isActive: boolean;
}>();
</script>

<template>
  <div class="tab" :class="{ active: isActive }">
    <span class="tab-text" v-t="tab"></span>
  </div>
</template>

<style scoped>
.tab {
  cursor: pointer;
  border-bottom: 2px solid #707070;
  transition: all linear 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding: 5px;
  background-color: transparent;
}
.active {
  border-bottom: 2px solid #1ecaef;
}
.tab-text {
  user-select: none;
}
</style>
