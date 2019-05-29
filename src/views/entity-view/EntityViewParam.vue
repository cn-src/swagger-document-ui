<template lang="pug">
Table(
    :columns='paramBeanColumns'
    :data='httpEntity.paramBean.props'
    border size='small')
    template(slot-scope="{ row, index }" slot="name")
        CopiedTag {{row.name}}
        template(v-if="row.required === true")
            span(style="color:red;") *
</template>

<script>
import CopiedTag from '@/components/CopiedTag';

export default {
    name: 'EntityViewParam',
    components: { CopiedTag },
    data() {
        return {
            paramBeanColumns: [
                { title: '名称', key: 'name', maxWidth: 150, slot: 'name' },
                { title: '描述', key: 'description' },
                { title: '位置', key: 'in', maxWidth: 100, render: paramInRender },
                { title: '类型', key: 'type', maxWidth: 100 },
                { title: '格式', key: 'format', maxWidth: 150 },
                { title: '约束', key: 'constraint', maxWidth: 250 }
            ]
        };
    },
    props: {
        httpEntity: {
            type: Object,
            required: true
        }
    }
};

const inMapping = {
    header: '#ED4015',
    path: '#2D8CF0',
    query: '#18BE6B',
    body: '#FF9901'
};

function paramInRender(h, params) {
    const color = inMapping[params.row.in] || '#7a7a7a';
    return h(
        'span',
        {
            style: `color:${color};font-weight:bold;`
        },
        params.row.in
    );
}
</script>
