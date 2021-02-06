import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";
import Register from "@/components/Register";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    //如果访问/login
    next();
  } else if (to.path === "/register") {
    //如果访问/register
    next();
  } else {
    let token = localStorage.getItem("Authorization");
    if (token === null || token === "") {
      //如果未登录访问
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
