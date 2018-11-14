import Fuse from 'fuse.js'
import store from '@/store'
import _ from 'lodash'

const content = _.flatMap(store.state.currentSwaggerJson.collection);
const options = {
    id: 'id',
    keys: [
        {name: 'tag'},
        {name: 'name'},
        {name: 'path'},
        {name: 'tagPinyin'},
        {name: 'namePinyin'},
    ]
};
const fuse = new Fuse(content, options);

function match(keyword) {
    return fuse.search(keyword)
}

export default {match}
