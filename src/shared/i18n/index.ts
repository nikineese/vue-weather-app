import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: Array.isArray(navigator.languages)
    ? navigator.languages[0]
    : navigator.language,
  legacy: false,
  messages: {
    "en-US": {
      Main: "Main",
      Favourites: "Favourites",
      today: "Today",
      forecast: "5-day forecast",
      feels_like: "Feels like",
      humidity: "Humidity",
      visibility: "Visibility",
      t_dur_d: "Temperature during day",
      t_dur_w: "Temperature during week",
      error: "Error!",
      "error-submit": "Try again",
      "confirm-remove": "Confirm card removal",
      "confirm-remove-message": "Are you want to delete this card?",
      "confirm-remove-submit": "Remove",
      "max-favourites": "Limit of favourites is reached",
      "max-favourites-message":
        "Do you want to delete delete last favourite to add this?",
      "max-favourites-submit": "Submit",
      "empty-tab": "This tab is currently empty",
      "404": "City wasn't founded",
    },
    uk: {
      Main: "Головна",
      Favourites: "Вибрані",
      today: "Сьогодні",
      forecast: "Прогноз на 5 днів",
      feels_like: "Відчувається",
      humidity: "Вологість",
      visibility: "Видимість",
      t_dur_d: "Температура протягом дня",
      t_dur_w: "Температура протягом тижня",
      error: "Помилка!",
      "error-submit": "Спробувати ще раз",
      "confirm-remove": "Підтвердження видалення картки",
      "confirm-remove-message": "Ви впевнені, що хочете видалити цю картку?",
      "confirm-remove-submit": "Видалити",
      "max-favourites": "Ліміт вибраних досягнуто",
      "max-favourites-message":
        "Чи хочете ви видалити останній вибраний і додати цей?",
      "max-favourites-submit": "Підтвердити",
      "empty-tab": "Ця сторінка поки що порожня",
      "404": "Місто не знайдено",
    },
  },
});
