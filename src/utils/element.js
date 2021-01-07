import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 封装一个成功提示
Vue.prototype.$success=function(message){
    this.$message({
        type:'success',
        message
    });
}    

// 封装一个失败提示
Vue.prototype.$error=function(message){
    this.$message({
        type:'error',
        message
    });
}   

// 确认提示框
Vue.prototype.$delConfirm = function(callback){
    this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认之后的逻辑操作
        callback&&callback();
      }).catch(() => {
        // 取消之后的逻辑操作       
      });
}