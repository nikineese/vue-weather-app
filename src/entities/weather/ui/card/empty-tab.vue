<script setup lang="ts"></script>

<template>
  <div class="empty-tab">
    <span class="empty-tab__text" v-t="'empty-tab'"></span>
  </div>
</template>

<style scoped>
.empty-tab {
  display: flex;
  justify-content: center;
}
.empty-tab__text {
  font-size: 22px;
  color: #707070;
}
</style>
