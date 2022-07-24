// 初始化vuex的
// 导入vue和vuex
import Vue from "vue";
import Vuex from "vuex";
//导入操作token的方法
import {getToken,setToken} from "@/utils/auth";

Vue.use(Vuex)

//创建仓库对象
const store = new Vuex.Store({
    state:{
        // token
        token:getToken() || {} //为了防止出现token不存在，页面报错的问题
    },
    mutations:{
        //设置token
        setToken(state,token){
            //将token保存到state中
            state.token = token
            //将toke保存到localstorage中
            setToken(token)
        }
    },
})
export default store



