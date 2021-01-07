<template>
  <div id="container"></div>
</template>

<script>
// 1-导入echarts
import * as echarts from 'echarts';
export default {

    // 要操作DOM,所以使用mounted挂载完毕的生命周期钩子
    mounted() {
        // 1-获取容器对应的DOM对象
        const dom = document.getElementById("container");
        // 2-初始化
        const instance = echarts.init(dom);
        // 3-配置对象
        instance.setOption(this.barTOptions);
    },
    data() {
        return {
            barTOptions: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 1)'
                    }
                }],

                //   图表标题
                title: {
                    text: "柱状图"
                },
                
                // 鼠标悬浮的提示
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                }

            },
            
        }
    }
}
</script>

<style scoped>
#container {
    height: 500px;
    background: #eee;
}
</style>