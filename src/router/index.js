import Vue from 'vue';
import Router from 'vue-router';

const Login = ()=>import('@/pages/Login'); 
const Layout = ()=>import('@/pages/Layout'); 

// 菜单、角色、管理员管理
const Menu=()=>import('@/pages/menu/Index');
const Role=()=>import('@/pages/role/Index');
const Admin=()=>import('@/pages/Admin/Index');

// Home
const Home=()=>import('@/pages/Home');

// 商品分类
const Cate=()=>import('@/pages/cate/Index');
// 商品规格
const Specs=()=>import('@/pages/specs/Index');
// 商品信息
const Goods=()=>import('@/pages/goods/Index');
// 会员管理
const Member=()=>import('@/pages/member/Index');
// 轮播图管理
const Banner=()=>import('@/pages/banner/Index');
// 限时秒杀管理
const Seckill=()=>import('@/pages/seckill/Index');


Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title:'管理员登录'
    } 
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      title:'小U商城后台管理系统'
    },
    redirect:'/home',
    children: [
      {
        path:'/home',
        component:Home,
        meta:{
          title:'数据可视化'
        }
      },
      {
        path:'/menu',
        component:Menu,
        meta:{
          title:'菜单管理'
        }
      },
      {
        path:'/role',
        component:Role,
        meta:{
          title:'角色管理'
        }
      },
      {
        path:'/admin',
        component:Admin,
        meta:{
          title:'管理员管理'
        }
      },
      {
        path:'/category',
        component:Cate,
        meta:{
          title:'商品分类'
        }
      },
      {
        path:'/specs',
        component:Specs,
        meta:{
          title:'商品规格'
        }
      },
      {
        path:'/goods',
        component:Goods,
        meta:{
          title:'商品信息'
        }
      },
      {
        path:'/member',
        component:Member,
        meta:{
          title:'会员管理'
        }
      },
      {
        path:'/banner',
        component:Banner,
        meta:{
          title:'轮播图管理'
        }
      },
      {
        path:'/seckill',
        component:Seckill,
        meta:{
          title:'限时秒杀管理'
        }
      }
    ]
  }
];

const router = new Router({
  routes
});

// 路由导航守卫
router.beforeEach(function(to,from,next){
  // 如果用户访问的是非登录页面
  if(to.path!=='/login'){
    // 读取本地存储
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo')||'{}');
    // 如果没有登录凭证
    if(!loginInfo.token){
      return next('/login');
    }
    // 检验访问权限
    const menusUrl = loginInfo.menus_url;
    menusUrl.push('/home');
    if(menusUrl.indexOf(to.path)===-1) {
      return next('/home');
    }
  }
  next();
  // 动态设置页面标题
  document.title = to.meta.title;
});

export default router;
