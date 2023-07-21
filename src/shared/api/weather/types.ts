export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    message?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export type ForecastResponse = {
  city: {
    id: number;
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type RequestWeatherQueryParams = {
  city?: string;
  country?: string;
};
export type RequestWeatherOptions = {
  lang: string;
};
