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
        definitions: fixDefinitions(swaggerJson.definitions),
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
                        httpInfo.params = fixParams(methodInfo.parameters)
                        httpInfo.responses = methodInfo.responses
                        apiData.collection[collKey].push(httpInfo)
                    }
                }
            }
        }
    }
    return apiData
}

function fixDefinitions(definitions) {
    let fixDefinitions = {}
    for (let defName in definitions) {
        let fixObj = {}
        fixObj.title = definitions[defName].title
        fixObj.type = definitions[defName].type
        fixObj.props = []
        for (let propName in definitions[defName].properties) {
            let prop = definitions[defName].properties[propName]
            let fixProp = {}
            fixProp.name = propName
            fixProp.description = prop.description
            fixProp.type = prop.type
            fixProp.format = prop.format
            fixObj.props.push(fixIfSchema(fixProp, prop))
        }
        fixDefinitions[defName] = fixObj
    }
    return fixDefinitions
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

/**
 * 根据参数，尾递归找到所有的参数信息.
 */
export function findSubParams(fixObj, definitions, subFixObjs) {
    if (typeof(fixObj) === 'undefined' || fixObj === null
        || typeof(definitions) === 'undefined' || definitions === null) {
        return null
    }
    for (let prop of fixObj.props) {
        if (prop.hasRef) {
            const subObj = definitions[prop.schemaName];
            if (subFixObjs.filter(fb => {
                fb.schemaName === prop.schemaName
            }).length === 0) {
                subFixObjs.push(subObj)
            }
            findSubParams(subObj, definitions, subFixObjs)
        }
    }
}


/**
 * 标准化请求参数，便于渲染.
 *
 * @param parameters
 * @returns {*}
 */
function fixParams(parameters) {
    if (typeof(parameters) === 'undefined' || parameters === null) {
        return null
    }
    let fixObj = {}
    fixObj.title = ''
    fixObj.type = ''

    let fixObjProps = parameters.map(p => {
        let fixProp = {}
        fixProp.name = p.name
        fixProp.description = p.description
        fixProp.in = p.in
        fixProp.required = p.required
        fixProp.type = p.type
        fixProp.format = p.format
        return fixIfSchema(fixProp, p)
    });
    fixObj.props = fixObjProps

    return fixObj
}

/**
 * 根据源对象 schema 信息来统一标准化对象格式.
 *
 * @param tar
 * @param src
 * @returns {*}
 */
function fixIfSchema(tar, src) {
    if (src.schema && src.schema['$ref']) {
        tar.type = 'object'
        tar.format = getSchemaName(src.schema['$ref'])
        tar.hasRef = true
        tar.schemaName = getSchemaName(src.schema['$ref'])
    } else if (src.type === 'array' && src.items && src.items['$ref']) {
        tar.format = getSchemaName(src.items['$ref'])
        tar.schemaName = getSchemaName(src.items['$ref'])
        tar.hasRef = true
    } else {
        tar.hasRef = false
    }
    return tar
}

/**
 * 提取 schema ref 中的名称.
 *
 * @param schemaRef Schema Ref
 * @returns {string} name
 */
function getSchemaName(schemaRef) {
    return schemaRef.substring('#/definitions/'.length)
}
