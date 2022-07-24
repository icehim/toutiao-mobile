//封装所有在登录相关的网络请求
import request from "@/utils/request";

//用户认证（登录注册）
export const login = (data) => {
    //返回了一个promise对象
    return request({
        url: '/v1_0/authorizations',
        method: 'POST',
        data
    })
}

//获取用户个人资料
export function getUserInfo(){
    return request({
        url:'/v1_0/user/profile',
    })
}

//刷新用户token
export function refreshToken() {
    return request({

    })
}