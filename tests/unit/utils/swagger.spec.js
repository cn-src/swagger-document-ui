import swaggerJson from './swagger.json'
import swagger from '@/utils/swagger'

test('fixSwaggerJson', () => {
    const value = swagger.fixSwaggerJson(swaggerJson);
    // console.log(JSON.stringify(value));
    const entities = swagger.findSchemaEntities(value.collection['API注释'][0].parameters,value.definitions);
    console.log(JSON.stringify(entities))


});

