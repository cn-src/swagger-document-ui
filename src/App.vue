<template lang="pug">
    Layout(stype="overflow-y:hide")
        AppHeader
        Layout(:style="{height: '100vh', paddingTop:'64px', background: '#FFF'}")
            Content(:style="{background: '#fff'}")
                router-view
</template>
<script>
    import {AppHeader, AppSider} from './views/app-layout'

    export default {
        name: 'App',
        components: {AppHeader, AppSider},
    }


</script>
<style lang="less">
    html {
        overflow-y: hidden;
    }

    .ivu-menu-item {
        padding-left: 20px !important;
    }
</style>
