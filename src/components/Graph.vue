<template>
  <div id="graph">
    <el-row style="height: 540px" type="flex" id="pom-graph">
      <el-col :span="6" class="grid-content bg-left">
        <div class="pom-graph-title">
          实体
          <p class="split-line"></p>
        </div>
        <div class="flexbox" style="height: 40%">
          <div
            class="pom-graph-box"
            @click="searchNode('time')"
            :class="{ activeClass: 'time' === isActive }"
          >
            <span>时间</span>
          </div>
          <div
            class="pom-graph-box"
            @click="searchNode('loc')"
            :class="{ activeClass: 'loc' === isActive }"
          >
            <span>地点</span>
          </div>
          <div
            class="pom-graph-box"
            @click="searchNode('emotion')"
            :class="{ activeClass: 'emotion' === isActive }"
          >
            <span>情感属性</span>
          </div>
          <div
            class="pom-graph-box"
            @click="searchNode('media')"
            :class="{ activeClass: 'media' === isActive }"
          >
            <span>媒体类型</span>
          </div>
        </div>
        <div class="pom-graph-title">
          实体关系
          <p class="split-line"></p>
        </div>
        <div class="flexbox" style="height: 50%">
          <div
            class="pom-graph-box"
            @click="searchLink('hir')"
            :class="{ activeClass: 'hir' === isActive }"
          >
            <span>层次</span>
          </div>
          <div
            class="pom-graph-box"
            @click="searchLink('non-hir')"
            :class="{ activeClass: 'non-hir' === isActive }"
          >
            <span>非层次</span>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="grid-content bg-right"
        ><div
          class="graph-fig"
          style="width: 98%; height: 97%; background-color: #fff; margin: 1%"
        ></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
//引入基本模板
let echarts = require("echarts/lib/echarts");

//引入图形类型
require("echarts/lib/chart/graph");

//引入使用组件tooltip、toolbox等
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/legend");

export default {
  name: "graph",
  data() {
    return {
      isActive: "",
      nodes: [],
      entityRelation: [
        { r: { name: "推荐食谱" }, m: { name: "绿豆薏米饭" } },
        { r: { name: "推荐食谱" }, m: { name: "姜丝萝卜汤" } },
        { r: { name: "推荐食谱" }, m: { name: "葱蒜粥" } },
        { r: { name: "推荐食谱" }, m: { name: "薏米莲子粥" } },
        { r: { name: "推荐食谱" }, m: { name: "赤小豆粥" } },
        { r: { name: "推荐食谱" }, m: { name: "香椿芽粥" } },
        { r: { name: "推荐食谱" }, m: { name: "凉拌香椿" } },
        { r: { name: "推荐食谱" }, m: { name: "醋熘土豆丝" } },
        { r: { name: "忌吃" }, m: { name: "猪油（板油）" } },
        { r: { name: "忌吃" }, m: { name: "咸鱼" } },
        { r: { name: "忌吃" }, m: { name: "白扁豆" } },
        { r: { name: "忌吃" }, m: { name: "油条" } },
        { r: { name: "宜吃" }, m: { name: "芝麻" } },
        { r: { name: "宜吃" }, m: { name: "鸡蛋" } },
        { r: { name: "宜吃" }, m: { name: "南瓜子仁" } },
        { r: { name: "宜吃" }, m: { name: "鹌鹑蛋" } },
        { r: { name: "所属科室" }, m: { name: "呼吸内科" } },
        { r: { name: "常用药品" }, m: { name: "感冒灵颗粒" } },
        { r: { name: "常用药品" }, m: { name: "利巴韦林颗粒" } },
        { r: { name: "好评药品" }, m: { name: "伤风停胶囊" } },
        { r: { name: "好评药品" }, m: { name: "感冒灵颗粒" } },
        { r: { name: "好评药品" }, m: { name: "喉痛灵片" } },
        { r: { name: "好评药品" }, m: { name: "阿莫西林颗粒" } },
        { r: { name: "好评药品" }, m: { name: "洛索洛芬钠胶囊" } },
        { r: { name: "好评药品" }, m: { name: "酚咖片" } },
        { r: { name: "好评药品" }, m: { name: "洛索洛芬钠片" } },
        { r: { name: "好评药品" }, m: { name: "风油精" } },
        { r: { name: "好评药品" }, m: { name: "匹多莫德分散片" } },
        { r: { name: "好评药品" }, m: { name: "依托红霉素片" } },
        { r: { name: "好评药品" }, m: { name: "穿心莲片" } },
        { r: { name: "好评药品" }, m: { name: "头孢丙烯分散片" } },
        { r: { name: "好评药品" }, m: { name: "麻黄止嗽丸" } },
        { r: { name: "好评药品" }, m: { name: "肺宁片" } },
        { r: { name: "好评药品" }, m: { name: "抗病毒口服液" } },
        { r: { name: "好评药品" }, m: { name: "消炎片" } },
        { r: { name: "好评药品" }, m: { name: "头孢拉定胶囊" } },
        { r: { name: "好评药品" }, m: { name: "蒲公英颗粒" } },
        { r: { name: "好评药品" }, m: { name: "银芩胶囊" } },
        { r: { name: "好评药品" }, m: { name: "愈美胶囊" } },
        { r: { name: "诊断检查" }, m: { name: "白细胞计数（WBC）" } },
        { r: { name: "诊断检查" }, m: { name: "血常规" } },
        { r: { name: "诊断检查" }, m: { name: "肺和胸膜听诊" } },
        { r: { name: "诊断检查" }, m: { name: "尿常规" } },
        { r: { name: "诊断检查" }, m: { name: "内科检查" } },
        { r: { name: "症状" }, m: { name: "鼻塞" } },
        { r: { name: "症状" }, m: { name: "头痛" } },
        { r: { name: "症状" }, m: { name: "浑身忽冷忽热" } },
        { r: { name: "症状" }, m: { name: "情绪性感冒" } },
        { r: { name: "症状" }, m: { name: "咽喉干燥及灼热感" } },
        { r: { name: "症状" }, m: { name: "发烧" } },
        { r: { name: "症状" }, m: { name: "发热伴寒战" } },
        { r: { name: "症状" }, m: { name: "咽痛" } },
        { r: { name: "症状" }, m: { name: "流鼻涕" } },
      ],
      key_word: "感冒",
    };
  },
  methods: {
    searchNode(param) {
      let _this = this;
      _this.isActive = param;
      this.axios
        .get("/api/graph/nodeLabels", {
          searchNode: param,
        })
        .then((res) => {
          if (res.status === 200) {
            //请求成功
            switch (res.config.searchNode) {
              case "time": {
                _this.nodes = [];
                _this.nodes.push({
                  时间: res.data.data["time"],
                });
                break;
              }
              case "loc": {
                _this.nodes = [];
                _this.nodes.push({
                  地点: res.data.data["loc"],
                });
                break;
              }
              case "emotion": {
                _this.nodes = [];
                _this.nodes.push({
                  情感属性: res.data.data["emotion"],
                });
                break;
              }
              case "media": {
                _this.nodes = [];
                _this.nodes.push({
                  媒体类型: res.data.data["media"],
                });
                break;
              }
              default: {
                _this.nodes = "";
              }
            }
            _this.drawNodes();
          }
        });
    },
    searchLink(param) {
      let _this = this;
      _this.isActive = param;
      switch (param) {
        case "hir": {
          break;
        }
        case "non-hir": {
          break;
        }
      }
    },
    drawNodes() {
      let myChart = echarts.init(
        document.getElementsByClassName("graph-fig")[0]
      );
      let option = {
        tooltip: {
          show: true,
        },
        toolbox: {
          show: true,
          showTitle: false, // 隐藏默认文字，否则两者位置会重叠
          feature: {
            saveAsImage: {
              show: true,
              title: "Save As Image",
            },
            restore: {
              show: true,
            },
          },
        },
        series: [
          {
            name: Object.keys(this.nodes[0])[0],
            type: "graph",
            legendHoverLink: true,
            layout: "force",
            data: Object.values(this.nodes[0])[0], //取出value值
            roam: true,
            draggable: true,
            force: {
              repulsion: 200,
              edgeLength: [50, 250],
              gravity: 0.05,
            },
            symbolSize: 75, //节点大小设置,
            itemStyle: {
              color: function (params) {
                //节点颜色设置
                switch (params.seriesName) {
                  case "时间":
                    return "indianred";
                  case "地点":
                    return "#EE451F";
                  case "情感属性":
                    return "#368cbf";
                  case "媒体类型":
                    return "#63b931";
                }
              },
            },
            emphasis: { focus: "adjacency" }, //鼠标移到节点上时突出显示结点以及邻节点和边
            label: {
              //节点上的数据
              show: true, //是否显示标签
              color: "#fff",
              formatter: function (params) {
                return params.data;
              },
            },
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
    drawGraph() {
      let myChart = echarts.init(
        document.getElementsByClassName("graph-fig")[0]
      );
      let option = {
        tooltip: {
          show: true,
          // formatter: "{a}<br/> {b}",
          formatter: function (params) {
            var htmlStr = "";
            if (params.dataType === "node") {
              htmlStr =
                "<div><p>" +
                params.seriesName +
                "<br/>" +
                params.marker +
                "  " +
                params.data.name +
                "</p>" +
                "</div>";
            } else if (params.dataType === "edge") {
              htmlStr =
                "<div><p>" +
                "<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" +
                params.borderColor +
                ";'></span>" +
                "  " +
                params.data.value +
                "</p>" +
                "</div>";
            }
            return htmlStr;
          },
        },
        toolbox: {
          show: true,
          showTitle: false, // 隐藏默认文字，否则两者位置会重叠
          feature: {
            saveAsImage: {
              show: true,
              title: "Save As Image",
            },
            restore: {
              show: true,
            },
          },
        },
        series: [
          {
            name: "实体",
            type: "graph",
            legendHoverLink: true,
            layout: "force",
            roam: true,
            draggable: true,
            force: {
              repulsion: 200,
              edgeLength: [50, 250],
              gravity: 0.05,
            },
            symbolSize: 75, //节点大小设置,
            itemStyle: {
              color: function (params) {
                //节点颜色设置
                switch (params.data.category) {
                  case 0:
                    return "#FF0000";
                  case 1:
                    return "#4592FF";
                  case 2:
                    return "#FFFF00";
                  case 3:
                    return "#66CD00";
                  case 4:
                    return "#B8860B";
                  case 5:
                    return "#B23AEE";
                  case 6:
                    return "#FFB90F";
                  case 7:
                    return "#7FFF00";
                  case 8:
                    return "#F08080";
                  case 9:
                    return "#87CEFA";
                  case 10:
                    return "#FFFF00";
                }
              },
            },
            edgeLabel: {
              show: true,

              fontSize: 10,
              formatter: "{c}", // 标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
            },
            emphasis: { focus: "adjacency" }, //鼠标移到节点上时突出显示结点以及邻节点和边
            label: {
              //节点上的数据
              show: true, //是否显示标签
              color: "#000",
              formatter: function (params) {
                return params.data.name;
              },
            },
            lineStyle: {
              opacity: 0.5,
              width: 1.0,
              curveness: 0,
              color: "target",
            },
            data: [
              { name: "感冒", category: 0, id: "0" },
              {
                name: "绿豆薏米饭",
                category: 7,
                id: "1",
              },
              {
                name: "姜丝萝卜汤",
                category: 4,
                id: "2",
              },
              {
                name: "葱蒜粥",
                category: 7,
                id: "3",
              },
              {
                name: "薏米莲子粥",
                category: 7,
                id: "4",
              },
              { name: "发烧", category: 0, id: "5" },
              {
                name: "香椿芽粥",
                category: 7,
                id: "6",
              },
              {
                name: "凉拌香椿",
                category: 6,
                id: "7",
              },
              {
                name: "醋熘土豆丝",
                category: 7,
                id: "8",
              },
              {
                name: "猪油（板油）",
                category: 5,
                id: "9",
              },
              {
                name: "爆炒牛肚",
                category: 8,
                id: "10",
              },
            ],
            links: [
              { source: "0", target: "1", category: 0, value: "推荐食谱" },
              { source: "0", target: "2", category: 0, value: "推荐食谱" },
              { source: "0", target: "3", category: 0, value: "推荐食谱" },
              { source: "0", target: "4", category: 0, value: "推荐食谱" },
              { source: "5", target: "6", category: 0, value: "忌吃" },
              { source: "5", target: "7", category: 0, value: "忌吃" },
              { source: "5", target: "8", category: 0, value: "忌吃" },
              { source: "5", target: "9", category: 0, value: "忌吃" },
              { source: "7", target: "10", category: 0, value: "杜绝" },
            ],
          },
        ],
      };
      const defaultCategory = 0;
      const currentGraph = {
        nodes: {},
        links: {},
      };
      const nodeMap = {};

      init(); //默认时初始化图表
      function init() {
        let nodesOption = option.series[0].data,
          linksOption = option.series[0].links;
        // 根据定义的常量，产生currentGraph的默认数据
        // 遍历全部nodes和links，产生node映射map
        for (let i = 0; i < nodesOption.length; i++) {
          if (nodesOption[i].category === defaultCategory) {
            currentGraph.nodes[nodesOption[i].id] = nodesOption[i]; //默认显示的节点数据
          }
          nodeMap[nodesOption[i].id] = nodesOption[i];
          nodeMap[nodesOption[i].id]["links"] = {};
          nodeMap[nodesOption[i].id]["nodes"] = {};
          nodeMap[nodesOption[i].id]["hasAppend"] = false;
        }

        for (let i = 0; i < linksOption.length; i++) {
          let link = linksOption[i];
          if (
            nodeMap[link.source] !== undefined &&
            nodeMap[link.target] !== undefined
          ) {
            nodeMap[link.source].links[link.target] = link;
            nodeMap[link.source].nodes[nodeMap[link.target].id] =
              nodeMap[link.target];
          }
        }
        redrawGraph();
      }
      function redrawGraph() {
        option.series[0].data = Object.values(currentGraph.nodes);
        option.series[0].links = Object.values(currentGraph.links);
        myChart.setOption(option);
      }

      // 处理点击节点展开
      function append(nodeId) {
        // 根据nodeId从nodeMap里拿出对应的nodes和links，并append到currentGraph.nodes currentGraph.links
        let node = nodeMap[nodeId];

        if (
          node.hasAppend === true ||
          Object.keys(node.nodes).length === 0 ||
          Object.keys(node.links).length === 0
        ) {
          alert("无法继续展开");
          return;
        }
        Object.values(node.nodes).forEach((n) => {
          currentGraph.nodes[n.name] = n;
        });
        Object.values(node.links).forEach((l) => {
          currentGraph.links[l.source + "_" + l.target] = l;
        });
        node.hasAppend = true;
        redrawGraph();
      }
      // 处理点击节点收缩
      function remove(nodeId) {
        //根据nodeId从nodeMap里拿出对应的nodes和links，从currentGraph.nodes currentGraph.links删除当前节点的nodes和links并且递归
        let node = nodeMap[nodeId];
        Object.values(node.nodes).forEach((n) => {
          delete currentGraph.nodes[n.name];
          if (n.hasAppend === true && Object.keys(n.nodes).length > 0) {
            remove(n.name);
          }
        });
        Object.values(node.links).forEach((l) => {
          delete currentGraph.links[l.source + "_" + l.target];
        });
        // 设置flag 等于false
        node.hasAppend = false;

        redrawGraph();
      }
      myChart.on("click", function (params) {
        if (params.dataType === "node") {
          const node = nodeMap[params.data.id];
          if (node.hasAppend === true) {
            remove(node.id);
          } else {
            append(node.id);
          }
        }
      });
    },
  },
  mounted() {
    this.drawGraph();
  },
};
</script>
<style scoped>
.el-row {
  overflow: hidden;
}
.el-col {
  height: 100%;
}
.bg-left {
  background: #243743;
}
.bg-right {
  background: #dadcdb;
}
.grid-content {
  min-height: 36px;
  height: 100%;
}
.pom-graph-title {
  padding: 1% 0 0 5%;
  height: 5%;
  color: #fafafa;
}
.flexbox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
}
.pom-graph-box {
  background-color: #8a949b;
  width: 31%;
  height: 20%;
  border-radius: 30%;
  position: relative;
}
.pom-graph-box:hover,
.activeClass {
  background-color: #fafafa;
}
.pom-graph-box:first-child,
.pom-graph-box:last-child {
  margin: 5% 1% 5% 2%;
}
.pom-graph-box:nth-child(2),
.pom-graph-box:nth-child(3) {
  margin: 5% 1% 5% 1%;
}
.pom-graph-box span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 800;
}
.split-line {
  height: 1px;
  background-color: #fff;
  width: 90%;
  padding-left: 5%;
  margin: 2% 0 0 0;
}
</style>