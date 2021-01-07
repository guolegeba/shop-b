<template>
  <el-dialog @close="resetForm" :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
    <el-form ref="formRef" label-width="80px" :model="formData" :rules="rules">
      <el-form-item label="角色" prop="roleid">
        <el-select v-model="formData.roleid">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input placeholder="账号" v-model="formData.username" :disabled="formData.id>0 ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="密码" v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vm from '../../utils/vm';
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      roleList: state => state.role.roleList
    })
  },
  props: ["info"],
  created() {
    // 获取角色下拉列表数据
    this.getRoleListAction();
    vm.$on('sendAdminData',(obj)=>{
      obj.password='';
      // 更新表单数据模型
      this.formData=obj;
      // 显示对话框组件
      this.info.isShow=true;
    });
  },
  data() {
    return {
      // 表单数据
      formData: {        
        roleid: '', // 角色id        
        username: "", //  账号        
        password: "", // 密码
        status: "" // 状态
      },
      rules: {
        roleid: { required: true, message: "请选择角色", trigger: "blur" },
        username: { required: true, message: "请输入账号", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      }
    };
  },
  methods: {
    // 角色下拉框的数据列表
    ...mapActions("role", ["getRoleListAction"]),
    submit(){
        this.$refs.formRef.validate(valid=>{
            if(valid){
                const url=this.formData.id>0?'/useredit':'/useradd';
                // 发请求
                this.$http.post(url,this.formData).then(res=>{
                    if(res.code===200){
                        this.$success(res.msg);

                        // 更新数据列表: 通知父组件更新数据列表
                        this.$emit('updateList');

                        // 重置信息
                        this.resetForm();
                    }else{
                        this.$error(res.msg);
                    }
                    
                })
            }
        });
    },
    // 数据重置
    resetForm(){
        // 重置表单状态
        this.$refs.formRef.resetFields();
        this.formData={
          roleid: '',
          username: "",
          password: "",
          status: ""
        }
        // 隐藏对话框组件
        this.info.isShow=false;
    }
  }
  
};
</script>

<style>
</style>