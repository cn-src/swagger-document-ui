/**
 * 将原始的 swagger json 转换成易于渲染的格式.
 *
 * @param swaggerJson
 * @returns {{collection: {}}}
 */
export function fixSwaggerJson(swaggerJson) {
    let api = {
        collection: {}
    }

    for (let tag of swaggerJson.tags) {
        api.collection[tag.name] = []
    }

    let paths = swaggerJson.paths;
    for (let path in paths) {
        let pathInfo = paths[path]

        for (let method in pathInfo) {

            let methodInfo = pathInfo[method]
            for (let tag of methodInfo.tags) {

                for (let collKey in api.collection) {
                    if (tag === collKey) {
                        let collValue = {}
                        collValue.name = methodInfo.summary
                        collValue.path = path
                        collValue.method = method
                        api.collection[collKey].push(collValue)
                    }
                }
            }
        }
    }
    return api
}

