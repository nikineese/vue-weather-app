import axios, { AxiosError } from "axios";
import type {
  ForecastItem,
  ForecastResponse,
  RequestWeatherOptions,
  RequestWeatherQueryParams,
  WeatherResponse,
} from "./types";
import { onMounted, reactive, ref } from "vue";
import { weatherApiUrlStringBuilder } from "./helpers";

export * from "./types";

export const useGetWeatherByCityCountry = (
  queryParams: RequestWeatherQueryParams,
  options: RequestWeatherOptions,
) => {
  const currentWeather = ref<WeatherResponse>();
  const forecastWeather = ref<ForecastResponse>();
  const forecastList = reactive<ForecastItem[]>([]);

  const fetch = async (
    query: RequestWeatherQueryParams,
    opts: RequestWeatherOptions,
  ) => {
    const weatherResponse = await axios.get<WeatherResponse>(
      weatherApiUrlStringBuilder("weather", query, opts),
    );
    const forecastResponse = await axios.get<ForecastResponse>(
      weatherApiUrlStringBuilder("forecast", query, opts),
    );
    currentWeather.value = weatherResponse.data;
    forecastWeather.value = forecastResponse.data;

    if (forecastList.length > 0) {
      forecastList.splice(0);
    }
    forecastWeather.value?.list.forEach((el) => forecastList.push(el));
  };

  const refetch = async (query: RequestWeatherQueryParams, opts = options) => {
    try {
      await fetch(query, opts);
    } catch (e) {
      if (e instanceof AxiosError) {
        return e.response?.status;
      }
    }
  };

  onMounted(async () => {
    await fetch(queryParams, options);
  });

  return {
    weathers: {
      currentWeather,
      forecastWeather,
      forecastList,
    },
    refetch,
  };
};
