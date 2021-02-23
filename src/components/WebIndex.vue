<template>
  <!--web端样式代码 start-->
  <div class="web">
    <!--head头部 start-->
    <div id="head" class="rel">
      <div class="container">
        <span class="logo"
          ><img
            width="47"
            src="http://oss.aliyuncs.com/saas-pubsentiment-docs/yq_csv/login_logo/2019/08/06/13d7430d7a2c91c82482cb709212b9ec.jpeg"
        /></span>
        <span class="r_btn_login abs">
          <a href="javascript:void(0)" @click="JumpLogin">登录</a>
        </span>
        <span class="r_btn_register abs">
          <a href="javascript:void(0)" @click="JumpRegister">注册</a>
        </span>
      </div>
    </div>
    <!--head头部 end-->
    <div class="content main">
      <!--第一页代码 start-->
      <div class="page page1 ones">
        <div class="relBox">
          <div class="relText">
            <ul>
              <li class="li_1">
                <h3 style="width: 130%">突发事件知识图谱可视化系统（POM）</h3>
                <p>
                  面向形态多样、分布广泛、关系复杂的海量多源异构数据，以突发事件信息抽取为目的，为面向突发事件的情报智能分析提供数据支撑，对涉及国家安全的政治、军事、社会等多个领域的具有重大意义。本课题面向突发事件实现知识图谱构建及可视化系统，在网络空间安全保障方面具有重要的实际应用价值和理论意义。
                </p>
              </li>
            </ul>
          </div>
          <div class="relImg">
            <img src="../assets/pic1_2.png" />
          </div>
        </div>
      </div>
    </div>
    <!--web端样式代码 end -->
  </div>
</template>

<script>
export default {
  name: "web",
  data() {
    return {};
  },
  methods: {
    JumpLogin() {
      this.$router.push("/login");
    },
    JumpRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped src="../../static/style_oem.css">
</style>