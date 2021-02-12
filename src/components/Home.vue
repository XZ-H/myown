<template>
  <div id="home">
    <el-container>
      <el-header>
        <div id="pom-icon">
          <img src="../assets/pom-icon.png" alt="system icon" />
        </div>
        <div id="pom-navigation">
          <nav>
            <router-link
              class="col"
              custom
              v-slot="{ href, navigate, isActive }"
              v-for="(item, index) in $router.options.routes[2].children"
              :key="index + 1"
              :to="item.path"
              exact
            >
              <li :class="{ active: isActive }">
                <a :href="href" @click="navigate">
                  <i class="nav-border"></i>{{ item.name }}
                </a>
              </li>
            </router-link>
          </nav>
        </div>
        <div id="pom-opreation">
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu class="pom-dropdown" slot="dropdown">
              <el-dropdown-item @click.native="jump('logout')"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item @click.native="jump('mine')"
                >个人中心</el-dropdown-item
              >
            </el-dropdown-menu>
            <span style="margin-left: 10px; font-size: 16px">{{
              username
            }}</span>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer
        ><div id="pom-copyright">
          ©2021 Flashwhite. All rights reserved.
        </div></el-footer
      >
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      username: "getUname",
    }),
  },
  methods: {
    jump(where) {
      switch (where) {
        case "logout":
          this.$store.commit("del_user");
          this.$router.push("/login");
          break;
        case "mine":
          this.$router.push("/mine");
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #47a0e4;
  color: #333;
  line-height: 100px;
  display: flex;
  height: 100px !important;
}
.el-footer {
  background-color: #47a0e4;
  line-height: 60px;
  color: #e9e0d6;
  display: flex;
  height: 60px !important;
  align-items: center;
  justify-content: center;
}
.el-main {
  background-color: #e9e9ea;
  color: #333;
  margin: 0;
  padding: 0 !important;
}
body > .el-container {
  margin-bottom: 40px;
}
#pom-icon {
  width: 240px;
  margin-right: 60px;
  padding: 5px;
}
#pom-icon img {
  width: auto;
  height: 90%;
}
#pom-icon,
#pom-navigation,
#pom-opreation {
  display: inline-block;
  line-height: 100px !important;
}
#pom-opreation {
  position: absolute;
  top: 0;
  right: 100px;
}
nav li {
  list-style-type: none;
  width: 100px;
  display: inline-block;
  text-align: center;
  position: relative;
}
nav li a {
  text-decoration: none;
  color: #333;
}
.active {
  background-color: #1f6ed4;
  cursor: pointer;
}
.nav-border {
  width: 1px;
  display: inline-block;
  background-color: #333;
  margin-right: 15px;
  height: 15px;
  position: absolute;
  top: 43px;
  left: 0;
}
.pom-dropdown {
  position: absolute;
  width: 100px;
  top: 57px !important;
  left: 1045px !important;
}
</style>