// 初始化vuex的
// 导入vue和vuex
import Vue from "vue";
import Vuex from "vuex";
//导入操作token的方法
import {getToken,setToken,delToken} from "@/utils/auth";
//导入接口，获取用户的个人信息
import {getUserInfoAPI} from "@/api";

Vue.use(Vuex)

//创建仓库对象
const store = new Vuex.Store({
    state:{
        // token
        token:getToken() || {},//为了防止出现token不存在，页面报错的问题
        // 存储用户信息
        userInfo:{}
    },
    mutations:{
        //设置token
        setToken(state,token){
            //将token保存到state中
            state.token = token
            //将toke保存到localstorage中
            setToken(token)
        },
        //给用户信息复制
        setUserInfo(state,payload){
            // payload得到的用户信息
            state.userInfo = payload
        },
        //推出登录
        logout(state){
            // 删除localstorage中的token
            delToken()
            //删除vuex中的token
            state.token = {}
            // 删除vuex中的userInfo
            state.userInfo = {}
        }
    },
    actions:{
        //设置用户信息
        async setUserInfo(context){
            //判断用户信息是否存在
            if (!context.state.userInfo.name){
                //用户信息不存在，发送请求到服务器得到用户的信息
                const res = await getUserInfoAPI()
                //将数据交给mutations
                context.commit('setUserInfo',res.data.data)
            }
        }
    }
})
export default store



