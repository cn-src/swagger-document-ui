import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";
import _ from 'lodash';

function initApi(paths) {
    if (!_.isArray(paths)) {
        paths = [paths]
    }
    const swaggerResources = [];
    axios.all(paths.map(url => axios.get(url)))
        .then(function (results) {
            results.flatMap(function (it) {
                return it.data
            }).forEach(function (data) {
                swaggerResources.push(data)
            });
            store.commit('swaggerResources', swaggerResources);
            if (swaggerResources[0] && swaggerResources[0].url) {
                setCurrentSwaggerJson(swaggerResources[0].url);
            }
        });
}

function setCurrentSwaggerJson(path) {
    axios.get(path)
        .then(function (swaggerResponse) {
            const data = swaggerResponse.data;
            let swaggerJson;
            if (typeof data === "string") {
                swaggerJson = JSON.parse(data)
            } else {
                swaggerJson = data
            }
            store.commit('currentSwaggerJson', swagger.fixSwaggerJson(swaggerJson))
        })

}

export default {initApi, setCurrentSwaggerJson}
