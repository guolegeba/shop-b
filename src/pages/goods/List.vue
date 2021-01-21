<template>
  <div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"></el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" min-width="180"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" min-width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" min-width="180"></el-table-column>
      <el-table-column prop="img" label="商品图片" min-width="180">
        <template v-slot="props">
          <img :src="$imgBaseUrl+props.row.img" style="height:80px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格" min-width="180">
        <template v-slot="props">&yen;{{props.row.price}}</template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" min-width="180">
        <template v-slot="props">&yen;{{props.row.market_price}}</template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" min-width="180">
        <template v-slot="props">
          <el-tooltip :content="props.row.isnew===0?'否':'是'" placement="top">
            <el-switch
              @change="statusChange(props.row,'isnew')"
              v-model="props.row.isnew"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" min-width="180">
        <template v-slot="props">
          <el-tooltip :content="props.row.ishot===0?'否':'是'" placement="top">
            <el-switch
              @change="statusChange(props.row,'ishot')"
              v-model="props.row.ishot"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status===1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template v-slot="props">
          <el-button @click="edit(props.row)" type="success" circle icon="el-icon-edit" size="mini"></el-button>
          <el-button
            @click="del(props.row.id)"
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      :page-size="size"
      background
      layout="prev, pager, next"
      :total="goodsTotal"
    ></el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from "../../utils/vm";
export default {
  props: ["goodsList", "goodsTotal", "size","page"],
  methods: {
    //   监听分页按钮的点击
    pageChange(page) {
      // 1-通过this.$emit()将最新的分页页码传递给父组件Index
      this.$emit("updateList", page);
    },
    // 更新商品状态
    // attr: 要修改的属性(isnew,ishot)
    statusChange(row, attr) {
      // 更新状态
      // 需要将数据转换成FormData
      const fd = new FormData();
      fd.append("id", row.id);
      fd.append(attr, row[attr]);
      console.log(fd);
      this.$http.post("/goodsedit", fd).then(res => {
        if (res.code === 200) {
          return this.$success(res.msg);
        }
        this.$error(res.msg);
      });
    },
    // 编辑
    edit(row) {
      vm.$emit("sendGoodsData", { ...row });
    },
    // 删除
    del(id) {
      this.$delConfirm(() => {
        this.$http.post("/goodsdelete", { id }).then(res => {
          if (res.code === 200) {
            this.$success(res.msg);
             // 当前处于最后一页&&最后一页只有一条数据
            if(Math.ceil(this.goodsTotal/this.size)===this.page && (this.goodsTotal%this.size === 1 || this.size ===1 )){
                // 请求上一页数据
              this.$emit('updatePage',this.page-1);
            }else{
              // 更新数据列表
              this.$emit('updateList'); 
            }
          } else {
            this.$error(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style>
</style>