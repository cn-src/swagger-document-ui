import swagger from './swagger.json'
import {fixSwaggerJson, findSchema, findSubParams} from '@/util/utils'

test('fixSwaggerJson', () => {
    console.log(JSON.stringify(fixSwaggerJson(swagger)));

    expect(3).toBe(3);
});

test('findSchema', () => {
    console.log(findSchema(swagger, '#/definitions/Page«ProjectData»'));
    expect(3).toBe(3);
});

test('findAllParams', () => {
    let fixObj = {}
    fixObj.props = [{
        hasRef: true,
        schemaName: 'Page«用户基本信息»'
    }]
    let allParams = []
    findSubParams(fixObj, fixSwaggerJson(swagger).definitions, allParams)
    console.log(allParams);
    expect(3).toBe(3);
});
