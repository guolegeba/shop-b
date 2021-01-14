<template>
  <div>
      <el-dialog :title="formData.id>0?'编辑':'新增'" :visible.sync="info.isShow"  @close="resetForm">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" width="80%">
          <el-form-item label="轮播图名称" prop="title">
            <el-input placeholder="轮播图名称" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="轮播图图片" prop="img" >           
          <!--
              action: 指定图片上传的数据接口 
              auto-upload: 是否自动上传图片, 默认自动上传
              on-preview: 图片预览事件
              on-change: 当用户选择文件的时候, 自动触发
              limit: 最大允许上传个数
              on-exceed:文件超出个数限制时的钩子
              file-list: 设置默认需要展示的图片列表, 需要一个数组[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
          -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            :on-change="fileChange"
            :limit="1"
            :on-exceed="limitTips"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
import vm from "@/utils/vm";
export default {
  props:['info'],
  created(){
    vm.$on('sendBannerData',row=>{
      this.info.isShow = true;
      this.formData = row;
      this.fileList = [{ url: this.$imgBaseUrl + row.img }];
    })
  },
  data(){
    return {
      // 上传组件所需属性
      dialogImageUrl: "",
      dialogVisible: false,
      // upload组件默认需要展示的图片列表
      fileList: [],
      formData:{
        title:'',
        img:'',
        status:''
      },
      rules: {
        title: { required: true, message: "请输入轮播图名称", trigger: "blur" },
        img: { required: true, message: "请选择图片", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      }
    }
    
  },
  methods:{
    submit(){
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 有图片的数据必须使用FormData对象
          const fd = new FormData();
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }

          const url = this.formData.id>0 ? '/banneredit' : '/banneradd';
          this.$http.post(url,fd).then(res=>{

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
    // 上传组件相关方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 监听用户选择文件
    // file: 系统自动注入, 表示用户选择的文件对象
    fileChange(file) {
      // 手动更新数据
      this.formData.img = file.raw;
    },
    // 图片数量超过上限的提示
    limitTips() {
      this.$error("最多只能上传一张");
    },
    // 重置数据
    resetForm() {
      this.$refs.formRef.resetFields();
      this.formData = {
        title:'',
        img:'',
        status: ''
      };
      this.fileList=[];
      this.info.isShow = false;
    }
  }
}
</script>

<style>

</style>