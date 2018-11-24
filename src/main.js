import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'iview/dist/styles/iview.css';
import api from '@/utils/api'
import './iview-cut'

Vue.config.productionTip = false;

new Vue({
    router,
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
