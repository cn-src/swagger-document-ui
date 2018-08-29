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
 */
export function fixSwaggerJson(swaggerJson) {
    let data = {
        info: swaggerJson.info,
        definitions: fixDefinitions(swaggerJson.definitions),
        collection: {}
    };

    for (let tag of swaggerJson.tags) {
        data.collection[tag.name] = []
    }

    let paths = swaggerJson.paths;
    let index = 0;
    for (let path in paths) {
        if (!paths.hasOwnProperty(path)) continue;
        let pathInfo = paths[path];

        for (let method in pathInfo) {
            if (!pathInfo.hasOwnProperty(method)) continue;
            let methodInfo = pathInfo[method];

            for (let tag of methodInfo.tags) {

                for (let tagName in data.collection) {
                    if (!data.collection.hasOwnProperty(tagName)) continue;

                    if (tag === tagName) {
                        let httpEntity = {};
                        httpEntity.id = 'httpEntity' + index++;
                        httpEntity.name = methodInfo.summary;
                        httpEntity.path = path;
                        httpEntity.method = method.toUpperCase();
                        httpEntity.produces = methodInfo.produces;
                        httpEntity.consumes = methodInfo.consumes;
                        httpEntity.params = fixParams(methodInfo.parameters);
                        httpEntity.responses = fixResponses(methodInfo.responses);
                        data.collection[tagName].push(httpEntity)
                    }
                }
            }
        }
    }
    return data
}

function fixDefinitions(definitions) {
    let fixDefinitions = {};
    for (let defName in definitions) {
        if (!definitions.hasOwnProperty(defName)) continue;
        let fixObj = emptyBean();

        if (definitions[defName].title) {
            fixObj.title = definitions[defName].title;
        }
        if (definitions[defName].type) {
            fixObj.type = definitions[defName].type;
        }
        for (let propName in definitions[defName].properties) {
            if (definitions[defName].properties.hasOwnProperty(propName)) {
                let prop = definitions[defName].properties[propName];
                let fixProp = {};
                fixProp.name = propName;
                fixProp.description = prop.description;
                fixProp.type = prop.type;
                fixProp.format = prop.format;
                fixObj.props.push(toBean(fixProp, prop))
            }
        }
        fixDefinitions[defName] = fixObj
    }
    return fixDefinitions
}

/**
 * 根据参数，尾递归找到所有的Schema信息.
 */
export function findAllSchema(bean, definitions, childBean) {
    if (!bean || !definitions || !bean.props) {
        return emptyBean()
    }
    for (let prop of bean.props) {
        if (prop.hasRef && definitions.hasOwnProperty(prop.schemaName)) {
            const subObj = definitions[prop.schemaName];
            if (childBean.filter(fb => {
                return fb.schemaName === prop.schemaName
            }).length === 0) {
                childBean.push(subObj)
            }
            findAllSchema(subObj, definitions, childBean)
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
    if (!parameters) {
        return emptyBean()
    }
    let fixObj = emptyBean();

    fixObj.props = parameters.map(p => {
        let fixProp = {};
        fixProp.name = p.name;
        fixProp.description = p.description;
        fixProp.in = p.in;
        fixProp.required = p.required;
        fixProp.type = p.type;
        fixProp.format = p.format;
        return toBean(fixProp, p)
    });

    return fixObj
}

function fixResponses(responses) {
    let fixObj = emptyBean();
    for (let resKey in responses) {
        if (!responses.hasOwnProperty(resKey)) continue;
        let fixProp = {};

        fixProp.status = resKey;
        fixProp.description = responses[resKey].description;
        fixProp = toBean(fixProp, responses[resKey]);
        fixObj.props.push(fixProp)
    }

    return fixObj
}

export function toBean(tar, src) {
    return fixIfSchema(tar, src)
}

/**
 * 根据源对象 schema 信息来统一标准化对象格式.
 *
 * @param tar
 * @param src
 * @returns {*}
 */
function fixIfSchema(tar, src) {
    const schemaIsArray = src.schema && src.schema.type === 'array';
    // ref
    if (src.schema && src.schema['$ref']) {
        let schemaName = getSchemaName(src.schema['$ref']);
        tar.type = schemaIsArray ? 'array' : schemaName;
        tar.format = schemaIsArray ? '[ ' + schemaName + ']' : schemaName;
        tar.hasRef = true;
        tar.schemaName = schemaName;
        return tar
    }
    if (src.type === 'array' && src.items && src.items['$ref']) {
        const schemaName = getSchemaName(src.items['$ref']);
        tar.format = schemaName;
        tar.schemaName = schemaName;
        tar.hasRef = true;
        return tar
    }

    // items type
    if (src.schema && src.schema.items && src.schema.items.type) {
        tar.type = schemaIsArray ? 'array' : src.schema.items.type;
        if (src.schema.items.format) {
            let format = src.schema.items.type + '#' + src.schema.items.format;
            tar.format = schemaIsArray ? '[ ' + format + ' ]' : format
        } else {
            tar.format = schemaIsArray ? '[ ' + src.schema.items.type + ' ]' : src.schema.items.type;
        }
    }
    tar.hasRef = false;
    return tar
}

export function findHttpEntity(apiData, id) {
    for (const tagName in apiData.collection) {
        if (!apiData.collection.hasOwnProperty(tagName)) continue;

        for (const httpEntity of apiData.collection[tagName]) {
            if (httpEntity.id === id) {
                return httpEntity
            }
        }
    }
}

const colorsMap = {
    'GET': 'success',
    'POST': 'warning',
    'PUT': 'primary',
    'DELETE': 'error'
};

export function methodColumnRender(h, params) {
    if (params.index === 0) {

        const colorFromMap = colorsMap[params.row.k1];
        let color = colorFromMap ? colorFromMap : 'default';

        return h('Tag', {
            props: {
                color: color
            }
        }, params.row.k1,);
    } else {
        return h('span', params.row.k1)
    }
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

function emptyBean() {
    let empty = {};
    empty.title = '';
    empty.type = '';
    empty.props = [];
    return empty
}
