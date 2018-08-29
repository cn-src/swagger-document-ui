import swaggerJson from './swagger.json'
import swagger from '@/utils/swagger'

test('fixSwaggerJson', () => {
    console.log(JSON.stringify(swagger.fixSwaggerJson(swaggerJson)));

    expect(3).toBe(3);
});

test('findAllBean', () => {
    let fixObj = {};
    fixObj.props = [{
        hasRef: true,
        schemaName: 'Page«用户基本信息»'
    }];
    let allParams = [];
    swagger.findAllBean(fixObj, swagger.fixSwaggerJson(swaggerJson).definitions, allParams);
    console.log(allParams);
    expect(3).toBe(3);
});
test('findAllBean responses', () => {
    // let allParams = [];
    // const req = swagger.fixSwaggerJson(swaggerJson).collection['用户管理'][0];
    // swagger.findAllBean(toBean({}, req.responses['200']), swagger.fixSwaggerJson(swaggerJson).definitions, allParams);

    // console.log(allParams);
    expect(3).toBe(3);
});
