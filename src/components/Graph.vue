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

export default {
  name: "graph",
  data() {
    return {
      isActive: "",
      nodes: [],
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
  },
  mounted() {
    this.searchNode("time");
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