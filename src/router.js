import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import swagger from "@/utils/swagger";
import store from "@/store";

Vue.use(Router);

export default new Router({
    // mode: 'history',
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
                const httpEntity = swagger.findHttpEntity(store.state.currentSwaggerJson.collection, route.params.id);
                // 刷新路由存在undefined问题，执行2遍，第二遍会拿到值
                if (!httpEntity) {
                    return {httpEntity: {paramBean: {props: []}, responseBean: {props: []}}, beanMap: {}}
                }
                const beanMap = store.state.currentSwaggerJson.beanMap;
                return {httpEntity, beanMap}
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "entity-view" */ './views/EntityView.vue')
        }
    ]
})
