import axios from "axios";
export const api = axios.create();

const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || "";
};

export const IP_API_URL = getEnvVar("VITE_IP_API_URL");
export const IP_API_KEY = getEnvVar("VITE_IP_API_KEY");
export const WEATHER_API_KEY = getEnvVar("VITE_WEATHER_API_KEY");
export const WEATHER_API_URL = getEnvVar("VITE_WEATHER_API_URL");
export const WEATHER_IMG_URL = getEnvVar("VITE_WEATHER_IMG_URL");
export const COUNTRY_CITIES_API_URL = getEnvVar("VITE_COUNTRY_CITIES_API_URL");
