import { createMemoryHistory, createRouter } from 'vue-router';
import { createApp } from 'vue'
import App from './App.vue'
import { globalCookiesConfig } from "vue3-cookies";

import MainView from './views/MainView.vue'
import CalcView from './views/CalcView.vue'

const routes = [
  { path: '/', component: MainView },
  { path: '/calc', component: CalcView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

globalCookiesConfig({
  expireTimes: "30d",
  path: "/raschet.com/",
  domain: "",
  secure: true,
  sameSite: "None",
});

createApp(App).use(router).mount('#app')
//  .use(router)
  
