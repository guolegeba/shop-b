// 导入axios
import axios from '@/utils/http';

// 获取管理员列表
export async function getSpecsList(params){
    const res = await axios.get('/specslist',{params});
    if(res.code===200){
        return res.list
    }else{
        return false;
    }
    
}


// 获取数据总条数
export async function getSpecsTotal(){
    const res = await axios.get('/usercount');
    if(res.code===200){
        // console.log(res.list);
        return res.list[0].total;
    }
    return false;
}