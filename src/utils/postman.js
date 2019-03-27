import $ from './$'

function parseUrl(url, basePath) {
    const a = document.createElement('a');
    a.href = basePath;
    url.protocol = a.protocol.substring(0, a.protocol.length - 1);
    url.host = a.hostname.split('.');
    url.port = a.port;
    url.path = $.remove([...$.split(a.pathname, '/'), ...url.path], it => it !== '')
        .map(it => {
            if (it.match(/{.+}/)) {
                let pathVar = it.substring(1, it.length - 1);
                if (!url.variable) {
                    url.variable = []
                }
                url.variable.push({key: pathVar})
                return ':' + pathVar;
            } else {
                return it
            }
        })
}

function parseParam(url, paramBean) {
    paramBean.props.forEach(prop => {
        if (prop.in === 'query') {
            if (!url.query) {
                url.query = []
            }
            url.query.push({key: prop.name, disabled: !prop.required})
        }
    });
}

function exportJson(fixedSwaggerJson, config) {
    const postman = {info: {schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"}, item: []};
    postman.info.name = fixedSwaggerJson.info.title;

    $.forOwn(fixedSwaggerJson.collection, (httpEntities, tag) => {
        const tagItem = {
            name: tag,
            item: []
        };
        postman.item.push(tagItem);
        httpEntities.forEach(httpEntity => {
            const item = {
                name: httpEntity.name,
                request: {
                    method: httpEntity.method,
                    header: [],
                    url: {path: $.split(httpEntity.path, '/')}
                }
            };
            parseUrl(item.request.url, config.basePath);
            parseParam(item.request.url, httpEntity.paramBean);
            if (httpEntity.consumes && httpEntity.consumes.length > 0) {
                item.request.header.push({key: 'Content-Type', value: httpEntity.consumes[0]})
            }
            tagItem.item.push(item)
        });
    });
    return JSON.stringify(postman)
}

export default {exportJson}
