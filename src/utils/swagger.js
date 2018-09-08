import _ from "lodash";

function fixSwaggerJson(swaggerJson) {
    const info = {license: {}};
    Object.assign(info, swaggerJson.info);
    let data = {
        info: info,
        beanMap: fixDefinitions(swaggerJson.definitions),
        definitions: swaggerJson.definitions,
    };
    data.info.host = swaggerJson.host;
    data.info.basePath = swaggerJson.basePath;
    data.info.schemes = swaggerJson.schemes;

    let index = 0;
    const httpEntities = _.flatMap(swaggerJson.paths, (pathInfo, path) => {
        return _.flatMap(pathInfo, (methodInfo, methodType) => {
            return _.map(methodInfo.tags, (tag) => {
                return {
                    id: 'httpEntity' + index++,
                    tag: tag,
                    name: methodInfo.summary,
                    path: path,
                    method: methodType.toUpperCase(),
                    produces: methodInfo.produces,
                    consumes: methodInfo.consumes,
                    paramBean: fixParamsToBean(methodInfo.parameters),
                    responseBean: fixResponsesToBean(methodInfo.responses)
                }
            })
        })
    });
    swaggerJson.collection = _.groupBy(httpEntities, 'tag');
    delete swaggerJson.paths;
    return data
}

function fixDefinitions(definitions) {
    let fixDefinitions = {};
    for (let beanRef in definitions) {
        if (!definitions.hasOwnProperty(beanRef)) continue;
        let bean = emptyBean();
        bean.beanRef = beanRef;
        const definition = definitions[beanRef];

        if (definition.title) {
            bean.title = definition.title;
        }
        if (definition.type) {
            bean.type = definition.type;
        }
        for (let propName in definition.properties) {
            if (definition.properties.hasOwnProperty(propName)) {
                let prop = definition.properties[propName];
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
    if (src.hasOwnProperty('$ref')) {
        beanRef = getBeanRef(src['$ref']);
    } else if (src.schema && src.schema.hasOwnProperty('$ref')) {
        beanRef = getBeanRef(src.schema['$ref']);
    } else if (src.items && src.items.hasOwnProperty('$ref')) {
        beanRef = getBeanRef(src.items['$ref']);
    }

    let type = '';
    if (src.type) {
        type = src.type
    } else if (src.schema && src.schema.type) {
        type = src.schema.type
    } else if (src.items && src.items.type) {
        type = src.items.type
    } else if (type === '' && beanRef !== '') {
        type = 'object'
    }

    let format = "";
    if (src.format) {
        format = src.format
    } else if (src.schema && src.schema.format) {
        format = src.schema.type
    } else if (src.items && src.items.format) {
        format = src.items.format
    } else if (format === '' && beanRef !== '') {
        format = beanRef
    } else if (type === 'array' && src.items) {
        if (src.items.type) {
            format = src.items.type
        } else if (src.items.hasOwnProperty('$ref')) {
            format = beanRef
        }
    } else if (src.enum) {
        format = src.enum
    }

    tar.type = tar.type || type;
    tar.format = tar.format || format;
    tar.beanRef = beanRef;
    tar.hasRef = beanRef !== '';
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
