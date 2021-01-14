<template>
  <el-dialog
    @close="reset"
    :title="formData.id>0?'编辑':'新增'"
    :visible.sync="info.isShow"
    width="80%"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select @change="firstCateChange" v-model="formData.first_cateid">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="second_cateid">
            <el-select v-model="formData.second_cateid">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input placeholder="商品名称" v-model="formData.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="img">
            <el-upload
              action="#"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-exceed="limitTips"
              :on-change="imgChange"
              :file-list="imgList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input placeholder="商品价格" v-model="formData.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input placeholder="市场价格" v-model="formData.market_price"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsid">
            <el-select @change="specsChange" v-model="formData.specsid">
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性" prop="specsattr">
            <el-select v-model="formData.specsattr" multiple>
              <el-option
                v-for="(item,index) in specsAttrs"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formData.isnew">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formData.ishot">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">
          <el-form-item prop="description" label-width="0">
            <vueWangeditor
              ref="description"
              v-model="formData.description"
              id="description"
              width="100%"
              height="300"
              style="height:400px"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
// 导入vuex辅助方法
import { mapState, mapActions } from "vuex";
// 导入事件中心
import vm from "../../utils/vm";
export default {
  created() {
    //   商品分类列表初始化
    this.getCateListAction();
    // 商品规格列表初始化
    this.getSpecsListAction();
    // 监听自定义事件sendGoodsData
    vm.$on("sendGoodsData", row => {
      const obj={...row};
      // 如果下拉框启用了多选, 则默认值需要提供数组格式
      obj.specsattr = obj.specsattr.split(",");
      // 1-更新表单数据模型
      this.formData = obj;
      // 2-显示对话框组件
      this.info.isShow = true;
      // 3-手动设置富文本编辑器的内容
      // this.$nextTick将某个操作延迟到视图渲染完毕
      // this.$nextTick(()=>{});
      setTimeout(() => {
        this.$refs.description.setHtml(obj.description);
      }, 1000);
      // 手动触发一级分类change事件回调函数
      this.firstCateChange(obj.first_cateid, false);
      // 手动调用商品规格change事件回调函数
      this.specsChange(obj.specsid, false);
      // 手动更新商品预览数组
      this.imgList =
        obj.img !== "" ? [{ url: this.$imgBaseUrl + obj.img }] : [];
    });
  },
  computed: {
    ...mapState({
      cateList: state => state.cate.cateList,
      specsList: state => state.specs.specsList
    })
  },
  components: {
    vueWangeditor
  },
  props: ["info"],
  data() {
    // 自定义表单校验方法
    const validDesc = (rule, value, callback) => {
      // 表单校验不通过
      if (this.$refs.description.getHtml() === "<p><br></p>") {
        this.$error('商品描述不可为空！')
        return callback(new Error("请输入商品描述"));
      }
      // 表示校验通过
      callback();
    };
    return {
      // 图片预览相关属性
      dialogImageUrl: "",
      dialogVisible: false,
      activeName: "first",
      //   商品图片预览数组
      imgList: [],
      // 二级分类列表
      secondCateList: [],
      //   商品规格可选属性
      specsAttrs: [],
      // 表单数据模型
      formData: {
        first_cateid: "", // 一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", // 商品价格
        market_price: "", //市场价格
        img: "", // 商品图片
        description: "", // 商品描述
        specsid: "", // 规格id
        specsattr: "", // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "" //状态
      },
      //  表单校验规则
      rules: {
        first_cateid: { required: true, message: "请选择", trigger: "blur" },
        second_cateid: { required: true, message: "请选择", trigger: "blur" },
        goodsname: { required: true, message: "请输入", trigger: "blur" },
        price: { required: true, message: "请输入", trigger: "blur" },
        market_price: { required: true, message: "请输入", trigger: "blur" },
        description: { validator: validDesc, trigger: "blur" },
        specsid: { required: true, message: "请选择", trigger: "blur" },
        specsattr: { required: true, message: "请选择", trigger: "blur" },
        isnew: { required: true, message: "请选择", trigger: "blur" },
        ishot: { required: true, message: "请选择", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" }
      }
    };
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsListAction"]),
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 上传组件相关事件处理函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    limitTips() {
      this.$error("此处只能上传一张图片");
    },
    // 监听一级分类的改变
    // flag=true: 表示鼠标点击, 需要进行数据重置
    // flag=false: 表示手动调用
    firstCateChange(id, flag = true) {
      // 1-根据id查找索引
      const index = this.cateList.findIndex(item => item.id === id);
      if (flag) {
        //   2-重置二级分类数组secondCateList
        this.secondCateList = [];
      }
      // 3-更新this.secondCateList
      this.secondCateList = this.cateList[index].children;
    },
    // 监听商品规格更新
    // 区分当前方法是用户手动调用还是通过鼠标点击
    // flag=true, 表示鼠标点击
    // flag=false, 表示手动调用
    specsChange(id, flag = true) {
      // 1-根据id查找索引
      const index = this.specsList.findIndex(item => item.id === id);
      // 2-更新this.specsAttrs
      this.specsAttrs = this.specsList[index].attrs;
      //   鼠标点击规格属性下拉框的时候, 需要进行数据重置
      if (flag) {
        // 3-重置默认的规格属性值
        this.formData.specsattr = [];
      }
    },
    // 监听用户选择的图片
    imgChange(file) {
      // 手动同步数据
      this.formData.img = file.raw;
    },
    // 表单提交
    submit() {
      //   手动同步富文本编辑器的内容
      this.formData.description = this.$refs.description.getHtml();
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 发请求, 提交数据
          const fd = new FormData();
          // 删除多余参数
          delete this.formData.firstcatename;
          delete this.formData.secondcatename;
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const url = this.formData.id > 0 ? "/goodsedit" : "/goodsadd";
          this.$http.post(url, fd).then(res => {
            if (res.code === 200) {
              this.$success(res.msg);
              //  通知父组件更新数据
              this.$emit("updateList");
              //  重置数据
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    // 重置
    reset() {
      // 重置表单数据
      this.formData = {
        first_cateid: "", // 一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", // 商品价格
        market_price: "", //市场价格
        img: "", // 商品图片
        description: "", // 商品描述
        specsid: "", // 规格id
        specsattr: "", // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "" //状态
      };
      // 重置表单状态
      this.$refs.formRef.resetFields();
      // 清空富文本编辑器
      this.$refs.description.setHtml("");
      // 隐藏对话框组件
      this.info.isShow = false;
      // 删除图片预览
      this.imgList = [];
    }
  }
};
</script>

<style>
</style>