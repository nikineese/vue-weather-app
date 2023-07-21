<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "ts-debounce";
import Loader from "@/shared/ui/loader.vue";

const { initialValue, cities } = defineProps<{
  initialValue: string;
  cities: string[];
}>();

const searchLoading = ref(false);
const isOptionsOpen = ref(false);

const city = ref(initialValue);
const filteredCities = ref<string[]>([]);

const chooseCity = ($emit, c) => {
  $emit("chooseCity", c);
  closeOptions();
  city.value = c;
};

const closeOptions = debounce(() => {
  isOptionsOpen.value = false;
}, 100);

const filterCities = debounce(() => {
  filteredCities.value = cities.filter((c) =>
    c.toLowerCase().startsWith(city.value.toLowerCase()),
  );
  searchLoading.value = false;
}, 300);

watch(city, () => {
  searchLoading.value = true;
  filterCities();
});
</script>

<template>
  <div class="input-autocomplete">
    <input
      class="input"
      @focus="isOptionsOpen = true"
      @blur="closeOptions()"
      @keydown.enter="chooseCity($emit, city)"
      placeholder="Enter your city"
      type="text"
      v-model="city"
    />
    <div v-show="isOptionsOpen" class="cities">
      <loader align-center v-if="searchLoading" />
      <div v-else>
        <div v-if="filteredCities.length <= 0">
          <span>City isn't found</span>
        </div>
        <div
          class="city"
          @click="chooseCity($emit, c)"
          v-for="c in filteredCities"
        >
          <span>{{ c }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-autocomplete {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  color: #707070;
  z-index: 1;
  line-height: 30px;
  font-size: 18px;
  outline: none;
  border: none;
  background-color: transparent;
  transition: 0.1s all ease-in-out;
  border-bottom: 3px solid #c9c8c8;
}
.input:focus {
  color: #383838;
  border-bottom: 3px solid #c2ffff;
}
.cities {
  color: #707070;
  position: absolute;
  top: 35px;
  background-color: #fff;
  width: 100%;
  border: 1px solid #c2ffff;
  max-height: 200px;
  overflow-y: auto;
}
.city {
  cursor: pointer;
  user-select: none;
}
input {
  outline: none;
}
@media (max-width: 1100px) {
  .input {
    font-size: 16px;
  }
}
</style>
