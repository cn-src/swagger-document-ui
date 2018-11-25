import CopiedTag from '@/components/CopiedTag'
import $ from '@/utils/$'

export function copiedTagRender(h, params) {
    let subNode = params.row.name || params.row.k2;
    if ($.isArray(subNode)) {
        subNode = subNode.map(it => {
            return h(CopiedTag, {
                style: 'margin-right:10px'
            }, it)
        });
        return h('span', {}, subNode)
    }
    return h(CopiedTag, {}, subNode);
}

export const beanColumns = [
    {title: '名称', key: 'name', maxWidth: 150, render: copiedTagRender},
    {title: '描述', key: 'description'},
    {title: '类型', key: 'type', maxWidth: 100},
    {title: '格式', key: 'format', maxWidth: 150},
    {title: '约束', key: 'constraint', maxWidth: 250}];
