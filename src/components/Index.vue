<template>
  <div id="pom-index">
    <div id="pom-index-box" class="box-left">
      <el-row id="innerBox-top">疫情信息统计</el-row>
      <el-table :data="Epi_table" style="width: 100%">
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
        >最新舆情信息
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
      <el-table
        :data="Last_table"
        style="width: 100%"
        max-height="331px"
        border
      >
        <el-table-column prop="abstarct" label="摘要">
          <template slot-scope="last">
            <a :href="last.row.original_link">{{
              last.row.abstract.substr(0, 30) + "..."
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="ago" label="相隔时长"></el-table-column>
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
    <div id="pom-index-box" class="box-left">
      <el-row id="innerBox-top">重要舆情信息</el-row>
      <el-table
        :data="Imp_table"
        style="width: 100%"
        :show-header="false"
        border
        max-height="300px"
      >
        <el-table-column prop="abstract" label="摘要">
          <template slot-scope="important">
            <a :href="important.row.original_link">{{
              important.row.abstract.substr(0, 30) + "..."
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="media_name" label="媒体名称">
          <template slot-scope="iconType">
            <img
              v-if="iconType.row.media_type === '微信'"
              src="../assets/微信.png"
              alt="此处显示媒体类型"
            />
            <img
              v-if="iconType.row.media_type === '微博'"
              src="../assets/微博.png"
              alt="此处显示媒体类型"
            />
            <img
              v-if="iconType.row.media_type === '网页'"
              src="../assets/网页.png"
              alt="此处显示媒体类型"
            />
            <img
              v-if="iconType.row.media_type === '客户端'"
              src="../assets/客户端.png"
              alt="此处显示媒体类型"
            />
            <img
              v-if="iconType.row.media_type === '报刊'"
              src="../assets/报刊.png"
              alt="此处显示媒体类型"
            />
            <img
              v-if="iconType.row.media_type === '论坛'"
              src="../assets/论坛.png"
              alt="此处显示媒体类型"
            />
            <span>{{ iconType.row.media_name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pom-index-box" class="box-right">
      <el-row id="innerBox-top">热点词云</el-row>
      <div id="box-right-chart3"></div>
    </div>
  </div>
</template>
<script>
//引入基本模板
let echarts = require("echarts/lib/echarts");

import "echarts-wordcloud/dist/echarts-wordcloud";
//引入图形类型
require("echarts/lib/chart/pie");
require("echarts/lib/chart/line");

//引入使用组件tooltip、toolbox等
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/legend");
require("echarts/lib/component/grid");
require("echarts/lib/component/title");

export default {
  name: "index",
  data() {
    return {
      Epi_table: [], //第一行表格数据
      Epi_chart: [], //第一行图数据
      Last_table: [], //第二行表格数据
      Last_chart: [], //第二行图数据
      Imp_table: [], //第三行表格数据
      Imp_chart: [],
      elBtnText: "情感属性",
      show: "emotional_attribute", //显示哪一列，初始为情感属性
      innerBoxTop4_text: "情感属性分布",
      timer: "", //定时器，定时更新数据
    };
  },
  methods: {
    //获取第一行数据
    getEpidemicData() {
      let _this = this;
      this.axios
        .get("/api/index", {
          params: {
            type: "epidemic",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            let resp = res.data; //第一行所需数据
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
            _this.Epi_chart.push({
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
            _this.Epi_chart.push(
              {
                xAxisData: xData, //x轴数据
              },
              {
                seriersData: seriersData, //y轴数据
              }
            );
            _this.Epi_table = resp; //表格所用数据

            // //处理第二行数据
            // _this.Last_table = respo;
          }

          //画图
          _this.drawLineChart();
          // _this.drawPieChart_2();
        });
    },
    // 获取第二行数据
    classify(param) {
      let name = "", //存储时的key值
        temp = [], //统计各name出现次数后暂存于该变量
        _this = this;
      //注意axios.get携带参数时，key值必须是params，否则后端接收不到传参
      this.axios
        .get("/api/index", {
          params: {
            type: param,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            let respon = res.data;
            for (var i in respon) {
              switch (res.config.params.type) {
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
            _this.Last_table = respon;
            _this.Last_chart = [];
            for (let i in temp) {
              _this.Last_chart.push({
                name: i,
                value: temp[i],
              });
            }
            _this.drawPieChart();
          }
        });
    },
    // 获取第三行数据
    getImportantPoData() {
      let _this = this;
      this.axios
        .get("/api/index", {
          params: {
            type: "important",
          },
        })
        .then((res) => {
          console.log(res);
          let rowThree = res.data;
          //给表格赋值,传递数据
          _this.Imp_table = rowThree;

          //给词云图传递数据
          let tempArr = [];
          for (let i = 0; i < rowThree.length; i++) {
            //   // wordFrequency.push()
            let t = rowThree[i].topic_term.split(" ");
            for (let item in t) {
              t[item] = t[item].replace("（", ":");
              t[item] = t[item].replace("）", "");
            }
            for (let j in t) {
              let arr = t[j].split(":");
              tempArr.push({
                name: arr[0],
                value: Number(arr[1]),
              });
            }
          }
          // console.log(wordFrequency);
          let tempDict = {};
          for (let i in tempArr) {
            let key = tempArr[i].name;
            if (tempDict[key]) {
              tempDict[key].value += tempArr[i].value;
              tempDict[key].name = tempArr[i].name;
            } else {
              tempDict[key] = {};
              tempDict[key].name = tempArr[i].name;
              tempDict[key].value = tempArr[i].value;
            }
          }
          let wordFrequency = [];
          for (let i in tempDict) {
            wordFrequency.push({
              name: tempDict[i].name,
              value: tempDict[i].value,
            });
          }
          // console.log(wordFrequency);
          _this.Imp_chart = wordFrequency;
          _this.drawWordChart();
        });
    },
    //第一行折线图
    drawLineChart() {
      let myChart = echarts.init(document.getElementById("box-right-chart1"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.Epi_chart[0].legend, //chartData.legend
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
          data: this.Epi_chart[1].xAxisData,
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
            data: this.Epi_chart[2].seriersData[0].infectedNum,
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
            data: this.Epi_chart[2].seriersData[1].curedNum,
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
            data: this.Epi_chart[2].seriersData[2].deadNum,
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
    // 第二行饼图
    drawPieChart() {
      let myChart = echarts.init(document.getElementById("box-right-chart2"));
      let option = {
        title: {
          text: this.elBtnText,
          left: "center",
          top: "47%",
          textStyle: {
            fontSize: 14,
            color: "#000",
            fontWeight: "normal",
          },
        },
        color: [
          "#e15777", //负面
          "#7eacea", //中性
          "#95ea71", //正面
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
              formatter: "{b}:{d}%",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: this.Last_chart,
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
    // 第三行词云图
    drawWordChart() {
      let myChart = echarts.init(document.getElementById("box-right-chart3"));
      let option = {
        backgroundColor: "#fff",
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [0, 0],
            shape: "circle",
            //随机生成字体颜色
            textStyle: {
              // Color can be a callback function or a color string
              color: function () {
                var colors = [
                  "#fda67e",
                  "#81cacc",
                  "#cca8ba",
                  "#88cc81",
                  "#82a0c5",
                  "#fddb7e",
                  "#735ba1",
                  "#bda29a",
                  "#6e7074",
                  "#546570",
                  "#c4ccd3",
                ];
                return colors[parseInt(Math.random() * 10)];
              },
            },
            // maskImage: maskImage,
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            //数据
            data: this.Imp_chart,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.getEpidemicData();
    this.classify("emotional_attribute");
    this.getImportantPoData();
    this.timer = setInterval(() => {
      this.getEpidemicData();
      this.classify("emotional_attribute");
      this.getImportantPoData();
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
#box-right-chart2 {
  margin: 15px auto;
  width: 500px;
  height: 270px;
}

#box-right-chart3 {
  margin: 15px auto;
  width: 500px;
  height: 270px;
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
.el-table img {
  height: 20px;
  width: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
.el-table span {
  position: absolute;
  top: 24px;
  padding: 1px 0;
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