//负责用来按需导入vant中的组件
import Vue from "vue";
import { NavBar,Form,Field,Button,Toast,Tabbar, TabbarItem,Grid, GridItem,Cell, CellGroup,Dialog } from 'vant';
import { Image as VanImage } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Uploader } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Popup)
Vue.use(Dialog);
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