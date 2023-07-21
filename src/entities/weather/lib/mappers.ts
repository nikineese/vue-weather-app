import type { ForecastItem } from "@/shared/api/weather/types";
import type { ChartLabel } from "@/entities/weather/model/types";

const isDayTime = (t: number) => {
  return t > 6 && t <= 21;
};

export const forecastListToChartLabels = (
  label: ChartLabel,
  list: ForecastItem[],
) => {
  const data: string[] = [];
  for (let i = 0; i < list.length; i++) {
    const slicedDateString =
      label === "days" ? list[i].dt_txt.slice(0, 11) : list[i].dt_txt.slice(11);
    const slicedHourTime = Number(slicedDateString.slice(0, 2));
    const isDayChart = label === "day" && isDayTime(slicedHourTime);
    const isNightChart = label === "night" && !isDayTime(slicedHourTime);
    if (label === "hours" || isDayChart || isNightChart) {
      if (data.includes(slicedDateString)) {
        data.push(slicedDateString);
        break;
      }
      data.push(slicedDateString);
    }
    if (label === "days") {
      if (!data.includes(slicedDateString)) {
        data.push(slicedDateString);
      }
    }
  }
  return data;
};
export const forecastListToChartData = (
  label: ChartLabel,
  list: ForecastItem[],
) => {
  const chartData: number[] = [];
  if (label === "days") {
    const dateTempData: Record<string, number[]> = {};
    for (let i = 0; i < list.length; i++) {
      const date = list[i].dt_txt.slice(0, 11);
      if (!dateTempData[date]) {
        dateTempData[date] = [list[i].main.temp];
      } else {
        dateTempData[date].push(list[i].main.temp);
      }
    }
    Object.keys(dateTempData).forEach((k) => {
      chartData.push(
        dateTempData[k].reduce((a, c) => a + c, 0) / dateTempData[k].length,
      );
    });
  }
  if (label === "hours") {
    return list.map((v) => v.main.temp);
  }
  if (label === "day" || label === "night") {
    const timeList = list.filter((v) => {
      const h = Number(v.dt_txt.slice(11).slice(0, 2));
      return label === "day" ? isDayTime(h) : !isDayTime(h);
    });
    return timeList.map((v) => v.main.temp);
  }

  return chartData;
};
