import _ from 'lodash'

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
    swaggerJson.definitions = fixDefinitions(swaggerJson.definitions);
    swaggerJson.collection = {};
    swaggerJson.tags.forEach(tag => {
        swaggerJson.collection[tag.name] = []
    });
    let index = 0;
    for (const path in swaggerJson.paths) {

        if (!swaggerJson.paths.hasOwnProperty(path)) continue;
        let pathInfo = swaggerJson.paths[path];

        for (const methodType in pathInfo) {
            if (!pathInfo.hasOwnProperty(methodType)) continue;
            let methodInfo = pathInfo[methodType];

            for (const tag of methodInfo.tags) {
                for (let collectionKey in swaggerJson.collection) {
                    if (!swaggerJson.collection.hasOwnProperty(collectionKey)) continue;

                    if (tag === collectionKey) {
                        let httpEntity = {};
                        httpEntity.id = 'httpEntity' + index++;
                        httpEntity.tag = tag;
                        httpEntity.name = methodInfo.summary;
                        httpEntity.path = path;
                        httpEntity.method = methodType.toUpperCase();
                        httpEntity.produces = methodInfo.produces;
                        httpEntity.consumes = methodInfo.consumes;
                        httpEntity.parameters = fixParameters(methodInfo.parameters, swaggerJson.definitions);
                        httpEntity.responseBean = fixResponsesToBean(methodInfo.responses);
                        swaggerJson.collection[collectionKey].push(httpEntity)
                    }
                }
            }
        }
    }

    // delete swaggerJson.paths;
    return swaggerJson
}

function fixDefinitions(definitions) {
    for (const schemaKey in definitions) {
        if (!definitions.hasOwnProperty(schemaKey)) continue;
        const definition = definitions[schemaKey];
        for (let propKey in definition.properties) {
            if (definition.properties.hasOwnProperty(propKey)) {
                let prop = definition.properties[propKey];
                prop.fixType = fixType(prop, definitions);
                prop.fixFormat = fixFormat(prop, definitions);
            }
        }
    }
    return definitions
}

function findSchemaEntities(schema, definitions) {
    const schemaEntities = [];
    if (Object.prototype.toString.call(schema) !== '[object Array]') {
        schema = [schema]
    }
    for (const s of schema) {
        let schemaEntity = getSchemaEntity(s, definitions);
        if (schemaEntity && schemaEntity.schema) {
            schemaEntities.push(schemaEntity);
            recursiveChildSchemaEntities(schemaEntity, definitions, schemaEntities)
        }
    }
    return schemaEntities
}

function recursiveChildSchemaEntities(schemaEntity, definitions, schemaEntities) {
    if (!definitions || !schemaEntity || !schemaEntity.schema || !schemaEntity.schema.properties) {
        return
    }
    const props = schemaEntity.schema.properties;
    for (const propKey in props) {
        if (!props.hasOwnProperty(propKey)) continue;

        const schemaEntity = getSchemaEntity(props[propKey],definitions);
        if (schemaEntity && schemaEntity.schema && schemaEntities.filter(cs => {
            return cs.key === schemaEntity.key
        }).length === 0) {
            schemaEntities.push(schemaEntity);
            recursiveChildSchemaEntities(schemaEntity, definitions, schemaEntities)
        }
    }
}


/**
 * 标准化请求参数，便于渲染.
 */
function fixParameters(parameters, definitions) {
    if (!parameters) {
        return []
    }
    return parameters.map(p => {
        p.fixType = fixType(p, definitions);
        p.fixFormat = fixFormat(p, definitions);
        return p
    });

}

function fixType(schema, definitions) {

    if (schema.type === 'array' && schema.items && schema.items.type) {
        return 'array ^ ' + schema.items.type
    }
    if (schema.type === 'array' && schema.items && schema.items['$ref']) {
        return getSchemaType(schema.items['$ref'], definitions)
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

    if (schema.schema && schema.schema['$ref']) {
        const schemaTitle = getSchemaTitle(schema.schema['$ref'], definitions);
        if (!schemaTitle) {
            return getSchemaKey(schema.schema['$ref'])
        }
        return schemaTitle;
    }

    if (schema.items && schema.items['$ref']) {
        const schemaTitle = getSchemaTitle(schema.items['$ref'], definitions);
        if (!schemaTitle) {
            return getSchemaKey(schema.items['$ref'])
        }
        return schemaTitle;
    }
    return schema.format;
}

function fixResponsesToBean(responses) {
    let bean = emptyBean();
    for (let resKey in responses) {
        if (!responses.hasOwnProperty(resKey)) continue;
        let propBean = {};

        propBean.status = resKey;
        propBean.description = responses[resKey].description;
        // propBean = toBean(propBean, responses[resKey]);
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

/**
 * 提取 schema ref 中的名称.
 *
 * @param schemaRef Schema Ref
 * @returns {string} name
 */
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

function getSchemaEntity(schema, definitions) {
    const ref = schema['$ref'] || _.get(schema, 'schema.$ref') || _.get(schema, 'items.$ref');
    if (!ref) return null;

    const schemaKey = getSchemaKey(ref);
    return {
        key: schemaKey,
        schema: definitions[schemaKey]
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
    findSchemaEntities: findSchemaEntities,
    findHttpEntity: findHttpEntity,
}
