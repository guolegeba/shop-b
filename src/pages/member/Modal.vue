<template>
<div>
    <el-dialog @close="resetForm" title="编辑" :visible.sync="info.isShow">
    <el-form ref="formRef" label-width="80px" :model="formData" :rules="rules">
      <el-form-item label="用户ID" prop="uid">
           <el-input v-model="formData.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
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
</div>
</template>

<script>
import vm from '../../utils/vm';
export default {
    props:['info'],
    created(){
        // 监听自定义事件sendSpecsData
        vm.$on('sendMemberData',(obj)=>{
            // 1-更新this.formData
            this.formData=obj;
            // 2-显示对话框组件
            this.info.isShow=true;
        });
    },
    data(){
        return {
            formData:{
                uid:'',
                nickname:'',
                phone:'',
                password:'',
                status:''
            },
            rules: {
              nickname: { required: true, message: "请输入昵称", trigger: "blur" },
              phone: { required: true, message: "请输入电话号码", trigger: "blur" },
              status: { required: true, message: "请选择状态", trigger: "blur" }
            }
        }
        
    },
    methods:{
      submit(){
        this.$refs.formRef.validate(valid => {
          if (valid) {
            this.$http.post('/memberedit',this.formData).then(res=>{

              console.log(res);
              if (res.code === 200) {
                this.$success(res.msg);
                this.$emit("updateList");
              } else {
                this.$error(res.msg);
              }
              this.resetForm();
            })
            
          }
        })
      },
      resetForm(){
        // 重置表单状态
        this.$refs.formRef.resetFields();
        // 隐藏对话框组件
        this.info.isShow=false;
      }
    }
}
</script>

<style>

</style>