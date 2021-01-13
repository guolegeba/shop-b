import axios from '@/utils/http';

// 获取会员列表
export async function getMemberList(){
    const res = await axios.get('/memberlist');
    if(res.code===200){        
        return res.list
    }else{
        return false;
    }
}