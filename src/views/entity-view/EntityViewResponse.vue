<template lang="pug">
    li: h2#h2_3 响应信息
    li
        Table(
        :columns='responseBeanColumns'
        :data='httpEntity.responseBean.props'
        border size='small')
    EntityViewBean(:idTag="'response'" :bean='httpEntity.responseSubBeans')
</template>

<script>
    import EntityViewBean from './EntityViewBean'

    export default {
        name: "EntityViewResponse",
        components: {EntityViewBean},
        data() {
            return {
                responseBeanColumns: [
                    {title: '状态', key: 'status', maxWidth: 62},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}]
            }
        },
        props: {
            httpEntity: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
