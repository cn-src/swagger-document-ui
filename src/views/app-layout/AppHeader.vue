<template lang="pug">
    Header(:style="{padding: 0,position: 'fixed', width: '100%',zIndex:999}")
        Menu(mode='horizontal' theme='dark' @on-select='headerAction')
            MenuItem(name='1')
                Icon(@click.native='collapsedSider' type='md-menu' size='24')
            MenuItem(name='swaggerResources')
                | {{ infoTitle }}&nbsp;
                Icon(type='md-repeat')
            div(style='float: right;margin-right: 20px;position: relative;')
                SearchInput
        SwaggerResources(ref='swaggerResources')
</template>

<script>
    import SearchInput from '@/components/SearchInput'
    import SwaggerResources from '@/components/SwaggerResources'

    export default {
        name: "AppHeader",
        components: {SearchInput, SwaggerResources}
    }
</script>

<style scoped>

</style>
