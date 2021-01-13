<template>
  <div class="login-container">
      <div class="login-box">
        <h3 class="login-title">小U商城后台管理系统</h3>
        <el-form
        :model="loginData"
        :rules="rules"  
        ref="loginRef"
        class="login-form"
      >
        <!-- prop: 指定错误消息的显示位置 -->
        <el-form-item prop="username">
          <el-input type="text" placeholder="请输入登录账号" autocomplete="off" v-model="loginData.username">
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password placeholder="请输入密码"  autocomplete="off" v-model="loginData.password">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submitLogin">提交</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          loginData: {
              username: 'admin',
              password: 'admin888'
          },
          rules: {
            username: {required:true,message:'请输入登录账号',trigger:'blur'},
            password: {required:true,message:'请输入登录密码',trigger:'blur'},
          }
      }
  },
  methods: {
    submitLogin(formName) {
      // validate: 进行终极表单校验
      // valid: 系统形参, true表单校验通过, false表单校验不通过
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          this.$http.post('/userlogin',this.loginData).then(res=>{
            if(res.code===200){
              // 1-将用户相关信息存储到本地存储localStorage中
              localStorage.setItem('loginInfo',JSON.stringify(res.list));
              // 2-给出成功提示
              this.$success(res.msg);
              // 3-跳转到管理中心
              this.$router.push('/');
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });

    }
  }
}
</script>

<style scoped>
.login-container{
    height: 100vh;
    background: url("../assets/img/loginbg.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-box{
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 4px;
    padding:0 30px;
}
.login-title {
  color: #409eff;
  text-align: center;
  line-height: 80px;
}
.btn-login {
    width: 100%;
}

</style>