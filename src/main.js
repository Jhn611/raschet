//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/raschet.com/",
  domain: "",
  secure: true,
  sameSite: "None",
});

createApp(App).mount('#app')
