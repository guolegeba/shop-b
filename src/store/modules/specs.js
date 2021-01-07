// 导入数据请求方法
import { getSpecsList,getSpecsTotal } from '@/request/specs';

export default {
    namespaced:true,
    state(){
        return {
            specsList: [],   // 管理员列表
            specsTotal: 0    // 管理员总数
        }
    },
    mutations: {
        // 初始化specsList
        specsListInit(state,list){
            state.specsList = list;
        },
        // 初始化specsTotal
        specsTotalInit(state,total){
            state.specsTotal = total;
        }
    },
    actions:{
        // parmas={page:'页码',size:'每页显示的数据条数'}
        getSpecsListAction({commit},parmas){
            getSpecsList(parmas).then(list=>{
                // 通过commit方法调用同步mutation方法specsListInit实现更新数据
                if(list){
                    commit('specsListInit',list);
                }
            });
        },
        getSpecsTotalAction({commit}){
            getSpecsTotal().then(total=>{
                // 通过commit方法调用同步mutation方法specsListInit实现更新数据
                if(total){
                    commit('specsTotalInit',total);
                }
            });
        }
    }
}