import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'iview/dist/styles/iview.css';
import api from '@/utils/api'
import './iview-clip'

Vue.config.productionTip = false;

new Vue({
    router,
    // 项目小，使用 $root 做全局状态管理
    data() {
        return {
            activeMenu: {submenu: [], menuItem: ''},
            swaggerResources: [],
            currentSwaggerJson: {}
        }
    },
    beforeCreate() {
        api.initApi(['/swagger-resources', '/swagger-resources.json'], this);
    },
    render: h => h(App)
}).$mount('#app');
