<template>
  <el-card>
      <List :memberList='memberList' />
      <Modal />
  </el-card>
</template>

<script>
// 导入vuex的辅助方法
import { mapState, mapActions } from "vuex";
// 导入列表组件
import List from "./List";
import Modal from "./Modal";

export default {
    components: { List, Modal },
    created() {
        this.getMemberListAction();
    },
    computed: {
        ...mapState({
            memberList: state => state.member.memberList
        })
    },
    methods: {
        ...mapActions("member", ["getMemberListAction"]),
    }
}
</script>

<style>

</style>