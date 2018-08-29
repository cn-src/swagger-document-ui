import swagger from './swagger.json'
import {fixSwaggerJson, findAllSchema, toBean} from '@/utils/swagger'

test('fixSwaggerJson', () => {
    console.log(JSON.stringify(fixSwaggerJson(swagger)));

    expect(3).toBe(3);
});

test('findAllSchema', () => {
    let fixObj = {};
    fixObj.props = [{
        hasRef: true,
        schemaName: 'Page«用户基本信息»'
    }];
    let allParams = [];
    findAllSchema(fixObj, fixSwaggerJson(swagger).definitions, allParams);
    console.log(allParams);
    expect(3).toBe(3);
});
test('findAllSchema responses', () => {
    let allParams = [];
    const req = fixSwaggerJson(swagger).collection['用户管理'][0];
    findAllSchema(toBean({}, req.responses['200']), fixSwaggerJson(swagger).definitions, allParams);

    console.log(allParams);
    expect(3).toBe(3);
});
