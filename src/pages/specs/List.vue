<template>
  <div>
    <el-table :data="specsList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" min-width="180"></el-table-column>
      <el-table-column prop="attrs" min-width="180" label="规格可选值">
        <template v-slot="props">
          <el-tag type="success" v-for="(item,index) in props.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" min-width="180" label="状态">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="操作">
        <template v-slot="props">
          <el-button @click="edit(props.row)" type="success" size="mini" circle icon="el-icon-edit"></el-button>
          <el-button @click="del(props.row.id)" type="danger" size="mini" circle icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pageChange" :page-size="size" background layout="prev, pager, next" :total="specsTotal"></el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm';
export default {
  props: ["specsList",'specsTotal','size','page'],
  methods:{
    // 监听分页按钮的点击, page为页码
    pageChange(page){
      // 通过this.$emit()将page传递给父组件Index
      this.$emit('sendData',page);
    },
    // 编辑
    edit(row){
      // 1-将待编辑的数据传递给兄弟组件Modal
      vm.$emit('sendSpecsData',{...row});
    },
    del(id){
      this.$delConfirm(()=>{
        this.$http.post('/specsdelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 当前处于最后一页&&最后一页只有一条数据
            if(Math.ceil(this.specsTotal/this.size)===this.page && (this.specsTotal%this.size === 1 || this.size === 1 )){
                // 请求上一页数据
              this.$emit('updatePage',this.page-1);
            }else{
              // 更新数据列表
            this.$emit('updateList');
            }
          }else{
            this.$error(res.msg);
          }
        })
      });
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin: 0 5px;
}
</style>