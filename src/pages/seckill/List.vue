<template>
<div>
    <h1>{{seckillList}}</h1>
    <el-table :data="seckillList" row-key='id' style="width:100%">
      <el-table-column prop="title" label="活动名称" align=center></el-table-column>
      <el-table-column prop="begintime" label="开始时间" align=center>
        <template v-slot="props">
            {{props.row.begintime | timefmt}}
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束时间" align=center>
        <template v-slot="props">
            {{props.row.endtime | timefmt}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align=center>
        <template v-slot="props">
            <el-tag type="success" v-if="props.row.status===1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align=center>
        <template v-slot="props">
            <el-button @click="edit(props.row)" size="mini" circle  type="success" icon="el-icon-edit"></el-button>
            <el-button @click="del(props.row)" size="mini" circle  type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import vm from '@/utils/vm';
import { timefmt } from '@/utils/filters.js';
export default {
    props:['seckillList'],
    methods:{
      edit(row){
        vm.$emit('sendSeckillData',{...row})
      },
      del(row){
        console.log(row);
      }
    },
    filters:{
        timefmt
    }

}
</script>

<style>

</style>