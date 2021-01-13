<template>
  <el-dialog @close="reset" :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow">
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="规格名称" prop="specsname">
          <el-input v-model="formData.specsname" placeholder="规格名称"></el-input>
      </el-form-item>
       <el-form-item label="规格可选值" prop="attrs">
          <div class="item" v-for="(item,index) in attrs" :key="index">
              <el-input v-model.trim="attrs[index]" placeholder="规格可选值"></el-input>
              <el-button v-if="index===0" @click="addAttr" type="success" size="mini">新增</el-button>
              <el-button v-else @click="delAttr(index)" type="danger" size="mini">删除</el-button>   
          </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="reset">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
// 导入事件中心
import vm from '../../utils/vm';
export default {
    created(){
        // 监听自定义事件sendSpecsData
        vm.$on('sendSpecsData',(obj)=>{
            // 1-更新this.formData
            this.formData=obj;
            this.attrs=obj.attrs;
            // 2-显示对话框组件
            this.info.isShow=true;
        });
    },
    props:['info'],
    data(){
        // 自定义表单校验方法
        const validAttrs=(rule,value,callback)=>{
            // 假设表单元素都输入了内容
            var flag=true;
            this.attrs.forEach(item=>{
                if(item===''){
                    flag=false;
                }
            });
            if(!flag){
               return callback(new Error('请输入规格属性可选值')); 
            }
            // 表示表单校验通过
            callback();
        }
        return {
            // 规格可选值
            attrs:[''],
            // 表单数据模型
            formData:{
                // 规格名称
                specsname:'',
                // 规格可选值
                attrs:'',
                // 状态
                status:''    
            },
            // 表单校验规则
            rules:{
                specsname:{required:true,message:'请输入规格名称',trigger:'blur'},
                status:{required:true,message:'请选择状态',trigger:'blur'},
                attrs:{validator:validAttrs,trigger:'blur'}
            }
        }
    },
    methods:{
        submit(){
            this.$refs.formRef.validate(valid=>{
                if(valid){
                    // 提交表单数据
                    // 转换规格属性的数据类型
                    this.formData.attrs=this.attrs.join(',');   
                    const url=this.formData.id>0?'/specsedit':'/specsadd';
                    this.$http.post(url,this.formData).then(res=>{
                        if(res.code===200){
                            this.$success(res.msg);
                            // 更新数据列表
                            this.$emit('updateList');
                            // 数据重置
                            this.reset();
                        }else{
                            this.$error(res.msg);
                        }
                    }) 
                }
            })
        },
        // 重置方法
        reset(){
            // 重置数据
            this.formData={specsname:'',status:'',attrs:''};
            this.attrs=[''];
            // 重置表单状态
            this.$refs.formRef.resetFields();
            // 关闭对话框组件
            this.info.isShow=false;

        },
        // 新增属性可选值
        addAttr(){
            if(this.attrs.length>=5){
                return this.$error('最多只能添加5个属性值');
            }
            this.attrs.push('')
        },
        // 删除属性可选值
        delAttr(index){
            // 根据索引删除数组元素
            this.attrs.splice(index,1);
        }
    }
}
</script>

<style scoped>
.item{
    display: flex;
    margin: 5px 0;
}
.item .el-button{
    margin-left: 10px;
}
</style>