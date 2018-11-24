/**
 * 精简 iview 。
 */
import Vue from 'vue'
import {
    Layout,
    Header,
    Content,
    Menu,
    MenuItem,
    Submenu,
    Sider,
    Icon,
    Affix,
    Tooltip,
    AutoComplete,
    Option,
    Divider,
    Table,
    Anchor,
    AnchorLink,
    Tag,
    Modal,
    CellGroup,
    Cell
} from 'iview'

Vue.prototype.$IVIEW = {};
Vue.component('Layout', Layout);
Vue.component('Header', Header);
Vue.component('Content', Content);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Submenu', Submenu);
Vue.component('Sider', Sider);
Vue.component('Icon', Icon);
Vue.component('Affix', Affix);
Vue.component('Tooltip', Tooltip);
Vue.component('AutoComplete', AutoComplete);
Vue.component('Option', Option);
Vue.component('Divider', Divider);
Vue.component('Table', Table);
Vue.component('Anchor', Anchor);
Vue.component('AnchorLink', AnchorLink);
Vue.component('Tag', Tag);
Vue.component('Modal', Modal);
Vue.component('CellGroup', CellGroup);
Vue.component('Cell', Cell);
