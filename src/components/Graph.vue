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
      <el-col :span="18"><div class="grid-content bg-right"></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "graph",
  data() {
    return {
      isActive: "",
    };
  },
  methods: {
    searchNode(param) {
      let _this = this;
      _this.isActive = param;
      switch (param) {
        case "time": {
          break;
        }
        case "loc": {
          break;
        }
        case "emotion": {
          break;
        }
        case "media": {
          break;
        }
      }
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