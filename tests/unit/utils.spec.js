import swagger from './swagger.json'
import {fixSwaggerJson} from '@/util/utils'

test('findByLevel', () => {
    console.log(fixSwaggerJson(swagger));

    expect(3).toBe(3);
});
