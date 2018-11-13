import pinyin from 'pinyin'
import Fuse from 'fuse.js'
import _ from 'lodash'

const content = [];
const options = {
    keys: ['text', 'pinyinStr']
};
const fuse = new Fuse(content, options);

function append(id, text) {
    const pyArray = pinyin(text, {style: pinyin.STYLE_NORMAL});
    const pinyinStr = _.join(_.flatMap(pyArray), ' ');
    content.push({
        id,
        text,
        pinyinStr
    })
}

function match(keyword) {
    return fuse.search(keyword)
}

export default {append, match}
