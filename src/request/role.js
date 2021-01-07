import axios from '../utils/http';
// 获取用户列表
export async function getRoleList(){
   const res=await axios.get('/rolelist?istree=1');
   if(res.code===200){
      return res.list;  
   }
   return false;
}