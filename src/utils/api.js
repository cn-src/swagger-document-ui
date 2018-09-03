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
            const swaggerJson = swagger.fixSwaggerJson(JSON.parse(swaggerResponse.data));
            store.commit('currentSwaggerJson', swaggerJson)
        })

}

export default {initApi, setCurrentSwaggerJson}
