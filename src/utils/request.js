//封装axios

import axios from "axios";
//导入store
import store from "@/store";
import {Toast} from "vant";
import router from "@/router";

//创建axios的副本对象
const instance = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
})

//再创建一个axios的副本(负责更新token)
const refInstance = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
})

//给instance设置请求拦截器
//请求拦截器:每次发送网络请求时会执行
instance.interceptors.request.use((config) => {
    //得到token
    const token = store.state.token.token
    //判断token是否存在
    if (token) {
        // 将token添加到请求头中
        config.headers.Authorization = `Bearer ${token}`
    }
    //成功的回调
    return config
}, (error) => {
    //失败的回调
    return Promise.reject(error)
})
//响应拦截器:每次网络请求返回内容后会执行
instance.interceptors.response.use(response => {
    //响应正常会触发这个回调函数（正常的状态码:200,201,204）
    return response
}, async error => {
    //携带失效token发送的网络请求
    //响应错误时会触发这个回调（错误的状态码:4000,404,401，500）
    //得到错误的状态码
    const status = error.response.status
    //判断错误的状态码是不是401
    if (status === 401) {
        //说明是token失效
        //得到refresh_token
        const refresh_token = store.state.token.refresh_token
        //根据refresh_token 去服务器得到新的token
        //注意点:在这里不能用instance发送请求，因为他一旦发送请求会触发自己的请求拦截器，
        try {
            // 会将请求头中的Authorization用过期的token覆盖
            const res = await refInstance({
                url: '/v1_0/authorizations',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            })
            //将新的token替换掉原来的token
            store.commit('setToken', {token: res.data.data.token, refresh_token: refresh_token})
            //重新请求之前报错的请求
            return instance(error.config) //.then
        } catch {
            //说明refresh_token也失效了
            //跳转到登录页面，并且提示过期
            Toast.fail('登录已经过期')
            //跳转到登录页面
            router.push('/login')
            //返回一个错误信息
            return Promise.reject(new Error('refresh_token 已过期'))
        }
    }
    return Promise.reject(error)    //.catch
})


//暴露副本对象
export default instance