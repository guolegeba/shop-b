// 引入
import Vue from 'vue';
import Vuex from 'vuex';

// 注册
Vue.use(Vuex);

// 导入子模块
import menu from './modules/menu';
import role from './modules/role';
import admin from './modules/admin';
import cate from './modules/cate';
import specs from './modules/specs';
import goods from './modules/goods';
import member from './modules/member';
import banner from './modules/banner';
import seckill from './modules/seckill';

// 创建数据对象
const store = new Vuex.Store({
    state: {
        // 导航菜单数组
        menuList:[],
        // 用户名
        username:''
    },
    getters: {},
    mutations: {
        // 初始化方法
        menuListInit(state){
            // 读取本地存储
            const loginInfo=JSON.parse(localStorage.getItem('loginInfo')||'{}'); 
            // 更新数据
            state.menuList=loginInfo.menus;
            state.username=loginInfo.username;
        }
    },
    actions: {},
    modules: {
        menu,
        role,
        admin,
        cate,
        specs,
        goods,
        member,
        banner,
        seckill
    }
});

// 导出
export default store;
