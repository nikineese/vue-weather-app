import { createApp } from "vue";
import App from "./index.vue";

import "./index.css";
import { i18n } from "@/shared/i18n";

export const app = createApp(App).use(i18n).mount("#app");
