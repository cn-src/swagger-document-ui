import axios from "axios";
import store from "@/store";
import swagger from "@/utils/swagger";

function initApi(path) {
    axios.get(path)
        .then(function (response) {
            store.commit('swaggerResources', response.data);
            if (response.data && response.data[0] && response.data[0].url) {
                setCurrentSwaggerJson(response.data[0].url);
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
