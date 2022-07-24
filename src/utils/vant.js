//负责用来按需导入vant中的组件
import Vue from "vue";
import { NavBar,Form,Field,Button,Toast,Tabbar, TabbarItem,Grid, GridItem,Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Button);