<template>
  <el-card>
    <el-button @click="info.isShow=!info.isShow" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
    <el-divider />
    <!-- 调用列表子组件List -->
    <List @updatePage='updatePage' @updateList="updateList" :goodsList="goodsList" :goodsTotal="goodsTotal" :size="size" :page='page'/>
    <!-- 调用对话框子组件 -->
    <Modal :info="info" @updateList="updateList"/>
  </el-card>
</template>

<script>
// 导入vuex辅助方法
import { mapState, mapActions } from "vuex";
// 导入子组件List
import List from "./List";
import Modal from "./Modal";

export default {
  data(){
    return {
      info:{isShow:false},
      page:1, // 页码
      size:4  // 每页显示数据条数
    }
  },
  components: {
    List,
    Modal
  },
  created() {
    this.getGoodsListAction({page:this.page,size:this.size});
    this.getGoodsTotalAction();
  },
  computed: Object.assign({
    // 自己的计算属性
  },mapState({
    goodsList: state => state.goods.goodsList,
    goodsTotal: state => state.goods.goodsTotal
  })),
  methods:{
    ...mapActions('goods',['getGoodsListAction','getGoodsTotalAction']),
    // 自定义事件updateList的处理函数
    updateList(page){
        // 更新页码
        if(page){
          this.page=page;
        }
        // 重新请求数据列表
        this.getGoodsListAction({page:this.page,size:this.size});
        this.getGoodsTotalAction();
    },
    // 自定义事件updatePage处理函数
    updatePage(page) {
      this.page = page;
      this.getGoodsListAction({page:this.page,size:this.size});
      this.getGoodsTotalAction();
    },
  }
};
</script>

<style>
</style>