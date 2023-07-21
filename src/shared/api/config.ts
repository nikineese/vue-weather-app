import axios from "axios";

export const api = axios.create();
export const IP_API_URL = import.meta.env.VITE_IP_API_URL;
export const IP_API_KEY = import.meta.env.VITE_IP_API_KEY;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;
export const WEATHER_IMG_URL = import.meta.env.VITE_WEATHER_IMG_URL;
export const COUNTRY_CITIES_API_URL = import.meta.env
  .VITE_COUNTRY_CITIES_API_URL;
