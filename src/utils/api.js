import axios from "axios";
import store from "@/store";

function initApi(path) {
    axios.get(path)
        .then(function (response) {
            console.debug(`[SDU] GET /swagger-resources : ${response.data}`)
            store.commit('swaggerResources', response.data)
        });
}

export default {
    initApi: initApi
}
