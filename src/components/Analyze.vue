<template>
  <div id="pom-analyze">
    <!-- 分析条件部分 -->
    <div class="ana-condition">
      <!-- 页面导航部分 -->
      <el-row class="ana-nav">
        <ul class="ana-navBar" exact>
          <li
            v-for="(nav, index) in navData"
            :key="index"
            @click="selectNav(index)"
            :class="{ active: index == isActive }"
          >
            {{ nav }}
            <i :class="{ selectStyle: index == isActive }"></i>
          </li>
        </ul>
      </el-row>
      <!-- 页面导航end -->
      <!-- 条件搜索部分 -->
      <el-row class="ana-search">
        <!-- 时间条件 -->
        <div class="cond time-cond">
          <span>时间：</span>
          <div class="time-select">
            <el-date-picker
              v-model="selectTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-button
              type="primary"
              style="line-height: 24px; padding: 2px 15px; margin-left: 10px"
              @click="getDataByTime(selectTime)"
              >确认</el-button
            >
          </div>
        </div>
        <!-- 时间条件end -->
        <!-- 情感属性条件 -->
        <div class="cond emotion-cond">
          <span>情感：</span>
          <div class="common-select">
            <div
              v-for="(emotion, emotion_index) in emotions"
              :key="emotion_index"
              :class="{ showBorder: emotion_index == emo_show }"
              @click="getDataByEmo(emotion_index)"
            >
              {{ emotion }}
            </div>
          </div>
        </div>
        <!-- 情感属性条件end -->
      </el-row>
      <!-- 条件搜索end -->
    </div>
    <!-- 分析条件end -->

    <!-- 分析内容部分 -->
    <div class="ana-content">
      <!-- 数据内容展示部分 -->
      <el-table
        :data="tableData.slice((currentPage - 1) * size, currentPage * size)"
        border
        style="width: 100%"
        :show-header="false"
      >
        <el-table-column prop="[date,name,address,type]" label="内容">
          <template slot-scope="scope">
            <div class="content-row1">
              <!-- 内容第一行属性标签 -->
              <div
                class="content-tag"
                :filters="[
                  { text: '正面', value: '正面' },
                  { text: '中性', value: '中性' },
                  { text: '负面', value: '负面' },
                ]"
                :filter-method="filterTag"
              >
                <el-tag
                  :class="[
                    scope.row.type === '正面' ? 'positive' : '',
                    scope.row.type === '中性' ? 'neutral' : '',
                    scope.row.type === '负面' ? 'negtive' : '',
                  ]"
                  disable-transitions
                  >{{ scope.row.type }}</el-tag
                >
              </div>
              <!-- 内容第一行属性标签end -->

              <!-- 内容第一行title -->
              <div class="content-title">
                {{ scope.row.name }}
              </div>
              <!-- 内容第一行end -->
            </div>

            <!-- 内容第二行详情描述description -->
            <div class="content-desc">
              {{ scope.row.date }}&nbsp;&nbsp;{{ scope.row.address }}
            </div>
            <!-- 内容第二行end -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据内容展示end -->

      <!-- 分页part--start -->
      <div class="content-paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="size"
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
      <!-- 分页end -->
    </div>
    <!-- 分析内容end -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "pom-analyze",
  data() {
    return {
      isActive: "0",
      selectTime: [new Date("2020-01-04"), new Date("2021-02-05")],
      dateData: [],
      emo_show: "0",
      currentPage: 1,
      size: 4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          type: "正面",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          type: "负面",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          type: "正面",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          type: "中性",
        },
        {
          date: "2016-05-05",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1510 弄",
          type: "正面",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1512 弄",
          type: "中性",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          type: "负面",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1511 弄",
          type: "正面",
        },
        {
          date: "2016-05-09",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1514 弄",
          type: "正面",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      navData: (state) => state.navData,
      emotions: (state) => state.emotions,
    }),
  },
  methods: {
    selectNav(index) {
      this.isActive = index;
      switch (index) {
        case 0: {
          // 点击“信息汇总”时，才显示条件搜索部分
          document.getElementsByClassName("ana-search")[0].style.display =
            "block";
          break;
        }
        default: {
          // 其余项则不显示该部分
          document.getElementsByClassName("ana-search")[0].style.display =
            "none";
        }
      }
    },
    dateFormat(old_time) {
      //格式化日期数据
      var date = new Date(old_time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    getDataByTime(times) {
      //将el-date-picker组件选择的日期数据进行数据格式数据转换
      for (let i = 0; i < times.length; i++) {
        this.dateData.push(this.dateFormat(times[i]));
      }
    },
    getDataByEmo(emo) {
      this.emo_show = emo;
    },
    filterTag(value, row) {
      return row.type === value;
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    showPaging() {
      //判断是否显示分页模块。如果数据表长度大于分页size长度则显示；否则不显示
      let len = this.tableData.length;
      if (len > this.size) {
        document.getElementsByClassName("content-paging")[0].style.display =
          "block";
      } else {
        document.getElementsByClassName("content-paging")[0].style.display =
          "none";
      }
    },
  },
  mounted() {
    this.showPaging();
  },
};
</script>

<style scoped>
.ana-condition,
.ana-content {
  margin: 1%;
  width: 98%;
  background-color: #fff;
  color: black;
}
.ana-condition ul {
  margin: 0;
  padding: 0;
}
.ana-condition ul li {
  width: 100px;
  padding: 10px 0;
  text-align: center;
  list-style: none;
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.ana-nav {
  border-bottom: solid 1px #e0e0e0;
}
ul .active {
  color: #47a0e4;
}
.selectStyle {
  display: block;
  height: 3px;
  width: 100px;
  position: absolute;
  background-color: #47a0e4;
  bottom: -1px;
}
.ana-search {
  padding: 10px 15px;
}
.ana-search .cond {
  margin-top: 2px;
  min-height: 28px;
  max-height: 38px;
  font-size: 14px;
  color: #747474;
}
.time-select {
  display: inline-block;
}
.time-select >>> .el-date-editor {
  padding: 0;
  height: 30px;
  line-height: 30px;
}
.el-date-editor >>> .el-range__icon,
.el-date-editor >>> .el-range-separator {
  line-height: 28px;
}
.emotion-cond {
  position: relative;
}
.common-select {
  display: inline-block;
}
.common-select div {
  padding: 5px !important;
  display: inline-block;
  max-height: 40px;
  width: 40px;
  padding: 5px !important;
  text-align: center;
  cursor: pointer;
}
.showBorder {
  border: solid 1px #47a0e9;
}
.ana-content {
  font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.content-row1,
.content-desc {
  margin: 10px;
  position: relative;
}
.content-tag {
  display: inline-block;
}
.positive {
  border: solid 1px #d9ecff;
  color: #409eff;
  background-color: #ecf5ff;
}
.neutral {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.negtive {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.content-title {
  font-size: 20px;
  color: #000;
  margin-left: 10px;
  display: inline-block;
  position: absolute;
  top: 3px;
}
.content-desc {
  color: #808080;
  font-weight: lighter;
}
.content-paging {
  text-align: center;
  padding: 15px;
}
</style>