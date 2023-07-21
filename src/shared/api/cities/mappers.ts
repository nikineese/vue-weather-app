import type { Country } from "@/shared/api/cities/types";

export const countriesToCitiesMapper = (countries: Country[]) => {
  return countries.map((c) => c.cities).flat();
};
