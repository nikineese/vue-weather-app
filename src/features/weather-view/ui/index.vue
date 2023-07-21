<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { TabsSelector, Tab } from "@/entities/tabs";
import type { CardIdCity } from "@/entities/weather";
import type { GeoapifyResponse } from "@/shared/api";
import { Loader } from "@/shared/ui";
import { AddCardBtn, WeatherCard, EmptyTab } from "@/entities/weather";
import { useGetFavourites } from "@/shared/localStorage";

const { geolocation } = defineProps<{
  geolocation: GeoapifyResponse;
}>();

const { favourites, addFavourite, removeFavourite, changeLastFavourite } =
  useGetFavourites();

const selectedTab = ref<Tab>(Tab.Main);
const cards = reactive<CardIdCity[]>([]);

const handleSelectTab = (tab: Tab) => {
  selectedTab.value = tab;
};
const handleAddCard = () => {
  cards.push({
    id: cards[cards.length - 1].id + 1,
    city: geolocation.city.name || "New York",
  });
};

onMounted(async () => {
  cards.push({
    id: 0,
    city: geolocation.city.name || "New York",
  });
});
</script>

<template>
  <main v-if="geolocation">
    <tabs-selector :active-tab="selectedTab" @selectTab="handleSelectTab" />
    <div class="main-tab">
      <weather-card
        v-if="selectedTab === Tab.Main && cards"
        v-for="c in cards"
        :key="c.id"
        :id="c.id"
        :city="c.city"
        :cards="cards"
        :favourites="favourites"
        @addFavourite="addFavourite"
        @removeFavourite="removeFavourite"
        @changeLastFavourite="changeLastFavourite"
      />
      <weather-card
        v-else
        v-for="c in favourites"
        :key="c.id"
        :id="c.id"
        :city="c.city"
        :isFavouritesTab="true"
        :favourites="favourites"
        @addFavourite="addFavourite"
        @removeFavourite="removeFavourite"
        @changeLastFavourite="changeLastFavourite"
      />
      <empty-tab
        v-show="selectedTab === Tab.Favourites && !favourites.length"
      />
      <add-card-btn
        v-show="cards.length < 5 && selectedTab === Tab.Main"
        @click="handleAddCard"
      />
    </div>
  </main>
  <loader v-else align-center />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.main-tab {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
@media (max-width: 1100px) {
  .main-tab {
    align-items: center;
  }
}
</style>
