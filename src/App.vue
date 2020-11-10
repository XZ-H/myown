<template>
  <div id="app">
    <header>
      <h1>数据可视化 - ECharts</h1>
      <div class="showTime"></div>
    </header>
    <section class="mainBox">
      <left-chart></left-chart>
      <middle-chart></middle-chart>
      <right-chart></right-chart>
    </section>
  </div>
</template>

<script>
import LeftChart from "./components/LeftChart";
import MiddleChart from "./components/MiddleChart";
import RightChart from "./components/RightChart";

export default {
  name: "app",
  components: {
    LeftChart,
    MiddleChart,
    RightChart,
  },
  methods: {
    timer: function () {
      var t = null;
      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        var dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        document.querySelector(".showTime").innerHTML =
          "当前时间：" +
          y +
          "年" +
          mt +
          "月" +
          day +
          "日 " +
          h +
          "时" +
          m +
          "分" +
          s +
          "秒";
        t = setTimeout(time, 1000); //设定定时器，循环运行
      }
    },
  },
  mounted(){
    this.timer();
  }
};
</script>

<style scoped>
</style>>
