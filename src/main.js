import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import swagger from '@/utils/swagger'
import api from '@/utils/api'
import swaggerJson from '../tests/unit/utils/swagger.json'

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

api.initApi('/swagger-resources');
