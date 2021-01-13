// 导入数据请求方法
import { getSeckillList } from '@/request/seckill';
export default {
    namespaced:true,
    state() {
        return {
            seckillList: []
        }
    },
    mutations:{
        // 初始化cateList数据
        seckillListInit(state,list) {
            state.seckillList = list;
        }
    },
    actions:{
        // 获取分类列表
        getSeckillListAction( {commit} ){
            getSeckillList().then(list => {
                if(list){
                    commit('seckillListInit',list)
                }
            })
        }
    }
}