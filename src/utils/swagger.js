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
    data.collection = _.groupBy(httpEntities, 'tag');
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

function findAllBean(bean, beanMap) {
    const childBean = [];
    recursiveAllBean(bean, beanMap, childBean);
    return childBean
}

/**
 * 根据参数，尾递归找到所有的Schema信息.
 */
function recursiveAllBean(bean, beanMap, childBean) {
    if (!bean || !beanMap || !bean.props) {
        return emptyBean()
    }
    for (let prop of bean.props) {
        if (prop.hasRef && beanMap.hasOwnProperty(prop.schemaKey)) {
            const child = beanMap[prop.schemaKey];
            if (childBean.filter(fb => {
                return fb.schemaKey === prop.schemaKey
            }).length === 0) {
                childBean.push(child);
                recursiveAllBean(child, beanMap, childBean)
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
    bean.props = _.map(responses, (schema, status) => {
        return fixBean({
            status: status,
            description: schema.description
        }, schema, definitions);
    });
    return bean
}

function findHttpEntity(collection, id) {
    return _.flatMap(collection).find((v) => {
        return v.id === id
    })
}

function fixBean(bean, schema, definitions) {
    bean.type = fixType(schema, definitions);
    bean.format = fixFormat(schema, definitions);
    const schemaRef = getSchemaRef(schema);
    bean.hasRef = _.isString(schemaRef);
    bean.schemaKey = getSchemaKey(schemaRef);
    return bean
}

function fixType(schema, definitions) {

    if (schema.type === 'array' && schema.items && schema.items.type) {
        return 'array ^ ' + schema.items.type
    }

    if (schema.schema && schema.schema.type) {
        return schema.schema.type
    }

    const schemaRef = getSchemaRef(schema);
    if (schema.type === 'array' && schemaRef) {
        return 'array ^ ' + getSchemaType(schemaRef, definitions)
    }

    if (schemaRef) {
        return getSchemaType(schemaRef, definitions)
    }

    return schema.type
}

function fixFormat(schema, definitions) {

    const schemaRef = getSchemaRef(schema);
    if (schemaRef) {
        const schemaKey = getSchemaKey(schemaRef);
        const schemaTitle = getSchemaTitle(schemaKey, definitions);
        return schemaTitle ? schemaTitle : schemaKey;
    }

    return schema.format;
}

function getSchemaRef(schema) {
    return _.get(schema, 'schema.$ref') || _.get(schema, 'items.$ref');
}

function getSchemaKey(schemaRef) {
    const REF = '#/definitions/';
    if (schemaRef.startsWith(REF)) {
        return schemaRef.substring(REF.length)
    }
}

function getSchemaType(schemaKey, definitions) {
    if (definitions.hasOwnProperty(schemaKey)) {
        return definitions[schemaKey].type
    }
}

function getSchemaTitle(schemaKey, definitions) {
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
