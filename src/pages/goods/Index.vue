<template>
  <el-card>
    <el-button type="primary" icon="el-icon-circle-plus-outline" >新增</el-button>

    <el-divider/>

    <List />
  </el-card>
</template>

<script>
// 导入vuex的辅助方法
import { mapState, mapActions } from "vuex";
// 导入列表组件
import List from "./List";

export default {
    components: { List },
    created(){
        this.getGoodsListAction({page:this.page, size:this.size});
        this.getGoodstotalAction();
    },
    computed: {
        ...mapState({
            goodsList: state => state.goods.goodsList,
            goodsTotal: state => state.goods.goodsTotal
        })
        
    },
    data(){
        return{
            page: 1,
            size: 1
        }
    },
    methods:{
        ...mapActions('goods',['getGoodsListActions','getGoodsTotalAction']),
    }

}
</script>

<style>

</style>