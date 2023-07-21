import type {
  RequestWeatherOptions,
  RequestWeatherQueryParams,
} from "@/shared/api/weather/types";
import { WEATHER_API_KEY, WEATHER_API_URL } from "@/shared/api";

export const weatherApiUrlStringBuilder = (
  type: "weather" | "forecast",
  query: RequestWeatherQueryParams,
  options: RequestWeatherOptions,
) => {
  const queryString = query ? Object.values(query).join(",") : "";
  const optsString = options
    ? Object.keys(options)
        .map((v, i) => `${v}=${options[v]}`)
        .join("&")
    : "";
  return `${WEATHER_API_URL}/${type}?q=${queryString}&appid=${WEATHER_API_KEY}&units=metric&${optsString}`;
};
