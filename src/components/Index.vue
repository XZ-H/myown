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
        >舆情信息
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
        :data="tableData2"
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
      <el-row id="innerBox-top">重要舆情</el-row>
      <el-table
        :data="tableData3"
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
      tableData1: [], //第一行表格数据
      chartData1: [], //第一行图数据
      tableData2: [], //第二行表格数据
      chartData2: [], //第二行图数据
      tableData3: [
        {
          media_type: "客户端",
          media_name: "史回乡站",
          abstract:
            "13日晚，黑龙江省召开疫情防控新闻发布会，对疫情防控相关情况进行通报。黑龙江省卫健委副主任方庆伟在发布会上通报，1月13日0时至19时，黑龙江全省新增新冠肺炎确诊病例40例，其中绥化市望奎县36例，哈尔滨市香坊区2例，绥化市北临区2例无症状感染者订正为确诊病例。",
          original_link:
            "https://tznew.58.com/view/c/sharingDetailNew?infoid=177586871",
        },
        {
          media_type: "网页",
          media_name: "四川在线",
          abstract:
            "封面新闻记者 谢颖1月13日晚，巴中市巴州区应对新冠肺炎应急指挥部办公室发布最新公告。经多方努力，与该区新冠肺炎密切接触者裴某某的乘坐同一非营运车辆的司乘人员及火车同乘人员已全部找到，且隔离管控到位。",
          original_link:
            "https://sichuan.scol.com.cn/sczh/202101/58019797.html",
        },
        {
          media_type: "微博",
          media_name: "彩芸之南",
          abstract:
            "封面新闻记者 #日本将全面禁止外国人入境#紧急状态扩大至11个都府县】日本首相菅义伟13日晚在记者会上宣布，鉴于多国确认变异的新冠肺炎病毒，日本政府决定到2月7日为止，暂停中韩等11个国家和地区的商务人员往来。针对英国等国确认的变异病毒，日本政府上个月采取了暂停了多个国家和地区的新的外国人入境的措施",
          original_link:
            "http://weibo.com/2715239797/JD5As2HnE?refer_flag=1001030103_",
        },
        {
          media_type: "微信",
          media_name: "新津三农",
          abstract:
            "致全区广大农民群众的一封信广大农民朋友们：春节将至，新冠肺炎疫情防控形势依然严峻，为了您和家人的健康平安，为了社会的和谐稳定，为了巩固来之不易的防疫成果，我们发出如下倡议：1非必要，不返乡请广大农民群众服从大局，建议您的家人留在务工地过年，既减轻疫情防控压力，又减少来回奔波劳累。确需返乡的，建议错峰出行，选择自驾或者乘坐集中组织的专列、专车出行。",
          original_link:
            "http://mp.weixin.qq.com/s?__biz=MzI0MzE3MTA1MA==&mid=2654312827&idx=2&sn=1d8fb02d4ac3d9757c1d35fa03870907&scene=0",
        },
      ], //第三行表格数据
      chartData3: [
        {
          name: "十九大精神",
          value: 15000,
        },
        {
          name: "两学一做",
          value: 10081,
        },
        {
          name: "中华民族",
          value: 9386,
        },
        {
          name: "马克思主义",
          value: 7500,
        },
        {
          name: "民族复兴",
          value: 7500,
        },
        {
          name: "社会主义制度",
          value: 6500,
        },
        {
          name: "国防白皮书",
          value: 6500,
        },
        {
          name: "创新",
          value: 6000,
        },
        {
          name: "民主革命",
          value: 4500,
        },
        {
          name: "文化强国",
          value: 3800,
        },
        {
          name: "国家主权",
          value: 3000,
        },
        {
          name: "伟大复兴",
          value: 2500,
        },
        {
          name: "领土完整",
          value: 2300,
        },
        {
          name: "安全",
          value: 2000,
        },
        {
          name: "从严治党",
          value: 1900,
        },
        {
          name: "现代化经济体系",
          value: 1800,
        },
        {
          name: "国防动员",
          value: 1700,
        },
        {
          name: "信息化战争",
          value: 1600,
        },
        {
          name: "局部战争",
          value: 1500,
        },
        {
          name: "教育",
          value: 1200,
        },
        {
          name: "中国梦",
          value: 1100,
        },
        {
          name: "孙子兵法",
          value: 900,
        },
        {
          name: "一国两制",
          value: 800,
        },
        {
          name: "特色社会主义思想",
          value: 700,
        },
      ],
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
    drawChart3() {
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
            data: this.chartData3,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.getData();
    this.drawChart3();
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