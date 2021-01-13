<template>
    <el-card>
      <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-divider/>
      <!-- 调用子组件List -->
      <List @updateList="updateList" @sendData="sendData" @updatePage="updatePage" :specsList="specsList" :specsTotal="specsTotal" :size="size" :page="page" />
      <!-- 调用子组件Modal -->
      <Modal @updateList="updateList" :info="info"/>
  </el-card>
</template>

<script>

  // 导入vuex辅助方法
import { mapState,mapActions } from 'vuex';

// 导入子组件List
import List from './List';
import Modal from './Modal';
export default {
  components:{ List, Modal },
  data(){
    return {
      info:{
        // 控制对话框组件的显示状态
        isShow:false
      },
      page:1,   // 页码
      size:3   // 每页显示数据条数
    }
  },
  created(){
    // 请求数据列表
    this.getSpecsListAction({page:this.page,size:this.size});
    this.getSpecsTotalAction();
  },
  computed:{
    ...mapState({
      specsList:state=>state.specs.specsList,
      specsTotal:state=>state.specs.specsTotal
    })
  },
  methods:{
    ...mapActions('specs',['getSpecsListAction','getSpecsTotalAction']),
    // 自定义事件sendData处理方法
    sendData(page){
      // 更新page
      this.page=page;
      // 更新数据列表
      this.getSpecsListAction({page:this.page,size:this.size});
    },
    // 自定义事件updateList的处理函数
    updateList(){
      this.getSpecsListAction({page:this.page,size:this.size});
      this.getSpecsTotalAction();
    },
    // 自定义事件updatePage处理函数
    updatePage(page) {
      this.page = page;
      console.log(page);
      this.getSpecsListAction({page:this.page,size:this.size});
      this.getSpecsTotalAction();
    }
  }
}
</script>

<style>

</style>