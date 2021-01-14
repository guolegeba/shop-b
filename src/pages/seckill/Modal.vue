<template>
  <el-dialog
    @close="resetForm"
    title="提示"
    width="30%"
    :visible.sync="info.isShow">
    <span>这是一段信息</span>
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
        vm.$on('sendBannerData',row=>{
            this.info.isShow = true;
            this.formData = row;
        })
    },
    data(){
        return {
            formData:{
                title:'',
                begintime:'',
                endtime:'',
                first_cateid:'',
                second_cateid:'',
                goodsid:'',
                status:''
            }
        }

    },
    methods:{
        submit(){

        },
        resetForm(){
            // this.$refs.formRef.resetFields();
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