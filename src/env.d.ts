interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_IP_API_KEY: string;
  readonly VITE_IP_API_URL: string;
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_WEATHER_API_URL: string;
  readonly VITE_WEATHER_IMG_URL: string;
  readonly VITE_COUNTRY_CITIES_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
