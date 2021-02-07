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
              tag="li"
              class="col"
              class-active="active"
              to="/home"
              exact
              ><i class="nav-border"></i>首页总览
            </router-link>
            <router-link
              tag="li"
              class="col"
              class-active="active"
              to="/login"
              exact
              ><i class="nav-border"></i>图谱总览</router-link
            >
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
          </el-dropdown>
        </div>
        <div id="pom-usrname">
          <span>这里是用户名长度测试</span>
        </div>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("del_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 100px;
  display: flex;
  height: 100px !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
#pom-opreation,
#pom-usrname {
  display: inline-block;
  line-height: 100px !important;
}
#pom-opreation {
  position: absolute;
  top: 0;
  right: 200px;
}
#pom-usrname {
  position: absolute;
  top: 0;
  right: 35px;
}

nav li {
  list-style-type: none;
  width: 100px;
  display: inline-block;
  text-align: center;
  position: relative;
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
}
</style>