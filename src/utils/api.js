import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";
import _ from 'lodash';

function initApi(paths, vueObject) {
    configAxios(vueObject);
    if (!_.isArray(paths)) {
        paths = [paths]
    }
    const swaggerResources = [];
    axios.all(paths.map(url => axios.get(url).catch(res => {
        console.info(`[swagger-document-ui]: Can not get url '${url}', res: ` + res);
    })))
        .then(function (results) {
            _.flatMap(results, function (it) {
                return it ? it.data : []
            }).forEach(function (data) {
                swaggerResources.push(data)
            });

            store.commit('swaggerResources', swaggerResources);
            if (swaggerResources[0]) {
                const url = swaggerResources[0].url || swaggerResources[0].location;
                setCurrentSwaggerJson(url, vueObject);
            } else {
                console.warn('[swagger-document-ui]: Can not find url, swaggerResources: ' + swaggerResources);
                vueObject.$Notice.warning({
                    title: 'API 初始化错误',
                    desc: '未找到 API 地址',
                    duration: 10
                });
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
                        duration: 10
                    });
                }
            } else {
                swaggerJson = data
            }
            onSuccess && onSuccess();
            store.commit('currentSwaggerJson', swagger.fixSwaggerJson(swaggerJson))
        })

}

function configAxios(vueObject) {
    axios.defaults.baseURL = getBaseURL();
    axios.defaults.timeout = 10000;
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            const url = _.get(error, 'request.responseURL');
            if (url
                && (_.get(error, 'response.status') === 404)
                && (_.endsWith(url, '/swagger-resources.json') || _.endsWith(url, '/swagger-resources'))) {
                console.info(`[swagger-document-ui]: '${url}' 404`);
            } else {
                console.warn('[swagger-document-ui]: Ajax error: ' + error);
                vueObject.$Notice.error({
                    title: 'Error',
                    desc: error,
                    duration: 10
                });
            }

            return Promise.reject(_.get(error, 'response.data'))
        });
}

const getBaseURL = () => {
    const urlMatches = /(.*)\/swagger-ui.html.*/.exec(window.location.href);
    return urlMatches[1];
};
export default {initApi, setCurrentSwaggerJson}
