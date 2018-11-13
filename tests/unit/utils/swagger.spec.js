import swaggerJson from './swagger.json'
import swagger from '@/utils/swagger'

test('fixSwaggerJson', () => {
    const value = swagger.fixSwaggerJson(swaggerJson);
    console.log(JSON.stringify(value));
});

