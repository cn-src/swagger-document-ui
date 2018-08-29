import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {fixSwaggerJson} from '@/utils/swagger'
import swagger from '../tests/unit/utils/swagger.json'

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
    // router,
    store,
    render: h => h(App)
}).$mount('#app');
store.commit('saveApiData', fixSwaggerJson(swagger));

// axios.get('https://petstore.swagger.io/v2/swagger.json')
//     .then(function (response) {
//         const apiData = fixSwaggerJson(response.data)
//         console.log(apiData)
//         store.commit('saveApiData', apiData)
//     })
