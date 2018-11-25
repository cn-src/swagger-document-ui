import CopiedTag from '@/components/CopiedTag'
import $ from '@/utils/$'

export default function copiedTagRender(h, params) {
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
