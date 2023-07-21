export type CardIdCity = {
  id: number;
  city: string;
};
export enum ChartLabelName {
  "hours" = "Temperature during a day",
  "days" = "Temperature during a week",
  "day" = "Temperature during a daytime",
  "night" = "Temperature during a nighttime",
}
export type ChartLabel = "hours" | "days" | "day" | "night";
