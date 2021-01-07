// 使用vue-echarts辅助工具

<template>
  <v-chart :options="lineOptions" style="width:100%" />
</template>

<script>
// 导入echarts: 新版必须使用按需导入, 否则图表不显示
import "echarts/lib/chart/line"; // 折线图需要的绘制工具
import "echarts/lib/chart/bar"; // 柱状图需要的绘制工具
import "echarts/lib/chart/pie"; // 饼状图需要的绘制工具

// 辅助绘制工具
import 'echarts/lib/component/title';   // 绘制标题
import 'echarts/lib/component/tooltip'; // 绘制鼠标悬浮提示框


// 导入vue-echarts
import vChart from "vue-echarts";
import Vue from "vue";
Vue.component("v-chart", vChart);
export default {
  data() {
    return {
      // 折线图的配置对象
      lineOptions: {
        // 标题
        title:{
          text:'折线图'
        },
        // 鼠标悬浮的提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>