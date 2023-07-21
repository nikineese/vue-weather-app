<script setup lang="ts"></script>

<template>
  <div class="add-tab-btn">
    <span class="plus">+</span>
  </div>
</template>

<style scoped>
.add-tab-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a1bcf8;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-color: transparent;
  border: 3px solid #a1bcf8;
  transition: ease-in-out all 0.2s;
}
.add-tab-btn:hover {
  background-color: #a1bcf8;
  color: #fff;
}
.plus {
  font-size: 34px;
}
</style>
