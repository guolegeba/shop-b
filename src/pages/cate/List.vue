<template>
  <el-table
    :data="cateList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="id" min-width="80"></el-table-column>
    <el-table-column prop="img" label="分类图片" min-width="180">
        <template v-slot="props">
            <img v-if="props.row.img!==''" style="height:80px" :src="$imgBaseUrl+props.row.img" alt="">
        </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" min-width="180"></el-table-column>
    <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
            <el-tag type='success' v-if="props.row.status===1">正常</el-tag>
            <el-tag type='danger' v-else>禁用</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
        <template v-slot="props">
            <el-button  @click="edit(props.row)" size="mini" circle  type="success" icon="el-icon-edit"></el-button>
            <el-button @click="del(props.row.id)" size="mini" circle  type="danger" icon="el-icon-delete"></el-button>
        </template>
    </el-table-column>

  </el-table>
</template>

<script>
import vm from '@/utils/vm';
export default {
    props: ['cateList'],
    methods: {
      edit(row){
        vm.$emit('sendCateData',{...row});
      },

      del(id){
        this.$delConfirm(()=>{
          this.$http.post('/catedelete',{id}).then(res=>{
            if(res.code===200){
              this.$success(res.msg);
              // 更新数据列表
              this.$emit('updateList');
            }else{
              this.$error(res.msg);
            }
          })
        })
      }
    }
}
</script>

<style>

</style>