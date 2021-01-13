<template>
    <el-card>
        <h2>Stylus</h2>
        <StylusT />
        <el-divider/>
        <h2>数据可视化</h2>
        <br>
        <Wangedit/>
        <el-divider/>
        <BarT />
        <el-divider/>
        <LineT/>
        <el-divider/>
        <PieT/>
    </el-card>
</template>

<script>
import BarT from './echarts/BarT';
import LineT from './echarts/LineT';
import Wangedit from './echarts/Wangedit';
import StylusT from './echarts/StylusT';
import PieT from './echarts/PieT';

export default {
    components: {
        BarT,
        LineT,
        Wangedit,
        StylusT,
        PieT
    }

}
</script>

<style scoped>
h2 {
    text-align: center;
}

</style>