//封装axios

import axios from "axios";
//创建axios的副本对象

const instance = axios.create({
    baseURL:'http://toutiao.itheima.net/'
})

//暴露副本对象
export default instance