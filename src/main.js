import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Authorization")) {
      config.headers.Authorization = localStorage.getItem("Authorization");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
