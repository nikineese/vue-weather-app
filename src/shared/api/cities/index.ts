import { api, COUNTRY_CITIES_API_URL } from "@/shared/api";
import type { CountriesResponse } from "./types";
import { onBeforeMount, ref } from "vue";
import { countriesToCitiesMapper } from "./mappers";

export * from "./types";

export const useGetCitiesList = () => {
  const cities = ref<string[]>();

  const fetch = async (): Promise<CountriesResponse> => {
    const res = await api.get<CountriesResponse>(COUNTRY_CITIES_API_URL);
    return res.data;
  };
  onBeforeMount(async () => {
    const countries = await fetch();
    cities.value = countriesToCitiesMapper(countries.data);
  });
  return { cities };
};
