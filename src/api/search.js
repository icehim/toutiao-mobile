//用来疯转所有与搜索相关的网络请求

import request from "@/utils/request";

//获取联想建议(自动补全)
export function getThink(params) {
    return request({
        url:'/v1_0/suggestion',
        params
    })
}

//获取搜索结果
export function getResult(params) {
    return request({
        url:'/v1_0/search',
        params
    })
}