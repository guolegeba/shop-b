<template>
  <div>
    <el-table
      :data="memberList"
      row-key='id'
      style="width:100%">
      <el-table-column
        prop="uid"
        label="用户ID"
        min-width="180"
        align=center>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align=center>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align=center>
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="注册日期"
        align=center>
        <template v-slot="props">
            {{ props.row.addtime | timefmt }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align=center>
        <template v-slot="props">
            {{ props.row.status }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align=center>
        <template v-slot="props">
            <el-button @click="edit(props.row)" size="mini" circle  type="success" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { disableTransformOptionMerge } from 'echarts/lib/data/helper/sourceManager';
export default {
    props: ['memberList'],
    methods: {
      edit(row){
        console.log(row);
      }
    },
    filters:{
        timefmt(timer) {
            const time = new Date(Number(timer));
            const y = time.getFullYear();
            const m = time.getMonth() + 1;
            const d = time.getDate();
            const h = time.getHours();
            const mm = time.getMinutes();
            const s = time.getSeconds();
            return `${y}-${m}-${d} ${h}:${mm}:${s}`;
        }
    }
}
</script>

<style>

</style>