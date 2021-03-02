<template>
  <div class="login">
    <el-form class="form" :rules="rules" :model="form" ref="form">
      <h3>登录</h3>
      <el-form-item label="用户名" label-width="80px" prop="name">
        <el-input
          class="item"
          v-model="form.name"
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          class="item"
          type="password"
          v-model="form.password"
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item>
        <div class="usr-register">
          <span style="color: #606060">没有账号?</span
          ><router-link :to="{ path: './register' }">立即申请</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      userToken: "",
    };
  },

  methods: {
    ...mapMutations(["changeLogin"]),
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let _this = this;
          this.axios({
            method: "post",
            url: "/api/login",
            data: _this.form,
          })
            .then((res) => {
              switch (res.data.code) {
                case 0:
                  alert("用户还未注册，请先注册您的账号");
                  break;
                case 1:
                  alert("您输入的密码有误，请重新输入");
                  break;
                case 2: {
                  _this.userToken = "Pom " + res.data.token;
                  // 将用户token保存到vuex中
                  _this.$store.commit("changeLogin", {
                    Authorization: _this.userToken,
                  });
                  _this.$store.dispatch("setUserInfo", {
                    Username: _this.form.name,
                  });
                  _this.$router.push("/home");
                  break;
                }
              }
            })
            .catch((error) => {
              alert("数据库连接错误");
              console.log(error);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #bcdef3;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login h3 {
  text-align: center;
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
}
.form {
  max-width: 300px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.login-btn {
  width: 80%;
  margin: 0 10%;
}
.usr-register {
  float: right;
  margin-right: 15%;
}
.usr-register a {
  color: #1ab2ff;
}
.usr-register a:hover {
  color: #2c2fd6;
}
.item {
  width: 75%;
}
</style>