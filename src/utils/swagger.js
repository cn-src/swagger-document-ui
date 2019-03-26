/**
 * 将 swagger json 转成渲染所需的结构，并添加部分字段的拼音。
 */
import $ from '@/utils/$'
import pinyin from 'pinyin'

function fixSwaggerJson(swaggerJson) {
    const info = {license: {}};
    Object.assign(info, swaggerJson.info);
    let data = {
        info: info,
        beanMap: fixBeanMap(swaggerJson.definitions),
        definitions: swaggerJson.definitions,
    };
    data.info.host = swaggerJson.host;
    data.info.basePath = swaggerJson.basePath;
    data.info.schemes = swaggerJson.schemes;

    let index = 0;
    const httpEntities = $.flatMap(swaggerJson.paths, (pathInfo, path) => {
        return $.flatMap(pathInfo, (methodInfo, methodType) => {
            return $.map(methodInfo.tags, (tag) => {
                return fixHttpEntity({
                    id: 'httpEntity' + index++,
                    tag: tag,
                    name: methodInfo.summary,
                    path: path,
                    method: methodType.toUpperCase(),
                    deprecated: methodInfo.deprecated,
                    produces: methodInfo.produces,
                    consumes: methodInfo.consumes,
                    description: methodInfo.description,
                    paramBean: fixParamsToBean(methodInfo.parameters, swaggerJson.definitions),
                    responseBean: fixResponsesToBean(methodInfo.responses, swaggerJson.definitions)
                }, data.beanMap)
            })
        })
    });
    data.collection = $.groupBy(httpEntities, 'tag');
    return data
}

function toPinyin(text) {
    const pyArray = pinyin(text, {style: pinyin.STYLE_NORMAL});
    return $.join($.flatMap(pyArray), ' ');
}

function fixHttpEntity(httpEntity, beanMap) {
    httpEntity.tagPinyin = toPinyin(httpEntity.tag);
    httpEntity.namePinyin = toPinyin(httpEntity.name);
    httpEntity.paramSubBeans = findAllBean(httpEntity.paramBean, beanMap);
    httpEntity.responseSubBeans = findAllBean(httpEntity.responseBean, beanMap);
    return httpEntity
}

function fixBeanMap(definitions) {
    const beanMap = {};
    $.forOwn(definitions, (schema, schemaKey) => {
        let bean = emptyBean();
        bean.title = schema.title || schemaKey;
        bean.type = schema.type;
        bean.props = $.map(schema.properties, (prop, propName) => {
            return fixBean({
                name: propName,
                description: prop.description
            }, prop, definitions);
        });
        bean.schemaKey = schemaKey;
        beanMap[schemaKey] = bean
    });
    return beanMap
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
            if (child && childBean.filter(fb => {
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

    bean.props = $.sortBy(parameters, 'in').map(schema => {
        const propBean = {};
        propBean.name = schema.name;
        propBean.description = schema.description;
        propBean.in = schema.in;
        propBean.required = schema.required;
        return fixBean(propBean, schema, definitions)
    });

    return bean
}

function fixResponsesToBean(responses, definitions) {
    let bean = emptyBean();
    bean.props = $.map(responses, (schema, status) => {
        return fixBean({
            status: status,
            description: schema.description
        }, schema, definitions);
    });
    return bean
}

function findHttpEntity(collection, id) {
    return $.flatMap(collection).find((v) => {
        return v.id === id
    })
}

function fixBean(bean, schema, definitions) {
    bean.type = fixType(schema, definitions);
    bean.format = fixFormat(schema, definitions);
    const schemaRef = getSchemaRef(schema);
    bean.hasRef = $.isString(schemaRef);
    bean.schemaKey = getSchemaKey(schemaRef);
    bean.constraint = '';
    if (schema.enum) {
        bean.constraint += ' enum: ' + $.join(schema.enum, ', ')
    }
    if (schema.minLength) {
        bean.constraint += ' minLength: ' + schema.minLength
    }
    if (schema.maxLength) {
        bean.constraint += ' minLength: ' + schema.maxLength
    }
    if (schema.pattern) {
        bean.constraint += ' pattern: ' + schema.pattern
    }
    return bean;
}

function fixType(schema, definitions) {

    if (schema.type === 'array' && schema.items && schema.items.type) {
        return '[' + schema.items.type + ']'
    }

    const schemaKey = getSchemaKey(getSchemaRef(schema));
    if (schema.type === 'array' && schemaKey) {
        return '[' + getSchemaType(schemaKey, definitions) + ']'
    }
    if ($.get(schema, 'schema.type') === 'array' && schemaKey) {
        return '[' + getSchemaType(schemaKey, definitions) + ']'
    }

    if (schemaKey) {
        return getSchemaType(schemaKey, definitions)
    }

    if ($.get(schema, 'schema.type')) {
        return schema.schema.type
    }
    return schema.type
}

function fixFormat(schema, definitions) {

    const format = $.get(schema, 'schema.items.format');
    if (format) {
        return format
    }

    const schemaRef = getSchemaRef(schema);
    if (schemaRef) {
        const schemaKey = getSchemaKey(schemaRef);
        const schemaTitle = getSchemaTitle(schemaKey, definitions);
        return schemaTitle ? schemaTitle : schemaKey;
    }

    return schema.format;
}

function getSchemaRef(schema) {
    return $.get(schema, '$ref')
        || $.get(schema, 'schema.$ref')
        || $.get(schema, 'items.$ref')
        || $.get(schema, 'schema.items.$ref');
}

function getSchemaKey(schemaRef) {
    const REF = '#/definitions/';
    if (schemaRef && schemaRef.startsWith(REF)) {
        return schemaRef.substring(REF.length)
    }
}

function getSchemaType(schemaKey, definitions) {
    if (definitions.hasOwnProperty(schemaKey)) {
        return definitions[schemaKey].type
    }
    // 泛型参数
    if ($.endsWith(schemaKey, '«object»')) {
        const sk = schemaKey.substring(0, schemaKey.length - '«object»'.length);
        return $.get(definitions, [sk, 'type'])
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
    findHttpEntity: findHttpEntity,
}
