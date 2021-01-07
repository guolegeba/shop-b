// 导入axios
import axios from '@/utils/http';

// 获取商品分类列表
export async function getCateList(params){
    const res = await axios.get('/catelist?istree=1',{params});
    if(res.code===200){
        return res.list
    }else{
        return false;
    }
    
}

