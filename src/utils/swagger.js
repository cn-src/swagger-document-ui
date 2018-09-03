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
    for (let beanRef in definitions) {
        if (!definitions.hasOwnProperty(beanRef)) continue;
        let bean = emptyBean();
        bean.beanRef = beanRef;

        if (definitions[beanRef].title) {
            bean.title = definitions[beanRef].title;
        }
        if (definitions[beanRef].type) {
            bean.type = definitions[beanRef].type;
        }
        for (let propName in definitions[beanRef].properties) {
            if (definitions[beanRef].properties.hasOwnProperty(propName)) {
                let prop = definitions[beanRef].properties[propName];
                let propBean = {};
                propBean.name = propName;
                propBean.description = prop.description;
                propBean.type = prop.type;
                propBean.format = prop.format;
                bean.props.push(toBean(propBean, prop))
            }
        }
        fixDefinitions[beanRef] = bean
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
        if (prop.hasRef && definitions.hasOwnProperty(prop.beanRef)) {
            const child = definitions[prop.beanRef];
            if (childBean.filter(fb => {
                return fb.beanRef === prop.beanRef
            }).length === 0) {
                childBean.push(child);
                recursiveAllBean(child, definitions, childBean)
            }
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
    return fixBean(tar, src)
}

/**
 * 根据源对象 schema 信息来统一标准化对象格式.
 *
 * @param tar
 * @param src
 * @returns {*}
 */
function fixBean(tar, src) {
    // ref
    let beanRef = '';
    if (src['$ref']) {
        beanRef = getBeanRef(src['$ref']);
    } else if (src.schema['$ref']) {
        beanRef = getBeanRef(src.schema['$ref']);
    } else if (src.schema['$ref']) {
        beanRef = getBeanRef(src.schema['$ref']);
    } else if (src.items['$ref']) {
        beanRef = getBeanRef(src.items['$ref']);
    }

    let type = "";
    if (src.type) {
        type = src.type
    } else if (src.schema.type) {
        type = src.schema.type
    } else if (src.items.type) {
        type = src.items.type
    }

    let format = "";
    if (src.format) {
        format = src.format
    } else if (src.schema.format) {
        format = src.schema.type
    } else if (src.items.format) {
        format = src.items.format
    }

    return {type, format, beanRef, hasRef: typeof beanRef === 'undefined' || beanRef === ''}
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
function getBeanRef(schemaRef) {
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
