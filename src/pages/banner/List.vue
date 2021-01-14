<template>
  <div>
      <el-table
      :data="bannerList"
      row-key='id'
      style="width:100%">
      <el-table-column
        prop="title"
        label="轮播图名称"
        align=center>
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片"
        align=center>
        <template v-slot="props">
            <img style="width:100px" :src="$imgBaseUrl+props.row.img" alt="">
        </template>
      </el-table-column>   
      <el-table-column
        prop="status"
        label="状态"
        align=center>
        <template v-slot="props">
            <el-tag type="success" v-if="props.row.status===1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align=center>
        <template v-slot="props">
            <el-button @click="edit(props.row)" size="mini" circle  type="success" icon="el-icon-edit"></el-button>
            <el-button @click="del(props.row.id)" size="mini" circle  type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vm from '@/utils/vm';
export default {
  props:['bannerList'],
  methods:{
    edit(row){
      vm.$emit('sendBannerData',{...row});
    },
    del(id){
      this.$delConfirm(()=>{
        // 发请求, 删除数据
        this.$http.post('/bannerdelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 更新数据列表
            this.$emit('updateList');
          }else{
            this.$error(res.msg);
          }
        })
      });
    }
  }
}
</script>

<style>

</style>