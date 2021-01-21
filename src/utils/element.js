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


// 标准格式转时间戳
Vue.prototype.$traTime1=function(time){
  // 转成yy-mm-dd格式
  var d = new Date(time);
  d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  // 转成时间戳
  var s=new Date(d).getTime();
  return s;
}