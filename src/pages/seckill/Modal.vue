<template>
  <el-dialog
    @close="resetForm"
    title="提示"
    width="50%"
    :visible.sync="info.isShow">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="活动名称" prop="title">
            <el-input v-model="formData.title" placeholder="活动名称"></el-input>
        </el-form-item>
        <!-- 时间模块 -->
        <el-form-item label="活动时间" prop="time">
             <el-date-picker                
                v-model="formData.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
        


    <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm" >取 消</el-button>
        <el-button @click="submit" type="primary">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import vm from '@/utils/vm';
export default {
    props:['info'],
    created(){
        vm.$on('sendSeckillData',row=>{
            this.info.isShow = true;
            this.formData = row;
        })
    },
    data(){
        return {
            formData:{
                time:'',
                title:'',
                begintime:'',
                endtime:'',
                first_cateid:'',
                second_cateid:'',
                goodsid:'',
                status:''
            },
            // 表单校验规则
            rules:{
                title:{required:true,message:'请输入规格名称',trigger:'blur'},
                status:{required:true,message:'请选择状态',trigger:'blur'},
                time:{required:true,message:'请选择时间',trigger:'blur'}
            }
        }

    },
    methods:{
        submit(){
          this.$refs.formRef.validate(valid=>{
            if(valid){
                this.formData.begintime = this.$traTime1(this.formData.time[0]);
                this.formData.endtime = this.$traTime1(this.formData.time[1]);
                console.log(this.formData.begintime);
                console.log(this.formData.endtime);
                this.info.isShow = false;
            }
          })
        },
        resetForm(){
            this.$refs.formRef.resetFields();
            this.formData = {
                title:'',
                begintime:'',
                endtime:'',
                first_cateid:'',
                second_cateid:'',
                goodsid:'',
                status:''
            };
            this.info.isShow = false;
        }
    }
    

}
</script>

<style>

</style>