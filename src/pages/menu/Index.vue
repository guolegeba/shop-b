<template>
  <el-card>
    <el-button @click="showModal" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
    <el-divider />
    <!-- tree-props: 指定二级菜单数据存储的属性节点名称 -->
     <el-table
    :data="menuList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="图标">
      <!-- 接收组件内部分发出来的数据 -->
      <template v-slot="props">
          <i :class="props.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label=" 状态">
       <template v-slot="props">
          <el-tag v-if="props.row.status===1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="地址">
    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot="props">
        <el-button @click="edit(props.row)" circle size="mini" icon="el-icon-edit" type="success"></el-button>
        <el-button @click="del(props.row.id)" circle size="mini" icon="el-icon-delete" type="danger"></el-button>
      </template>       
    </el-table-column>
  </el-table>

    <!-- 调用对话框组件  -->
    <Modal ref="modalRef" :info="info" @updateList="updateList"/>
  </el-card>
</template>

<script>
import Modal from './Modal';
import { mapState,mapActions } from 'vuex';
export default {
  components:{
    Modal
  },
  created(){
    this.getMenuListAction();
  },  
  computed:{
    ...mapState({menuList:state=>state.menu.menuList})
  },
  methods:{
    ...mapActions('menu',['getMenuListAction']),
    showModal(){
       this.info.isShow = true; 
    },
    // 自定义事件updateList的处理函数
    updateList(){
        this.getMenuListAction();
    },
    edit(row) {
      // console.log(row);
      // 更新info
      this.info.isShow = true;
      // 通过ref属性操作组件Modal
      this.$refs.modalRef.setFormData(row);
    },
    del(id){
      this.$delConfirm(()=>{
        // 发请求删除据
        this.$http.post('/menudelete',{id}).then(res=>{
           if(res.code===200){
             this.$success(res.msg);
             // 更新数据列表
             this.getMenuListAction();
           } else{
              this.$error(res.msg);
           }
        })
      });
    }
  },
  data(){
    return {
      info:{
        isShow:false
      }
    }
  }
}
</script>

<style>

</style>