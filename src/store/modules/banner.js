// 导入数据请求方法
import { getBannerList } from '@/request/banner';
export default {
    namespaced:true,
    state() {
        return {
            bannerList: []
        }
    },
    mutations:{
        // 初始化cateList数据
        bannerListInit(state,list) {
            state.bannerList = list;
        }
    },
    actions:{
        // 获取分类列表
        getBannerListAction( {commit} ){
            getBannerList().then(list => {
                if(list){
                    commit('bannerListInit',list)
                }
            })
        }
    }
}