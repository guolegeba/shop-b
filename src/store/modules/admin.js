// 导入数据请求方法
import { getAdminList,getAdminTotal } from '@/request/admin';

export default {
    namespaced:true,
    state(){
        return {
            adminList: [],   // 管理员列表
            adminTotal: 0    // 管理员总数
        }
    },
    mutations: {
        // 初始化adminList
        adminListInit(state,list){
            state.adminList = list;
        },
        // 初始化adminTotal
        adminTotalInit(state,total){
            state.adminTotal = total;
        }
    },
    actions:{
        // parmas={page:'页码',size:'每页显示的数据条数'}
        getAdminListAction({commit},parmas){
            getAdminList(parmas).then(list=>{
                // 通过commit方法调用同步mutation方法adminListInit实现更新数据
                if(list){
                    commit('adminListInit',list);
                }
            });
        },
        getAdminTotalAction({commit}){
            getAdminTotal().then(total=>{
                // 通过commit方法调用同步mutation方法adminListInit实现更新数据
                if(total){
                    commit('adminTotalInit',total);
                }
            });
        }
    }
}