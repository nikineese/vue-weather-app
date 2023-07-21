<script setup lang="ts">
import CloseIcon from "@/shared/ui/icons/close-icon.vue";

defineEmits(["onSubmit", "onClose"]);
defineProps<{
  title: string;
  message?: string;
}>();
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h6 v-t="`${title}`"></h6>
      <p v-t="`${message || `${title}-message`}`"></p>
      <button @click="$emit('onSubmit')" v-t="`${title}-submit`"></button>
      <close-icon
        class="close"
        @click="$emit('onClose')"
        color="#f8a1a1"
        :size="30"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  position: relative;
  text-align: center;
  background-color: white;
  height: max-content;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ffffff;
  cursor: pointer;
  width: 150px;
  border: 3px solid #ff7b7b;
  height: 40px;
  color: #707070;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
@media (max-width: 1100px) {
  .modal-overlay {
    align-items: center;
    padding: 10px;
  }
}
</style>
