// 导入axios
import axios from '@/utils/http';

// 获取管理员列表
export async function getSeckillList(){
    const res = await axios.get('/seckilllist');
    if(res.code===200){
        return res.list
    }else{
        return false;
    }
    
}