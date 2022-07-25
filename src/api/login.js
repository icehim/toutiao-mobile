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

//编辑用户的个人资料：将来可以一次性修改所有的属性，也可以只修改一条属性
export function editInfo(data) {
    return request({
        url:'/v1_0/user/profile',
        method:'PATCH',
        data
    })
}

//编辑用的照片资料
export function uploadImage(data) {
    return request({
        url:'/v1_0/user/photo',
        method:'PATCH',
        data
    })
}