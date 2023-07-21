import { api, IP_API_KEY, IP_API_URL } from "@/shared/api";
import type { GeoapifyResponse } from "./types";
import { onBeforeMount, ref } from "vue";

export * from "./types";

export const useGetGeolocation = () => {
  const geolocation = ref<GeoapifyResponse>();

  const fetch = async () => {
    const res = await api.get<GeoapifyResponse>(
      `${IP_API_URL}/ipinfo?apiKey=${IP_API_KEY}`,
    );
    return res.data;
  };
  onBeforeMount(async () => {
    geolocation.value = await fetch();
  });
  return { geolocation };
};
