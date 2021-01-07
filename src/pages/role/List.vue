<template>
  <el-table :data="roleList" style="width: 100%">
    <el-table-column prop="id" label="id" min-width="80"></el-table-column>
    <el-table-column prop="rolename" label="角色名称" min-width="180"></el-table-column>
    <el-table-column prop="status" label="状态" min-width="180">
      <template v-slot="props">
        <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
      <template v-slot="props">
        <el-button @click="edit(props.row)" size="mini" circle icon="el-icon-edit" type="success"></el-button>
        <el-button
          @click="del(props.row.id)"
          size="mini"
          circle
          icon="el-icon-delete"
          type="danger"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 导入事件中心
import vm from "@/utils/vm";
export default {
  props: ["roleList"],
  methods: {
    del(id) {
      this.$delConfirm(()=>{
        // 1-发送数据请求
        this.$http.post('/roledelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
             // 2-更新数据列表
             this.$emit('updateList');
          }else{
            this.$error(res.msg);
          }
        })
       
      })
    },
    // 角色编辑
    edit(obj) {
      // 通过vm.$emit()将待编辑的数据对象传递给Modal
      vm.$emit("sendRoleData", { ...obj });
    }
  }
};
</script>

<style>
</style>