// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import axios from "axios";
import VueAxios from 'vue-axios';
import echarts from 'echarts';
import Router from 'vue-router'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  // router,
  components: { App },
  template: "<App/>"
});
