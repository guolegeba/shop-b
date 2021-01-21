// 导入数据请求方法
import { getGoodsList,getGoodsTotal } from '@/request/goods';

export default {
    namespaced: true,
    state(){
        return {
            goodsList: [],
            goodsTotal: 0
        }
    },
    mutations: {
        goodsListInit(state,list){
            state.goodsList = list;
        },
        goodsTotalInit(state,total){
            state.goodsTotal = total;
        }
    },
    actions: {
        // parmas={page:'页码',size:'每页显示的数据条数'}
        getGoodsListAction({commit},params){
            getGoodsList(params).then(list=>{
                if(list){
                    commit('goodsListInit',list);
                }
            })
        },
        getGoodsTotalAction({commit}){
            getGoodsTotal().then(total=>{
                if(total){
                    commit('goodsTotalInit',total);
                }
            });
        }
    }
}