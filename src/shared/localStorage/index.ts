import { LocalStorageKey } from "@/shared/localStorage/keys";
import { reactive } from "vue";
import type { CardIdCity } from "@/entities/weather/model/types";

export const useGetFavourites = () => {
  const favourites = reactive<CardIdCity[]>([]);
  const favs = localStorage.getItem(LocalStorageKey.WeatherFavourites);
  if (favs) {
    const favsParsed = JSON.parse(favs);
    favsParsed.forEach((f) => favourites.push(f));
  }

  const addFavourite = (fav: CardIdCity) => {
    favourites.push({
      ...fav,
      id: (favourites[favourites.length - 1]?.id || 0) + 1,
    });
    localStorage.setItem(
      LocalStorageKey.WeatherFavourites,
      JSON.stringify(favourites),
    );
  };
  const removeFavourite = (fav: CardIdCity) => {
    const favIndex = favourites.findIndex((f) => f.city === fav.city);
    favourites.splice(favIndex, 1);
    localStorage.setItem(
      LocalStorageKey.WeatherFavourites,
      JSON.stringify(favourites),
    );
  };
  const changeLastFavourite = (fav: CardIdCity) => {
    removeFavourite(favourites[favourites.length - 1]);
    addFavourite(fav);
  };
  return { favourites, addFavourite, removeFavourite, changeLastFavourite };
};
