import swagger from './swagger.json'
import {fixSwaggerJson, findAllSchema} from '@/util/utils'

test('fixSwaggerJson', () => {
    console.log(JSON.stringify(fixSwaggerJson(swagger)));

    expect(3).toBe(3);
});

test('findAllSchema', () => {
    let fixObj = {}
    fixObj.props = [{
        hasRef: true,
        schemaName: 'Page«用户基本信息»'
    }]
    let allParams = []
    findAllSchema(fixObj, fixSwaggerJson(swagger).definitions, allParams)
    console.log(allParams);
    expect(3).toBe(3);
});
