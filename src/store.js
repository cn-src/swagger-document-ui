import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        swaggerResources: []
    },
    mutations: {
        swaggerResources(state, data) {
            state.swaggerResources = data
        }
    },
    actions: {}
})
