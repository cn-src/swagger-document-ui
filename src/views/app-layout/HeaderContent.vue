<template lang="pug">
Menu(mode='horizontal' theme='dark' @on-select='headerAction')
    MenuItem(name='1')
        Icon(@click.native='collapsedSider' type='md-menu' size='24')
    MenuItem(name='swaggerResources')
        | {{ infoTitle }}&nbsp;
        Icon(type='md-repeat')
    MenuItem(name='exportPostman')
        | 导出 Postman
    div(style='float: right;margin-right: 20px;position: relative;')
        SearchInput
    SwaggerResources(ref='swaggerResources')
    ExportPostman(ref='exportPostman')
</template>

<script>
import SearchInput from '@/components/SearchInput';
import SwaggerResources from '@/components/SwaggerResources';
import ExportPostman from '@/components/ExportPostman';

export default {
    name: 'HeaderContent',
    components: { SearchInput, SwaggerResources, ExportPostman },
    methods: {
        headerAction(menuItemName) {
            if (menuItemName === 'swaggerResources') {
                this.$refs.swaggerResources.show = true;
            } else if (menuItemName === 'exportPostman') {
                this.$refs.exportPostman.show = true;
            }
        },
        collapsedSider() {
            this.$root.isCollapsed = !this.$root.isCollapsed;
        }
    },
    computed: {
        infoTitle() {
            const currentSwaggerJson = this.$root.currentSwaggerJson;
            return (currentSwaggerJson && currentSwaggerJson.info && currentSwaggerJson.info.title) || '';
        }
    }
};
</script>
