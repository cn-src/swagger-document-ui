<template lang="pug">
Layout(stype="overflow-y:hide")
    Header(:style="{padding: 0,position: 'fixed', width: '100%',zIndex:999}")
        HeaderContent
    Layout(:style="{height: '100vh', paddingTop:'64px', background: '#FFF'}")
        Sider(
        ref='side1' v-model='isCollapsed'
        style='overflow: auto;'
        breakpoint='md'
        :width='270'
        :collapsed-width='0'
        hide-trigger
        collapsible
        )
            SiderContent
        Content(:style="{background: '#fff'}")
            router-view
</template>
<script>
import HeaderContent from './views/app-layout/HeaderContent'
import SiderContent from './views/app-layout/SiderContent'

export default {
    name: 'App',
    components: {HeaderContent, SiderContent},
    data() {
        return {
            isCollapsed: false,
        }
    },
    watch: {
        '$root.isCollapsed': function () {
            this.$refs.side1.toggleCollapse()
        }
    }
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
