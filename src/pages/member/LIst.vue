<template>
  <div>
    <el-table
      :data="memberList"
      row-key='id'
      style="width:100%">
      <el-table-column
        prop="uid"
        label="用户ID"
        min-width="250"
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
        align=center
        min-width="100">
        <template v-slot="props">
            {{ props.row.addtime | timefmt }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align=center>
        <template v-slot="props">
            <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
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
import { timefmt } from '@/utils/filters.js';
import vm from '@/utils/vm';

export default {
    props: ['memberList'],
    methods: {
      edit(row){
        vm.$emit('sendMemberData',{...row})
      }
    },
    filters:{
        timefmt
    }
}
</script>

<style>

</style>