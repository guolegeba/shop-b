// 导入数据请求方法
import { getRoleList } from '@/request/role'
export default {
    // 开启独立的命名空间
    namespaced:true,
    state(){
        return {
            // 菜单列表
            roleList:[]
        }
    },
    mutations:{
        // 菜单初始化的方式
        roleInit(state,list){
            state.roleList=list;
        }
    },
    actions:{
        // 请求菜单列表
        getRoleListAction({commit}){
            getRoleList().then(res=>{
                if(res){
                    commit('roleInit',res)
                }
            });
        }
    },
    getters:{

    }
}