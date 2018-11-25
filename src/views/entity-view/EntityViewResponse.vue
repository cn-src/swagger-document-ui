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
