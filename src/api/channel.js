import request from "@/utils/request";

//获取所有的频道列表
export function getAllChannel() {
    return request({
        url: '/v1_0/channels',
    })
}

//设置用户的频道(部分覆盖)
export function addChanel(data) {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data
    })
}

//删除指定用户频道
export function delChannel(id) {
    return request({
        url: `/v1_0/user/channels/${id}`,
        method: 'DELETE'
    })
}