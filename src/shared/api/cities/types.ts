export type Country = {
  country: string;
  cities: string[];
};

export type CountriesResponse = {
  success: boolean;
  data: Country[];
};
