<template>
  <el-dialog @close="resetForm" title="新增" :visible.sync="info.isShow">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="上级" prop="pid">
        <el-select v-model="formData.pid">
          <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="catename">
        <el-input placeholder="名称" v-model="formData.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img" v-if="formData.pid!==0">
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
</template>

<script>
import vm from '@/utils/vm';
import { mapState } from 'vuex';
export default {
  props: ['info'],
  computed:{
    ...mapState({cateList: state => state.cate.cateList})
  },
  created(){
    vm.$on("sendCateData",row=>{
      this.info.isShow = true;
      this.formData = row;
      this.fileList = [{url: this.$imgBaseUrl + row.img}];
    })
  },
  data(){
    return{
      //   和表单进行绑定的数据对象
      formData: {
        pid: 0,
        catename: "",
        img: "",
        status: ""
      },
      // 表单校验规则对象
      rules: {
        pid: { required: true, message: "请选择上级", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur"
        },
        status: { required: true, message: "请选择状态", trigger: "blur" }
      },

      // 上传组件所需属性
      dialogImageUrl: "",
      dialogVisible: false,

      // upload组件默认需要展示的图片列表
      fileList: []
    }
  },
  methods: {
    // 重置数据
    resetForm() {
      // 重置表单
      this.$refs.formRef.resetFields();
      // 重置数据对象formData
      this.formData = {
        pid: 0,
        catename: "",
        img: "",
        status: ""
      };
      // 关闭对话框组件
      this.info.isShow = false;
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
    // 提交方法
    submit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 将this.formData数据对象, 转换成FormData对象
          // 创建FormData实例对象
          const fd = new FormData();
          // 删除多余的数据: delete删除对象的属性
          delete this.formData.children;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const url = this.formData.id > 0 ? "/cateedit" : "/cateadd";
          this.$http.post(url, fd).then(res => {
            if (res.code === 200) {
              this.$success(res.msg);
              // 更新数据列表: 通知父组件更新数据列表
              this.$emit("updateList");
              // 重置数据
              this.resetForm();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    }
  }


}
</script>

<style>

</style>