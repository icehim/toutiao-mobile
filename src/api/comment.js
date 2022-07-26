//封装所有与评论相关的请求
import request from "@/utils/request";

//获取评论或者评论回复
export function getComments(params) {
    return request({
        url:'/v1_0/comments',
        params
    })
}

//对文章或者评论进行评论
export function setComment(data) {
    return request({
        url:'/v1_0/comments',
        method:'POST',
        data
    })
}


