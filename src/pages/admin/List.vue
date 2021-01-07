<template>
  <div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"></el-table-column>
      <el-table-column prop="rolename" label="角色" min-width="180"></el-table-column>
      <el-table-column prop="username" label="账号" min-width="180"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
         <template v-slot="props">
           <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
           <el-tag type="danger" v-else>禁用</el-tag>
         </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template v-slot="props">
          <el-button @click="edit(props.row)" size="mini" circle type="success" icon="el-icon-edit"></el-button>
          <el-button @click="del(props.row.uid)" size="mini" circle type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- el-pagination 分页组件
      
      total:数据总条数
      page-size: 每页显示的数据条数
      current-change: 分页按钮点击事件
    -->
    <el-pagination @current-change="pageUpdate" :page-size="size" background layout="prev, pager, next" :total="adminTotal"></el-pagination>
  </div>
</template>

<script>
import vm from '@/utils/vm';
export default {
  props:['adminTotal','adminList','size','page'],
  methods:{
    //  分页按钮被点击的处理函数
    // page: 分页按钮的页码, 系统自动注入
    pageUpdate(page){
      // 通过this.$emit()将最新页码值传递给父组件Index
      this.$emit('updatePage',page);
    },
    // 编辑功能
    edit(row){
      vm.$emit('sendAdminData',{...row});
    },

    // 删除功能(注意属性为uid)
    del(uid){
      this.$delConfirm(()=>{
        this.$http.post('/userdelete',{uid}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 当前处于最后一页&&最后一页只有一条数据
            if(Math.ceil(this.adminTotal/this.size)===this.page && (this.adminTotal%this.size === 1 || this.size ===1 )){
                // 请求上一页数据
              this.$emit('updatePage',this.page-1);
            }else{
              // 更新数据列表
              this.$emit('updateList'); 
            }

            

          }else{
            this.$error(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style>
</style>