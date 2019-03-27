import swaggerJson from './swagger.json'
import swagger from '@/utils/swagger'
import postman from '@/utils/postman'

test('exportJson', () => {
    const sw = swagger.fixSwaggerJson(swaggerJson);
    const postmanJson = postman.exportJson(sw, {basePath: "http://localhost:8080/base"});
    console.log(postmanJson);
});

