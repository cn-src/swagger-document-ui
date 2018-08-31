import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import swagger from "@/utils/swagger";
import store from "@/store";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/entity/:id',
            name: 'EntityView',
            props: (route) => {
                const httpEntity = swagger.findHttpEntity(store.state.apiData, route.params.id);
                const beanMap = store.state.apiData.beanMap;
                return {httpEntity, beanMap}
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/EntityView.vue')
        }
    ]
})
