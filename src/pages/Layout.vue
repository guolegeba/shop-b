<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="asideWidth">
        <h3 class="logo-text">小U商城后台</h3>
        <!-- 主导航 -->
        <el-menu
         :collapse='collapse'
         :collapse-transition="false"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#FFF"
          active-text-color="#FFF"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>
          
          <!-- 动态渲染菜单 -->
          <el-submenu v-for='item in menuList' :key='item.id' :index="item.id+''">
            <template slot="title">
              <i class="el-icon-setting"></i><span>{{item.title}}</span>
            </template>
            <el-menu-item v-for='val in item.children' :key='val.id' :index="val.url">
              <span slot="title">{{val.title}}</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button @click="collapse=!collapse" type="primary" icon="el-icon-s-fold" size="mini"></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button @click="$router.back()" icon="el-icon-back" size="mini" circle></el-button>

          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div >
                  <i class="el-icon-user"></i>个人信息
                </div>              
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="fullscreen">
                  <i class="el-icon-full-screen"></i>全屏预览
                </div>              
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="logout">
                  <i class="el-icon-switch-button"></i>安全退出
                </div>              
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>

            <!-- 二级路由占位符 -->
            <router-view /> 

        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
// 导入全屏显示组件vue-fullscreen
import fullscreen from 'vue-fullscreen'
// 注册
Vue.use(fullscreen);
import { mapState, mapMutations } from "vuex";
export default {
  created(){
    this.menuListInit();
  },
  data(){
    return {
      collapse: false    // false: 非折叠, true: 折叠
    }
  },
  computed:{
    ...mapState(['menuList','username']),
    asideWidth() {
      return this.collapse ? "64px" : "226px";
    }
  },
  methods: {
    ...mapMutations(["menuListInit"]),
    handleOpen(key, keyPath) { // 展开
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) { // 折叠 
      // console.log(key, keyPath);
    },

    // 安全退出
    logout() {
      // 删除本地存储中的登录凭证
      localStorage.removeItem("loginInfo");
      this.$success("退出成功");
      // 自动跳转到登录页面
      this.$router.push("/login");
    },
    
    // 全屏显示
    fullscreen() {
      this.$refs.fullscreen.toggle();
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}

/* logo */
.logo-text {
  background: #444;
  color: #fff;
  line-height: 60px;
  font-weight: normal;
  letter-spacing: 5px;
  text-align: center;
  /* 不要自动换行 */
  white-space: nowrap;
}

/* 导航 */
.el-menu {
  height: calc(100vh - 60px);
  border-right: none;
}
/* 导航高亮类名 */
.is-active {
  background: #409eff !important;
}
/* 页面头部 */
.el-header {
  background-color: #fff;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.el-header button {
  height: 26px;
}
.el-breadcrumb {
  margin:0 20px;
}
.el-dropdown{
    position: absolute;
    right:20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>