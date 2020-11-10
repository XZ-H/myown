<template>
  <div class="column" id="left-chart">
    <div class="panel bar_1">
      <h2 @click="goPageLeft1()">世界GDP对比图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
    <div class="panel line_1">
      <h2>亚洲GDP对比图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
    <div class="panel pie_1">
      <h2>饼状图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
// require("echarts/lib/component/");

export default {
  name: "left-chart",
  methods: {
    drawLeftBar: function () {
      // 实例化对象
      var myChart = echarts.init(document.querySelector(".bar_1 .chart"));
      console.log(echarts.version);
      // console.log(myChart);
      // 指定配置
      var option = {
        // 颜色
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
              interval: 0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              rotate: 30, //调整数值改变倾斜的幅度（范围-90到90）
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                // width: 1,
                // type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "各大洲GDP对比",
            type: "bar",
            barWidth: "35%",
            data: [],
            itemStyle: {
              barBorderRadius: 5,
            },
          },
        ],
      };
      myChart.setOption(option);

      // 图标适配屏幕
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
      this.axios
        .get("static/data/GDP_data_1.json")
        .then((res) => {
          // console.log(res.data)
          let json = res.data;
          let arrs = [];
          let arrx = [];

          for (let i in json) {
            // console.log(json[i]);
            arrx.push(json[i]["name"]);
            arrs.push(json[i]["value"]);
          }
          option.xAxis[0].data = arrx;
          option.series[0].data = arrs;
          myChart.hideLoading();
          myChart.setOption(option);
        })
        .catch((err) => {
          console.log(err);
          // myChart.hideLoading();
        });
    },
    drawLeftLine: function () {
      var myChart = echarts.init(document.querySelector(".line_1 .chart"));
      var option = {
        color: ["#00f2f1"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis",
        },
        legend: {
          // 距离容器10%
          right: "10%",
          // 修饰图例文字的颜色
          textStyle: {
            color: "#4c9bfd",
          },
          // 如果series 里面设置了name，此时图例组件的data可以省略
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          show: true,
          borderColor: "#012f4a",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            // 去除刻度
            axisTick: {
              show: false,
            },
            // 修饰刻度标签的颜色
            axisLabel: {
              color: "rgba(255,255,255,.7)",
            },
            // 去除x坐标轴的颜色
            axisLine: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "50%",
            handleStyle: {
              color: "#4169E1",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // 去除刻度
            axisTick: {
              show: false,
            },
            // 修饰刻度标签的颜色
            axisLabel: {
              color: "rgba(255,255,255,.7)",
            },
            // 修改y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: "#012f4a",
              },
            },
          },
        ],
        series: [
          {
            name: "亚洲各国家GDP",
            type: "line",
            // stack: "xxxxxxx",
            // 是否让线条圆滑显示
            smooth: true,
            data: [],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
      this.axios
        .get("static/data/GDP_data_1.json")
        .then((res) => {
          let json = res.data;
          let arrx = [];
          let arrs = [];
          // console.log("ok");
          for (let i in json[0]["children"]) {
            // console.log(json[0]["children"]);
            arrx.push(json[0]["children"][i]["name"]);
            arrs.push(json[0]["children"][i]["value"]);
          }
          option.xAxis[0].data = arrx;
          option.series[0].data = arrs;
          myChart.hideLoading();
          myChart.setOption(option);
        })
        .catch((err) => {
          console.log(err);
          // myChart.hideLoading();
        });
    },
    drawLeftPie: function () {
      var myChart = echarts.init(document.querySelector(".pie_1 .chart"));

      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a}<br>{b} : {c} ({d}%)", //a 系列名称，b 数据项名称，c 数值，d 百分比
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          },
        },
        legend: {
          orient: "vertical",
          x: "left",
          itemWidth: 10,
          itemHeight: 10,
          data: [
            "德国",
            "英国",
            "法国",
            "意大利",
            "俄罗斯",
            "西班牙",
            "荷兰",
            "瑞士",
            "瑞典",
            "波兰",
          ],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },

        series: [
          {
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: ["#065aab", "#066eab"],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      $.getJSON("static/data/GDP_data_1.json", function (res) {
        let ep = res[1].children;
        // console.log(ep.length);
        let arrs = [];

        for (let i = 0; i < ep.length; i++) {
          let m = {};
          m["name"] = ep[i]["name"];
          m["value"] = ep[i]["value"];
          arrs.push(m);
        }
        myChart.setOption({
          series: [
            {
              name: "欧洲GDP占比",
              data: arrs,
              color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab",
                "#06b4ab",
                "#06c8ab",
                "#06dcab",
                "	#00FF7F",
                "	#90EE90",
              ],
            },
          ],
        });
      });
      myChart.hideLoading();
      myChart.setOption(option);
    },
    goPageLeft1: function () {
      window.location.href = "/static/pages/Left1.html";
    },
  },
  mounted() {
    this.drawLeftBar();
    this.drawLeftLine();
    this.drawLeftPie();
  },
};
</script>

<style scoped>
</style>