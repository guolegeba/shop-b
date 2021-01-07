<template>
  <el-card>
    <el-button @click="info.isShow=!info.isShow" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
    <el-divider />
    <!-- 通过自定义属性, 向子组件传递数据 -->
    <!-- 列表组件 -->
    <List @updatePage="updatePage" :size="size" :page="page"  :adminList="adminList" :adminTotal="adminTotal" @updateList="updateList"/>
    <!-- 表单组件 -->
    <Modal @updateList="updateList" :info="info"/>
  </el-card>
</template>

<script>
// 导入vuex的辅助方法
import { mapState, mapActions } from "vuex";
// 导入列表组件
import List from "./List";
import Modal from "./Modal";

export default {
  data() {
    return {
      info: {
        // 控制对话框组件的显示状态
        isShow: false
      },
      // 页码
      page: 1,
      // 每页显示的数据条数
      size: 1
    };
  },
  computed: {
    ...mapState({
      adminList: state => state.admin.adminList,
      adminTotal: state => state.admin.adminTotal
    })
  },
  methods: {
    ...mapActions("admin", ["getAdminListAction", "getAdminTotalAction"]),

    // 自定义事件updatePage处理函数
    updatePage(page) {
      // 1-更新页码
      this.page = page;
      // 2-重新请求数据列表
      this.getAdminListAction({ page: this.page, size: this.size });
      // 3-更新数据总条数
      this.getAdminTotalAction();
    },

    // 自定义事件updateList的处理方法
    updateList(){
        // 更新数据列表
        this.getAdminListAction({page:this.page,size:this.size});
        // 更新数据总条数
        this.getAdminTotalAction();
    }
  },
  components: { List, Modal },
  
  created() {
    this.getAdminListAction({ page: this.page, size: this.size });
    this.getAdminTotalAction();
  }
};
</script>

<style>
</style>