<template>
  <div class="column" id="right-chart">
    <div class="panel bar_2">
      <h2>北美洲GDP对比图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
    <div class="panel line_2">
      <h2>湖北省产业指数对比图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
    <div class="panel pie_2">
      <h2>湖北省部分地区GDP对比图</h2>
      <div class="chart"></div>
      <div class="panel_footer"></div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");

require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
export default {
  name: "right-chart",
  methods: {
    drawRightBar: function () {
      var myChart = echarts.init(document.querySelector(".bar_2 .chart"));
      var myColor = ["#1089E7", "#F57474", "#56D0E3"];
      var option = {
        //图标位置
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%",
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            show: true,
            data: [],
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",

              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 5,
                  align: "center",
                  width: 15,
                  height: 15,
                },
              },
            },
          },
          {
            show: true,
            inverse: true,
            // data: valdata,
            data: [], //显示在右边的数据（yAxis）
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            // data: data,
            data: [],
            barCategoryGap: 50,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                color: "#fff",
                formatter: "{c} %",
              },
            },
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 50,
            data: [100, 100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 3,
                barBorderRadius: 15,
              },
            },
          }, //外框
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画

      $.getJSON("static/data/GDP_data_1.json", function (res) {
        let json = res[4].children;
        // console.log(json);
        let arry1 = []; //yAxis--data-左
        let arry2 = []; //yAxis--data-右
        let arrs = []; //series--data
        for (let i = 0; i < json.length; i++) {
          // console.log(json[i]['value']);
          arry1.push(json[i]["name"]);
          arry2.push(json[i]["value"].toFixed(2)); //push压值
          let s = (json[i]["value"] / res[4]["value"]) * 100;
          arrs.push(s.toFixed(2));
          // console.log(s.toFixed(2))
        }
        myChart.setOption({
          yAxis: [
            {
              data: arry1, //赋值
            },
            {
              data: arry2,
            },
          ],
          series: [
            {
              data: arrs,
            },
          ],
        });
      });
      myChart.hideLoading();
    },
    drawRightLine: function () {
      var myChart = echarts.init(document.querySelector(".line_2 .chart"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        legend: {
          top: "0%",
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },

            data: [], //横坐标数据，这里分别为 第一产业，第二产业，第三产业
          },
          {
            axisPointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            position: "bottom",
            // offset: 20,
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
            handleSize: "80%",
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
            min: 100, //y轴刻度从100开始
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
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
            name: "第一产业",
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ), //渐变色生成器
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: [], //第一产业指数
          },
          {
            name: "第二产业",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: [], //第二生产指数
          },
          {
            name: "第三产业",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#7FFF00", //line颜色
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(127, 255, 0, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(127, 255, 0, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#7FFF00",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: [], //第二生产指数
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
      this.axios
        .get("static/data/hb_GDP_zs.json")
        .then((res) => {
          let json = res.data;
          let arrx = []; //存x轴数据
          let arrs1 = []; //第一产业
          let arrs2 = []; //第二产业
          let arrs3 = [];
          // console.log("ok");
          for (let i in json) {
            // console.log(json[i]['地      区']);
            arrx.push(json[i]["地      区"]);
            arrs1.push(json[i]["第一产业"].toFixed(2));
            arrs2.push(json[i]["第二产业"].toFixed(2));
            arrs3.push(json[i]["第三产业"].toFixed(2));
          }
          myChart.setOption({
            xAxis: [
              {
                data: arrx, //赋值
              },
            ],
            series: [
              {
                data: arrs1,
              },
              {
                data: arrs2,
              },
              {
                data: arrs3,
              },
            ],
          });
          myChart.hideLoading();
        })
        .catch((err) => {
          console.log(err);
          // myChart.hideLoading();
        });
    },
    drawRightPie: function () {
      var myChart = echarts.init(document.querySelector(".pie_2  .chart"));
      var option = {
        // legend: {
        //   top: "90%",
        //   itemWidth: 10,
        //   itemHeight: 10,
        //   textStyle: {
        //     color: "rgba(255,255,255,.5)",
        //     fontSize: "12",
        //   },
        // },     //数据太多不好展示直接去掉
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)", //a 系列名称，b 数据项名称，c 数值，d 百分比
        },
        // 注意颜色写的位置
        color: [
          "#20B2AA",
          "#40E0D0",
          "#7FFFAA",
          "#00FA9A",
          "#FFFFE0",
          "#FFE4B5",
          "#F5DEB3",
          "#D2B48C", //8
          "#FFA07A",
          "	#FF7F50	",
          "	#FF4500	",
        ],
        series: [
          {
            name: "湖北省部分地区GDP",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["10%", "70%"],
            center: ["50%", "42%"],
            roseType: "radius",
            data: [],
            // 修饰饼形图文字相关的样式 label对象
            label: {
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10,
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
      this.axios
        .get("static/data/hb_GDP_1.json") //源数据对比差异太大，所以对数据做了手动修改，去掉了相差较大项
        .then((res) => {
          let json = res.data;
          option.series[0].data = json;
          myChart.hideLoading();
          myChart.setOption(option);
        })
        .catch((err) => {
          console.log(err);
          // myChart.hideLoading();
        });
    },
  },
  mounted() {
    this.drawRightBar();
    this.drawRightLine();
    this.drawRightPie();
  },
};
</script>

<style scoped>
</style>