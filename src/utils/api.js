import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";

function initApi(path) {
    axios.get(path)
        .then(function (response) {
            console.debug(`[SDU] GET /swagger-resources : ${response.data}`);
            store.commit('swaggerResources', response.data);
            if (response.data && response.data[0] && response.data[0].url) {
                axios.get(response.data[0].url)
                    .then(function (swaggerResponse) {
                        const swaggerJson = swagger.fixSwaggerJson(JSON.parse(swaggerResponse.data));
                        console.debug(`[SDU] GET ${response.data[0].url} : ${swaggerJson}`);
                        store.commit('currentSwaggerJson', swaggerJson)
                    })
            }
        });
}

export default {
    initApi: initApi
}
