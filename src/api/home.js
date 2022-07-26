//封装所有与home页面相关的网络请求
import request from "@/utils/request";

//获取用户的频道
export function getUserChannel() {
    return request({
        url: '/v1_0/user/channels/',
    })
}

//获取文章新闻推荐
// params:
//      channel_id
//      timestamp
export function getNewList(params) {
    return request({
        url: '/v1_0/articles',
        params
    })
}

//获取新闻详情
export function getArticle(art_id) {
    return request({
        url: `/v1_0/articles/${art_id}`,
    })
}

//关注作者
export function followAuth(data) {
    return request({
        url: `/v1_0/user/followings`,
        method:'POST',
        data
    })
}
//注意点:
//以后在接口文档中看到/:xx
//它表示的是一个路径参数（携带在路由上的参数)
//在请求路径时，需要将/:xx转为具体的参数


// 请求时的参数:
// get 传参:params
// post传参:data
// 路径传参:拼接在路径上的

