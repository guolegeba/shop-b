// 导入数据请求方法
import { getCateList } from '@/request/cate';
export default {
    namespaced:true,
    state() {
        return {
            cateList: []
        }
    },
    mutations:{
        // 初始化cateList数据
        cateListInit(state,list) {
            state.cateList = list;
        }
    },
    actions:{
        // 获取分类列表
        getCateListAction( {commit} ){
            getCateList().then(list => {
                if(list){
                    commit('cateListInit',list)
                }
            })
        }
    }
}