import Vue from 'vue'
import App from './App.vue'
import router from './router'

//vant
import '@/utils/vant'
//导入全局样式
import '@/style/index.less'
//导入flexible(给rem设置基准值)
import 'amfe-flexible'
//导入store
import store from "@/store";
//导入自己封装的过滤器
import '@/filters'

Vue.config.productionTip = false

new Vue({
    //挂载router
    router,
    //挂载vuex
    store,
    render: h => h(App)
}).$mount('#app')
