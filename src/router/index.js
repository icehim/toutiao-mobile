import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入store
import store from "@/store";
//导入登录组件
import login from "@/views/login";
//导入轻提示
import {Toast} from 'vant';

Vue.use(VueRouter)
Vue.use(Toast);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login,
    },
    {
        path: '/layout',
        component: () => import('@/layout/index'),
        children: [
            {path: 'home', component: () => import('@/views/home')},
            {path: 'ask', component: () => import('@/views/ask')},
            {path: 'video', component: () => import('@/views/video')},
            {
                path: 'my', component: () => import('@/views/my'), meta: {
                    needLogin: true//说明当前路由需要登录
                }
            },
        ]
    },
    {
        path: '/my/edit', component: () => import('@/views/my/edit'), meta: {
            needLogin: true//说明当前路由需要登录
        }
    },
    {
        path: '/home/detail',
        component: ()=>import('@/views/detail/index'),
    },
    {
        path: '/home/search',
        component: ()=>import('@/views/search/index'),
    },
    {
        path: '/search/result',
        component: ()=>import('@/views/result'),
    },
    {
        path: '/my/zhi',
        component: ()=>import('@/views/zhi'),meta: {
            needLogin: true//说明当前路由需要登录
        }
    },
]

const router = new VueRouter({
    routes
})

//添加一个导航守卫
router.beforeEach((to, from, next) => {
    // 判断当前路由是否需要登陆
    const needLogin = to.meta.needLogin
    if (needLogin) {
        //需要登陆:在判断是否携带token
        //得到token
        const token = store.state.token.token
        if (token) {
            //有token,继续向下执行
            next()
        } else {
            //提示未登录
            Toast.fail('您还未登录!')
            // 无,跳转到登录页面
            //保存当前访问的路径
            next(`/login?url=${to.path}`)
        }
    } else {
        // 不需要登陆
        next()
    }
})
export default router
