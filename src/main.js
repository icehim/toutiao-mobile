import Vue from 'vue'
import App from './App.vue'
import router from './router'

//vant
import '@/utils/vant'
//导入全局样式
import '@/style/index.less'
//导入flexible(给rem设置基准值)
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
