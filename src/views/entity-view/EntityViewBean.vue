<template lang="pug">
    template(v-for='(child, index) of beans')
        li(:key='child.schemaKey')
            ul
                li
                    h3(:id="`h3_${idTag}_${index}`")
                        | 类型
                        Icon(type='md-arrow-dropright' size='20')
                        | {{ child.title }}
                li
                    Table(:columns='beanColumns' :data="child.props" border size="small")

</template>

<script>
    import CopiedTag from '@/components/CopiedTag'
    import $ from '@/utils/$'

    export default {
        name: 'EntityViewBean',
        data() {
            return {
                beanColumns: [
                    {title: '名称', key: 'name', maxWidth: 150, render: copiedTagRender},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}]
            }
        },
        props: {
            idTag: {
                type: String,
                required: true
            },
            beans: {
                type: Array,
                required: true
            }
        }
    }

    function copiedTagRender(h, params) {
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
</script>

<style scoped>

</style>
