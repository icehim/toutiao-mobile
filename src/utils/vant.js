//负责用来按需导入vant中的组件
import Vue from "vue";
import { NavBar,Form,Field,Button,Toast } from 'vant';

Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Button);