import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";
import _ from 'lodash';

function initApi(paths, vueObject) {
    if (!_.isArray(paths)) {
        paths = [paths]
    }
    const swaggerResources = [];
    axios.all(paths.map(url => axios.get(url).catch((res) => {
        console.error(res)
    })))
        .then(function (results) {
            _.flatMap(results, function (it) {
                return it ? it.data : []
            }).forEach(function (data) {
                swaggerResources.push(data)
            });
            store.commit('swaggerResources', swaggerResources);
            if (swaggerResources[0] && swaggerResources[0].url) {
                setCurrentSwaggerJson(swaggerResources[0].url, vueObject);
            }
        });
}

function setCurrentSwaggerJson(path, vueObject, onSuccess) {
    axios.get(path)
        .then(function (swaggerResponse) {
            const data = swaggerResponse.data;
            let swaggerJson;
            if (typeof data === "string") {
                try {
                    swaggerJson = JSON.parse(data)
                } catch (e) {
                    console.warn('[swagger-document-ui]: Parse swagger json error: ' + e);
                    vueObject.$Notice.error({
                        title: 'API 初始化错误',
                        desc: `path: ${path}\n${e.toLocaleString()}`,
                        duration: 0
                    });
                }
            } else {
                swaggerJson = data
            }
            onSuccess();
            store.commit('currentSwaggerJson', swagger.fixSwaggerJson(swaggerJson))
        })

}

export default {initApi, setCurrentSwaggerJson}
