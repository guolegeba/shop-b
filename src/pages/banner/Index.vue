<template>
  <el-card>
    <el-button @click="info.isShow=true" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
    <el-divider/>
    <List :bannerList='bannerList'  @updateList='updateList'/>
    <Modal :info='info' @updateList='updateList'/>
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
  created(){
    this.getBannerListAction();
  },
  data(){
    return {
      info:{
        isShow: false
      }
    }
  },
  computed:{
    ...mapState({
      bannerList: state => state.banner.bannerList
    }) 
  },
  methods:{
    ...mapActions('banner',['getBannerListAction']),
    updateList(){
      this.getBannerListAction();
    }
  }
}
</script>

<style>

</style>