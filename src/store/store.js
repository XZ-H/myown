import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    students: [
      {
        name: "hxz",
        age: 20,
        sex: "",
      },
      {
        name: "lq",
        age: 21,
        sex: "",
      },
      {
        name: "yz",
        age: 10,
        sex: "",
      },
      {
        name: "qy",
        age: 9,
        sex: "",
      },
    ],
  },
  getters: {
    getLover: (state) => (name) => {
      return state.students.find((student) => student.name == name);
    },
    getAdults: (state) => {
      return state.students.filter((student) => student.age > 10);
    },
  },
  mutations: {
    completeInfo: (state) => {
      //   state.students = { ...state.students, sex: "" };   //...obj展开语法，只做简单的第一层遍历后再添加sex属性，浅拷贝
      state.students.forEach((student) => {
        if (student.name == "hxz" || student.name == "yz") {
          student["sex"] = "男";
        } else {
          student["sex"] = "女"; //倘若，state.students里没有声明sex字段，前端调用此方法发现sex字段并没有加载出来
        }
        // console.log(student);
      });
    },
    reduceAge: (state, payload) => {
      state.students.forEach((student) => {
        student.age -= payload;
      });
    },
  },
  actions: {
    reduceAgeLimit({ commit }, payload) {
      setTimeout(() => {
        commit("reduceAge", payload);
      }, 3000);
    },
  },
});
