import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";

function initApi(path) {
    axios.get(path)
        .then(function (response) {
            console.debug(`[SDU] GET /swagger-resources : ${response.data}`)
            store.commit('swaggerResources', response.data)
            if (response.data) {
                axios.get(response.data[0].url)
                    .then(function (swaggerResponse) {
                        console.debug(`[SDU] GET ${response.data[0].url} : ${swaggerResponse.data}`)
                        store.commit('currentSwaggerJson', swagger.fixSwaggerJson(swaggerResponse.data))
                    })
            }
        });
}

export default {
    initApi: initApi
}
