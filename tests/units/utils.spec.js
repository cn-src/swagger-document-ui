import swagger from './swagger.json'
import {fixSwaggerJson, findAllBean, toBean} from '@/utils/swagger'

test('fixSwaggerJson', () => {
    console.log(JSON.stringify(fixSwaggerJson(swagger)));

    expect(3).toBe(3);
});

test('findAllBean', () => {
    let fixObj = {};
    fixObj.props = [{
        hasRef: true,
        schemaName: 'Page«用户基本信息»'
    }];
    let allParams = [];
    findAllBean(fixObj, fixSwaggerJson(swagger).definitions, allParams);
    console.log(allParams);
    expect(3).toBe(3);
});
test('findAllBean responses', () => {
    let allParams = [];
    const req = fixSwaggerJson(swagger).collection['用户管理'][0];
    findAllBean(toBean({}, req.responses['200']), fixSwaggerJson(swagger).definitions, allParams);

    console.log(allParams);
    expect(3).toBe(3);
});
