//封装所有的过滤器
import Vue from "vue";

//导入moment
import moment from "moment";

//处理相对时间的过滤器
//使用中文语言包
moment.locale('zh-cn')

Vue.filter('timefromnow',function (vale) {
    //value使用过滤器的内容
    return moment(vale).fromNow()
})
