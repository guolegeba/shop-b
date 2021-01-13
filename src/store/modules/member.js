// 导入数据请求方法
import { getMemberList } from '@/request/member';

export default {
    namespaced:true,
    state(){
        return {
            memberList: []   // 会员列表
        }
    },
    mutations: {
        // 初始化memberList
        memberInit(state,list){
            state.memberList = list;
        }
    },
    actions:{
        getMemberListAction({commit}){
            getMemberList().then(list=>{
                // 通过commit方法调用同步mutation方法memberInit实现更新数据
                if(list){
                    commit('memberInit',list);
                }
            });
        }
    }
}