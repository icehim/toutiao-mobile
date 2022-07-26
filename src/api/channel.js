import request from "@/utils/request";

//获取所有的频道列表
export function getAllChannel() {
    return request({
        url:'/v1_0/channels',
    })
}