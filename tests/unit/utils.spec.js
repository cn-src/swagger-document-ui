import swagger from './swagger.json'
import {fixSwaggerJson, findSchema} from '@/util/utils'

test('fixSwaggerJson', () => {
    console.log(fixSwaggerJson(swagger));

    expect(3).toBe(3);
});

test('findSchema', () => {
    console.log(findSchema(swagger, '#/definitions/Page«ProjectData»'));
    expect(3).toBe(3);
});
