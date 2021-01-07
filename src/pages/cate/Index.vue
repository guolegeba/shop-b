<template>
  <el-card>
      <el-button @click="info.isShow=true" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-divider/>

      <List @updateList='updateList' :cateList='cateList'/>

      <Modal @updateList='updateList' :info='info' />
  </el-card>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import Modal from './Modal';
import List from './List';

export default {
  components: { List,Modal },
  created(){
    this.getCateListAction();
  },
  data(){
    return {
      info: {
        isShow:false
      }
    }
  },
  computed: {
    ...mapState({
      cateList: state => state.cate.cateList
    })
  },
  methods: {
    ...mapActions('cate',['getCateListAction']),
    // 自定义事件updateList的处理函数
    updateList(){
      this.getCateListAction();
    }
  }
}
</script>

<style>

</style>