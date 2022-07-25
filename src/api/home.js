//封装所有与home页面相关的网络请求
import request from "@/utils/request";

//获取用户的频道
export function getUserChannel(){
    return request({
        url:'/v1_0/user/channels/',
    })
}
