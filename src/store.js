import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        swaggerResources: [],
        currentSwaggerJson: {},
        httpEntitiesWithTabs: []
    },
    mutations: {
        swaggerResources(state, data) {
            state.swaggerResources = data
        },
        currentSwaggerJson(state, data) {
            state.currentSwaggerJson = data
        },
        httpEntitiesWithTabs(state, data) {
            state.httpEntitiesWithTabs = data
        }
    },
    actions: {}
})
