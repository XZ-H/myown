import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    Username: localStorage.getItem("Username")
      ? localStorage.getItem("Username")
      : "",
  },
  getters: {
    getUname: (state) => {
      return state.Username;
    },
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem("Authorization", user.Authorization);
    },
    set_user(state, payload) {
      state.Username = payload.Username;
      localStorage.setItem("Username", payload.Username);
    },
    del_user(state) {
      state.Authorization = "";
      state.Username = "";
      localStorage.removeItem("Authorization");
      localStorage.removeItem("Username");
    },
  },
  actions: {
    setUserInfo({ commit }, payload) {
      setTimeout(() => {
        commit("set_user", payload);
      }, 100);
    },
  },
});
