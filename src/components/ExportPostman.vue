<template lang="pug">
Modal(v-model='show' title='导出 Postman')
    CellGroup(@on-click='')
        Cell()
</template>

<script>
export default {
    name: 'ExportPostman',
    data() {
        return {
            show: false
        };
    }
};
</script>
<style>
/* 修补压缩图标字体后造成的图标移位问题 */
/*.ivu-modal .ivu-icon-ios-close {*/
/*    top: -13px !important;*/
/*}*/
</style>
