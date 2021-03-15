import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    // 存储username
    Username: localStorage.getItem("Username")
      ? localStorage.getItem("Username")
      : "",
    // 存储navData--Analyze组件
    navData: ["信息汇总", "微博分析", "微信分析"],
    //存储emotion conditions--Analyze组件
    emotions: ["全部", "正面", "中性", "负面"],
    //存储media conditions--Analyze组件
    medias: [
      "全部",
      "微信",
      "微博",
      "网页",
      "报刊",
      "客户端",
      "论坛",
      "今日头条",
    ],
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
