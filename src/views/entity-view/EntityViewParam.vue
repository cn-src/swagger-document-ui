<template lang="pug">
    li: h2#h2_2 请求参数
    li
        Table(
        :columns='paramBeanColumns'
        :data='httpEntity.paramBean.props'
        border size='small')
    EntityViewBean(:idTag="'param'" :beans='httpEntity.paramSubBeans')
</template>

<script>
    import CopiedTag from '@/components/CopiedTag'
    import EntityViewBean from './EntityViewBean'

    export default {
        name: 'EntityViewParam',
        components: {EntityViewBean},
        data() {
            return {
                paramBeanColumns: [
                    {title: '名称', key: 'name', maxWidth: 150, render: paramNameRender},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in', maxWidth: 100, render: paramInRender},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}],
            }
        },
        props: {
            httpEntity: {
                type: Object,
                required: true
            }
        }
    }

    function paramNameRender(h, params) {
        if (params.row.required) {
            return h('span', {}, [h(CopiedTag, {}, params.row.name), h('span', {
                style: 'color:red;'
            }, '*')])
        } else {
            return h(CopiedTag, {}, params.row.name)
        }
    }

    const inMapping = {
        'header': '#ED4015',
        'path': '#2D8CF0',
        'query': '#18BE6B',
        'body': '#FF9901',
    };

    function paramInRender(h, params) {
        const color = inMapping[params.row.in] || '#7a7a7a';
        return h('span', {
            style: `color:${color};font-weight:bold;`
        }, params.row.in)
    }
</script>

