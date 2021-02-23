<template>
  <div id="pom-index">
    <div id="pom-index-box" class="box-left">
      <el-row id="innerBox-top">疫情信息统计</el-row>
      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="infectedNum" label="感染人数"></el-table-column>
        <el-table-column prop="curedNum" label="治愈人数"></el-table-column>
        <el-table-column prop="deadNum" label="死亡人数"></el-table-column>
      </el-table>
    </div>
    <div id="pom-index-box" class="box-right">
      <el-row id="innerBox-top">疫情信息可视化</el-row>
      <div id="box-right-chart1"></div>
    </div>
    <div id="pom-index-box" class="box-left row2">
      <el-row id="innerBox-top"
        >详情信息
        <div
          style="
            position: absolute;
            top: 0;
            right: 20px;
            width: 150px;
            height: 36px;
            padding: 2px 0;
          "
        >
          <el-dropdown placement="bottom" id="classify">
            <el-button type="primary" style="height: 36px"
              >{{ elBtnText }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="classify('media_type')"
                >媒体类型</el-dropdown-item
              >
              <el-dropdown-item @click.native="classify('emotional_attribute')"
                >情感属性</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
      <el-table :data="tableData2" style="width: 100%" max-height="331px">
        <el-table-column prop="[abstarct,original_link]" label="摘要">
          <template slot-scope="scope">
            <a :href="scope.row.original_link">{{ scope.row.abstract }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="media_type"
          label="媒体类型"
          v-if="show === 'media_type'"
        ></el-table-column>
        <el-table-column
          prop="emotional_attribute"
          label="情感属性"
          v-if="show === 'emotional_attribute'"
        ></el-table-column>
      </el-table>
    </div>
    <div id="pom-index-box" class="box-right row2">
      <el-row id="innerBox-top" class="distributed">{{
        innerBoxTop4_text
      }}</el-row>
      <div id="box-right-chart2"></div>
    </div>
  </div>
</template>
<script>
//引入基本模板
let echarts = require("echarts/lib/echarts");

//引入图形类型
require("echarts/lib/chart/pie");
require("echarts/lib/chart/line");

//引入使用组件tooltip、toolbox等
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/legend");
require("echarts/lib/component/grid");

export default {
  name: "index",
  data() {
    return {
      tableData1: [], //第一行表格数据
      chartData1: [], //第一行图数据
      tableData2: [], //第二行表格数据
      chartData2: [], //第二行图数据
      elBtnText: "情感属性",
      show: "emotional_attribute", //显示哪一列，初始为情感属性
      innerBoxTop4_text: "情感属性分布",
      timer: "", //定时器，定时更新数据
    };
  },
  methods: {
    getData() {
      let _this = this;
      this.axios.get("/api/index").then((res) => {
        if (res.status === 200) {
          let resp = res.data.data.row1; //第一行所需数据
          let respo = res.data.data.row2;
          //处理第一行所需数据
          //chart--legend
          let legend = Object.keys(resp[0]);
          for (let i in legend) {
            if (legend[i] === "date") legend.splice(i, 1); //删除不需要的数据时间，因为它是x轴
          }
          for (let i in legend) {
            switch (legend[i]) {
              case "infectedNum":
                legend[i] = "感染人数";
                break;
              case "curedNum":
                legend[i] = "治愈人数";
                break;
              case "deadNum":
                legend[i] = "死亡人数";
                break;
            }
          }
          _this.chartData1.push({
            legend: legend,
          });
          //chart-other
          let xData = [],
            infected = [],
            cured = [],
            dead = [],
            seriersData = [];
          for (let i = 0; i < resp.length; i++) {
            for (let j in resp[i]) {
              switch (j) {
                case "date":
                  xData.push(resp[i][j]); //日期：x轴
                  break;

                case "infectedNum":
                  infected.push(resp[i][j]); //感人人数：line1
                  break;

                case "curedNum":
                  cured.push(resp[i][j]); //治愈人数：line2
                  break;

                case "deadNum":
                  dead.push(resp[i][j]); //死亡人数：line3
                  break;
              }
            }
          }
          seriersData.push(
            {
              infectedNum: infected,
            },
            {
              curedNum: cured,
            },
            {
              deadNum: dead,
            }
          );
          _this.chartData1.push(
            {
              xAxisData: xData, //x轴数据
            },
            {
              seriersData: seriersData, //y轴数据
            }
          );
          _this.tableData1 = resp; //表格所用数据

          //处理第二行数据
          for (let i = 0; i < respo.length; i++) {
            if (respo[i].abstract.length >= 30) {
              respo[i].abstract = respo[i].abstract.substr(0, 30) + "...";
            }
          }
          _this.tableData2 = respo;
        }

        //画图
        _this.drawChart1();
        // _this.drawChart2_2();
      });
    },
    drawChart1() {
      let myChart = echarts.init(document.getElementById("box-right-chart1"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.chartData1[0].legend, //chartData.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false, //坐标轴两边留白
          data: this.chartData1[1].xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            color: "#1B253A",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
            rotate: 50,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#E5E9ED",
              // opacity:0.2
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "#E5E9ED",
              // 	opacity:0.1
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              color: "#a8aab0",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#E5E9ED",
                // 	opacity:0.1
              },
            },
          },
        ],
        series: [
          {
            name: "感染人数",
            type: "line",
            itemStyle: {
              color: "#f6003c",
              lineStyle: {
                color: "#f6003c",
                width: 1,
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(246,0,60,0)",
                },
                {
                  offset: 1,
                  color: "rgba(246,0,60,0.35)",
                },
              ]),
            },
            data: this.chartData1[2].seriersData[0].infectedNum,
          },
          {
            name: "治愈人数",
            type: "line",
            itemStyle: {
              color: "rgba(157,211,168,1)",
              lineStyle: {
                color: "rgba(157,211,168,1)",
                width: 1,
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(157,211,168,0)",
                },
                {
                  offset: 1,
                  color: "rgba(157,211,168,0.55)",
                },
              ]),
            },
            data: this.chartData1[2].seriersData[1].curedNum,
          },
          {
            name: "死亡人数",
            type: "line",
            itemStyle: {
              color: "rgba(45,45,45,1)",
              lineStyle: {
                color: "rgba(45,45,45,1)",
                width: 1,
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(45,45,45,0)",
                },
                {
                  offset: 1,
                  color: "rgba(45,45,45,0.25)",
                },
              ]),
            },
            data: this.chartData1[2].seriersData[2].deadNum,
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
    drawChart2() {
      let myChart = echarts.init(document.getElementById("box-right-chart2"));
      let option = {
        color: [
          "#7eacea",
          "#e15777",
          "#95ea71",
          "#ea9b4f",
          "#7577df",
          "#be72d8",
          "#fff",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: this.innerBoxTop4_text,
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "radius",
            label: {
              show: true,
              formatter: "{d}%",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: this.chartData2,
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
    classify(param) {
      let name = "", //存储时的key值
        temp = [], //统计各name出现次数后暂存于该变量
        _this = this;

      this.axios.get("/api/index", { type: param }).then((res) => {
        if (res.status === 200) {
          let respon = res.data.data.row2;
          for (var i in respon) {
            switch (res.config.type) {
              case "media_type": {
                _this.elBtnText = "媒体类型";
                this.show = "media_type";
                _this.innerBoxTop4_text = "媒体类型分布";
                name = respon[i].media_type;
                if (temp[name]) {
                  temp[name]++;
                } else {
                  temp[name] = 1;
                }
                break;
              }
              case "emotional_attribute": {
                _this.elBtnText = "情感属性";
                this.show = "emotional_attribute";
                _this.innerBoxTop4_text = "情感属性分布";
                name = respon[i].emotional_attribute;
                if (temp[name]) {
                  temp[name]++;
                } else {
                  temp[name] = 1;
                }
                break;
              }
            }
          }
          _this.chartData2 = [];
          for (let i in temp) {
            _this.chartData2.push({
              name: i,
              value: temp[i],
            });
          }
          _this.drawChart2();
        }
      });
    },
  },
  mounted() {
    this.getData();
    this.classify("emotional_attribute");
    this.timer = setInterval(() => {
      this.getData();
      this.classify("emotional_attribute");
    }, 60 * 60 * 1000); //每隔一小时刷新一次
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
#pom-index {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
#pom-index-box {
  width: 46%;
  background-color: #fff;
}
.row2 {
  height: 377px;
}
.box-left {
  margin: 2% 1% 2% 3%;
}
.box-right {
  margin: 2% 3% 2% 1%;
}
#innerBox-top {
  border-top: #47a0e4 solid 5px;
  border-bottom: #e6e6e6 solid 1px;
  padding: 5px 0 5px 15px;
  line-height: 30px;
}
#box-right-chart1 {
  margin: 15px auto;
  width: 500px;
  height: 370px;
}
#box-right-chart2,
#box-right-chart2-2 {
  margin: 15px auto;
  width: 500px;
  height: 270px;
}
#box-right-chart2-2 {
  display: none;
}
.el-table >>> .cell {
  padding-left: 15px;
}
.el-table a {
  color: #606266;
  text-decoration-line: none;
}
.el-table a:hover,
.el-table a:active {
  color: #47a0e4;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>