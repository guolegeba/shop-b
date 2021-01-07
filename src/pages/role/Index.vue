<template>
  <el-card>
    <el-button
      @click="info.isShow = true"
      type="primary"
      icon="el-icon-circle-plus-outline"
    >新增</el-button>
    <el-divider />

    <!-- 调用列表组件List -->
    <List :roleList="roleList" @updateList="updateList"/>
    <!-- 调用表单组件Modal -->
    <Modal :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
// 导入子组件
import Modal from "./Modal";
import List from "./List";
import { mapState, mapActions } from "vuex";
export default {
components: {
    Modal,
    List
  },
  computed: {
    ...mapState({
      roleList: state => state.role.roleList
    })
  },
  methods: {
    ...mapActions("role", ["getRoleListAction"]),
    // 自定义事件updateList的处理函数
    updateList() {
      // 更新数据列表
      this.getRoleListAction();
    }
  },
  created() {
    this.getRoleListAction();
  },
  data() {
    return {
      info: {
        // 控制对话框的显示状态
        isShow: false
      }
    };
  }
}
</script>

<style>

</style>