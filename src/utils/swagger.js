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

function fixSwaggerJson(swaggerJson) {
    const info = {license: {}};
    Object.assign(info, swaggerJson.info);
    let data = {
        info: info,
        beanMap: fixDefinitions(swaggerJson.definitions),
        collection: {}
    };
    data.info.host = swaggerJson.host;
    data.info.basePath = swaggerJson.basePath;
    data.info.schemes = swaggerJson.schemes;

    swaggerJson.tags.forEach(tag => {
        data.collection[tag.name] = []
    });

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
                        httpEntity.tag = tag;
                        httpEntity.name = methodInfo.summary;
                        httpEntity.path = path;
                        httpEntity.method = method.toUpperCase();
                        httpEntity.produces = methodInfo.produces;
                        httpEntity.consumes = methodInfo.consumes;
                        httpEntity.paramBean = fixParamsToBean(methodInfo.parameters);
                        httpEntity.responseBean = fixResponsesToBean(methodInfo.responses);
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
    for (let schemaName in definitions) {
        if (!definitions.hasOwnProperty(schemaName)) continue;
        let bean = emptyBean();
        bean.schemaName = schemaName;

        if (definitions[schemaName].title) {
            bean.title = definitions[schemaName].title;
        }
        if (definitions[schemaName].type) {
            bean.type = definitions[schemaName].type;
        }
        for (let propName in definitions[schemaName].properties) {
            if (definitions[schemaName].properties.hasOwnProperty(propName)) {
                let prop = definitions[schemaName].properties[propName];
                let propBean = {};
                propBean.name = propName;
                propBean.description = prop.description;
                propBean.type = prop.type;
                propBean.format = prop.format;
                bean.props.push(toBean(propBean, prop))
            }
        }
        fixDefinitions[schemaName] = bean
    }
    return fixDefinitions
}

function findAllBean(bean, definitions) {
    const childBean = [];
    recursiveAllBean(bean, definitions, childBean);
    return childBean
}

/**
 * 根据参数，尾递归找到所有的Schema信息.
 */
function recursiveAllBean(bean, definitions, childBean) {
    if (!bean || !definitions || !bean.props) {
        return emptyBean()
    }
    for (let prop of bean.props) {
        if (prop.hasRef && definitions.hasOwnProperty(prop.schemaName)) {
            const child = definitions[prop.schemaName];
            if (childBean.filter(fb => {
                return fb.schemaName === prop.schemaName
            }).length === 0) {
                childBean.push(child)
            }
            recursiveAllBean(child, definitions, childBean)
        }
    }
}


/**
 * 标准化请求参数，便于渲染.
 *
 * @param parameters
 * @returns {*}
 */
function fixParamsToBean(parameters) {
    if (!parameters) {
        return emptyBean()
    }
    let bean = emptyBean();

    bean.props = parameters.map(p => {
        const propBean = {};
        propBean.name = p.name;
        propBean.description = p.description;
        propBean.in = p.in;
        propBean.required = p.required;
        propBean.type = p.type;
        propBean.format = p.format;
        return toBean(propBean, p)
    });

    return bean
}

function fixResponsesToBean(responses) {
    let bean = emptyBean();
    for (let resKey in responses) {
        if (!responses.hasOwnProperty(resKey)) continue;
        let propBean = {};

        propBean.status = resKey;
        propBean.description = responses[resKey].description;
        propBean = toBean(propBean, responses[resKey]);
        bean.props.push(propBean)
    }

    return bean
}

function toBean(tar, src) {
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
    // schema type
    if (src.schema && src.schema.type) {
        tar.type = src.schema.type;
        tar.hasRef = false;
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

function findHttpEntity(apiData, id) {
    for (const tagName in apiData.collection) {
        if (!apiData.collection.hasOwnProperty(tagName)) continue;

        for (const httpEntity of apiData.collection[tagName]) {
            if (httpEntity.id === id) {
                return httpEntity
            }
        }
    }
}

/**
 * 提取 schema ref 中的名称.
 *
 * @param schemaRef Schema Ref
 * @returns {string} name
 */
function getSchemaName(schemaRef) {
    const REF = '#/definitions/';
    if (schemaRef.startsWith(REF)) {
        return schemaRef.substring(REF.length)
    }
    return ''
}

function emptyBean() {
    return {
        title: '',
        type: '',
        props: []
    }
}

export default {
    fixSwaggerJson: fixSwaggerJson,
    findAllBean: findAllBean,
    findHttpEntity: findHttpEntity,
}
