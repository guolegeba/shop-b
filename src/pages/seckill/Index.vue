<template>
  <el-card>
    <el-button type="primary" @click="info.isShow=true" icon="el-icon-circle-plus-outline">新增</el-button>
    <el-divider/>
    <List :seckillList='seckillList'/>
    <Modal :info="info" />
  </el-card>
</template>

<script>
// 导入vuex辅助方法
import { mapState,mapActions } from 'vuex';
// 导入子组件List
import List from './List';
import Modal from './Modal';

export default {
  components:{ List,Modal },
  created() {
    this.getSeckillListAction();
  },
  data(){
    return {
      info:{
        isShow: false
      }
    }
  },
  computed: {
      ...mapState({
          seckillList: state => state.seckill.seckillList
      })
  },
  methods: {
      ...mapActions("seckill", ["getSeckillListAction"]),
  }

}
</script>

<style>

</style>