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
                    paramBean: fixParamsToBean(methodInfo.parameters, swaggerJson.definitions),
                    responseBean: fixResponsesToBean(methodInfo.responses, swaggerJson.definitions)
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
                propBean.type = fixType(prop, definitions);
                propBean.format = fixFormat(prop, definitions);
                bean.props.push(propBean)
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
 */
function fixParamsToBean(parameters, definitions) {
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
        propBean.type = fixType(p, definitions);
        propBean.format = fixFormat(p, definitions);
        return propBean
    });

    return bean
}

function fixResponsesToBean(responses, definitions) {
    let bean = emptyBean();
    for (let resKey in responses) {
        if (!responses.hasOwnProperty(resKey)) continue;
        let propBean = {};

        propBean.status = resKey;
        propBean.description = responses[resKey].description;
        propBean = fixType(responses[resKey], definitions);
        propBean = fixFormat(responses[resKey], definitions);
        bean.props.push(propBean)
    }

    return bean
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

function fixType(schema, definitions) {

    if (schema.type === 'array' && schema.items && schema.items.type) {
        return 'array ^ ' + schema.items.type
    }
    if (schema.type === 'array' && schema.items && schema.items['$ref']) {
        return 'array ^ ' + getSchemaType(schema.items['$ref'], definitions)
    }

    if (schema.schema && schema.schema.type) {
        return schema.schema.type
    }
    if (schema.schema && schema.schema['$ref']) {
        return getSchemaType(schema.schema['$ref'], definitions)
    }
    return schema.type
}

function fixFormat(schema, definitions) {

    const ref = _.get(schema, 'schema.$ref') || _.get(schema, 'items.$ref');
    if (ref) {
        const schemaTitle = getSchemaTitle(ref, definitions);
        return schemaTitle ? schemaTitle : getSchemaKey(ref);
    }

    return schema.format;
}

function getSchemaKey(schemaRef) {
    const REF = '#/definitions/';
    if (schemaRef.startsWith(REF)) {
        return schemaRef.substring(REF.length)
    }
    return ''
}

function getSchemaType(schemaRef, definitions) {
    const schemaKey = getSchemaKey(schemaRef);
    if (definitions.hasOwnProperty(schemaKey)) {
        return definitions[schemaKey].type
    }
}

function getSchemaTitle(schemaRef, definitions) {
    const schemaKey = getSchemaKey(schemaRef);
    if (definitions.hasOwnProperty(schemaKey)) {
        return definitions[schemaKey].title
    }
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
