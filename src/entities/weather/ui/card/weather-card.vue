<script setup lang="ts">
import { capitalize, computed, ref } from "vue";
import { i18n } from "@/shared/i18n";
import {
  WEATHER_IMG_URL,
  useGetWeatherByCityCountry,
  useGetCitiesList,
} from "@/shared/api";
import type { WeatherResponse, ForecastResponse } from "@/shared/api";
import {
  InputAutocomplete,
  Loader,
  Modal,
  FavoritesIcon,
  CloseIcon,
} from "@/shared/ui";
import WeatherChart from "./weather-chart.vue";
import type { CardIdCity, ChartLabel } from "../../model";
import { ToggleDayNight } from "../buttons";
import { ChartLabelName } from "../../model";

defineEmits(["addFavourite", "removeFavourite", "changeLastFavourite"]);
const { id, city, cards, favourites } = defineProps<{
  id: number;
  city: string;
  isFavouritesTab?: boolean;
  cards?: CardIdCity[];
  favourites: CardIdCity[];
}>();

const { weathers, refetch } = useGetWeatherByCityCountry(
  { city },
  { lang: i18n.global.locale.value },
);

const { currentWeather, forecastWeather, forecastList } = weathers;

const { cities } = useGetCitiesList();

const currentCity = ref(city);
const chartLabel = ref<ChartLabel>("hours");

const loadCityErrorModalOpen = ref<boolean>(false);
const removeCardConfirmModalOpen = ref<boolean>(false);
const maxFavouritesModalOpen = ref<boolean>(false);

const loadCityError = ref<number>();

const isFavourite = computed(() =>
  favourites.some((c) => c.city === currentCity.value),
);

const handleChooseCurrentCity = async ($emit, city: string) => {
  if (!cards) return;
  currentCity.value = city;
  const prevValuesStorage: [
    WeatherResponse | undefined,
    ForecastResponse | undefined,
  ] = [currentWeather.value, forecastWeather.value];

  currentWeather.value = undefined;
  forecastWeather.value = undefined;

  const errStatus = await refetch({ city });
  if (errStatus) {
    currentWeather.value = prevValuesStorage[0];
    forecastWeather.value = prevValuesStorage[1];

    loadCityError.value = errStatus;
    loadCityErrorModalOpen.value = true;
    return;
  }

  const cardIndex = cards.findIndex((card) => card.id === id);
  cards.splice(cardIndex, 1);
  cards.splice(cardIndex, 0, { id, city: currentCity.value });
};

const handleChangeChartLabel = (label: ChartLabel) => {
  chartLabel.value = label;
};

const handleRemoveCard = () => {
  if (!cards) return;
  if (cards.length > 1) {
    cards.splice(
      cards.findIndex((c) => c.id === id),
      1,
    );
  }
};

const handleActionFavourite = ($emit) => {
  if (!isFavourite.value && favourites.length >= 5) {
    maxFavouritesModalOpen.value = true;
    return;
  }
  $emit(isFavourite.value ? "removeFavourite" : "addFavourite", {
    id,
    city: currentCity.value,
  });
};

const handleSubmitMaxFavouriteModal = ($emit) => {
  $emit("changeLastFavourite", { id, city: currentCity.value });
  maxFavouritesModalOpen.value = false;
};
</script>

<template>
  <div v-if="currentWeather && forecastWeather" class="weather-card">
    <div class="weather-card__content">
      <div class="weather-card__actions">
        <input-autocomplete
          v-if="cities && !isFavouritesTab"
          class="weather-card__input"
          :initial-value="currentCity"
          :cities="cities"
          @chooseCity="async (c) => await handleChooseCurrentCity($emit, c)"
        />
        <div class="weather-card__tabs">
          <button
            class="btn-weather"
            @click="handleChangeChartLabel('hours')"
            v-t="'today'"
            :class="{ active: chartLabel === 'hours' }"
          ></button>
          <button
            class="btn-weather"
            @click="handleChangeChartLabel('days')"
            v-t="'forecast'"
            :class="{ active: chartLabel === 'days' }"
          ></button>
          <toggle-day-night
            :chart-type="chartLabel"
            @changeType="handleChangeChartLabel"
          />
        </div>
      </div>
      <div class="weather-card__info">
        <div class="weather-card__name">
          <span
            >{{ currentWeather.name }} , {{ currentWeather.sys.country }}</span
          >
          <favorites-icon
            :fill="isFavourite"
            @click="handleActionFavourite($emit)"
            color="#d94343"
            :size="30"
          />
        </div>
        <div class="weather-card__icon">
          <img
            class="icon"
            :src="`${WEATHER_IMG_URL}/${currentWeather.weather[0].icon}.png`"
            alt="weather icon"
          />
          <span>{{ Math.round(currentWeather.main.temp) }}℃</span>
        </div>
        <div>
          <span
            ><span v-t="'feels_like'"></span>:
            {{ currentWeather.main.feels_like }}℃.
          </span>
          <span>{{ capitalize(currentWeather.weather[0].description) }}.</span>
        </div>
        <div>
          <span
            ><span v-t="'humidity'"> </span>:
            {{ currentWeather.main.humidity }}%
          </span>
          <span
            ><span v-t="'visibility'"></span>:
            {{ ((currentWeather?.visibility || 0) / 1000).toFixed(1) }}km</span
          >
        </div>
      </div>
    </div>
    <weather-chart
      :key="chartLabel"
      :name="ChartLabelName[chartLabel]"
      :type="chartLabel"
      :list="forecastList"
    />
    <close-icon
      class="remove-card-btn"
      v-if="!isFavouritesTab && cards && cards.length > 1"
      :size="30"
      color="#ff7b7b"
      @click="removeCardConfirmModalOpen = true"
    />
  </div>
  <loader v-else align-center />
  <modal
    title="error"
    v-if="loadCityErrorModalOpen && loadCityError"
    :message="loadCityError.toString()"
    @onClose="loadCityErrorModalOpen = false"
    @onSubmit="loadCityErrorModalOpen = false"
  />
  <modal
    v-if="removeCardConfirmModalOpen"
    title="confirm-remove"
    @onClose="removeCardConfirmModalOpen = false"
    @onSubmit="handleRemoveCard"
  />
  <modal
    v-if="maxFavouritesModalOpen"
    title="max-favourites"
    @onClose="maxFavouritesModalOpen = false"
    @onSubmit="handleSubmitMaxFavouriteModal($emit)"
  />
</template>

<style scoped>
.weather-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  -moz-box-shadow: 0 0 68px -50px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 68px -50px rgba(0, 0, 0, 0.75);
}
.weather-card__tabs {
  display: flex;
  gap: 15px;
}
.weather-card__actions {
  display: flex;
  gap: 10px;
}
.weather-card__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.weather-card__name {
  display: flex;
  align-items: center;
  gap: 10px;
}
.weather-card__icon {
  display: flex;
  align-items: center;
  font-size: 22px;
}
.weather-card__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.remove-card-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.btn-weather {
  font-size: 18px;
  cursor: pointer;
  border: none;
  font-weight: normal;
  border-bottom: 2px solid #707070;
  transition: all linear 0.1s;
  background-color: transparent;
}
.active {
  border-bottom: 2px solid #1ecaef;
}

@media (max-width: 1100px) {
  .weather-card__content {
    gap: 20px;
  }
  .btn-weather {
    font-size: 16px;
  }
  .weather-card__actions {
    gap: 20px;
    justify-content: center;
  }
  .weather-card {
    align-items: center;
    flex-direction: column;
    height: 500px;
  }
  .weather-card__info {
    align-items: center;
    text-align: center;
  }
}
@media (max-width: 575px) {
  .weather-card__actions {
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
