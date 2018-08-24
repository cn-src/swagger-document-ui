/**
 * 将原始的 swagger json 转换成易于渲染的格式.
 *
 * 格式：
 * {
 *   "collection": {
 *     "用户管理": [
 *       {
 *         "index": 6,
 *         "name": "用户列表",
 *         "path": "/users",
 *         "method": "get"
 *       }
 *     ]
 *   }
 * }
 *
 * @param swaggerJson
 * @returns {{collection: {}}}
 */
export function fixSwaggerJson(swaggerJson) {
    let apiData = {
        definitions: Object.assign({}, swaggerJson.definitions),
        collection: {}
    }

    for (let tag of swaggerJson.tags) {
        apiData.collection[tag.name] = []
    }

    let paths = swaggerJson.paths;
    let index = 0
    for (let path in paths) {
        let pathInfo = paths[path]

        for (let method in pathInfo) {

            let methodInfo = pathInfo[method]
            for (let tag of methodInfo.tags) {

                for (let collKey in apiData.collection) {
                    if (tag === collKey) {
                        let httpInfo = {}
                        httpInfo.index = index++
                        httpInfo.name = methodInfo.summary
                        httpInfo.path = path
                        httpInfo.method = method.toUpperCase()
                        httpInfo.produces = methodInfo.produces
                        httpInfo.consumes = methodInfo.consumes
                        httpInfo.params = methodInfo.parameters
                        httpInfo.responses = methodInfo.responses
                        apiData.collection[collKey].push(httpInfo)
                    }
                }
            }
        }
    }
    return apiData
}

export function findHttpInfo(apiData, index) {
    for (const httpInfosKey in apiData.collection) {
        for (const httpInfo of apiData.collection[httpInfosKey]) {
            if (httpInfo.index === index) {
                return httpInfo
            }
        }
    }
}

export function findSchema(apiData, schemaRef) {
    const ref = schemaRef.substring('#/definitions/'.length)
    const definitions = apiData.definitions
    for (const key in definitions) {
        if (key === ref) {
            const properties = definitions[key].properties
            const propsArray = []
            for (const propName in properties) {
                properties[propName].name = propName
                propsArray.push(properties[propName])
            }
            const schema = {}
            Object.assign(schema, definitions[key])
            schema.properties = propsArray
            return schema
        }
    }
    return {}
}

