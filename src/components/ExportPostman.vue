<template lang="pug">
Modal(v-model='show' title='导出 Postman')
    Form(:label-width="80" style="width: 90%; margin: 0 auto;")
        FormItem(label="基本路径：")
            Input(v-model="formData.basePath" placeholder="如：http://localhost")
        FormItem(label="导出方式：")
            RadioGroup(v-model="formData.exportType")
                Radio(label="copy") 复制到剪贴板
                Radio(label="download" :disabled="exportDownloadDisabled") 下载文件
    div(slot="footer")
        Button(type="primary" size="large" long @click="onOk" id="exportOkBtn") 确定
</template>

<script>
import ClipboardJS from 'clipboard';
import FileSaver from 'file-saver';

import postman from '@/utils/postman';

export default {
    name: 'ExportPostman',
    data() {
        return {
            show: false,
            // 是否支持文件生成
            exportDownloadDisabled: false,
            formData: { exportType: 'copy' }
        };
    },
    methods: {
        onOk() {
            const vue = this;
            if (this.$data.formData.exportType === 'copy') {
                new ClipboardJS('#exportOkBtn', {
                    text: function() {
                        return postman.exportJson(vue.$root.currentSwaggerJson, { basePath: vue.formData.basePath });
                    }
                });
                this.$Message.success('复制成功');
                this.$data.show = false;
            } else if (this.$data.formData.exportType === 'download') {
                const exportJson = postman.exportJson(vue.$root.currentSwaggerJson, {
                    basePath: vue.formData.basePath
                });
                const blob = new Blob([exportJson], { type: 'text/plain;charset=utf-8' });
                FileSaver.saveAs(blob, vue.$root.currentSwaggerJson.info.title + '.json');
                this.$Message.success('下载成功');
                this.$data.show = false;
            }
        }
    },
    created() {
        this.$data.formData.basePath = this.$root.baseURL;
        try {
            this.$data.exportDownloadDisabled = !new Blob();
        } catch (e) {
            /*ignore*/
        }
    }
};
</script>
<style>
/* 修补压缩图标字体后造成的图标移位问题 */
.ivu-modal .ivu-icon-ios-close {
    top: -13px !important;
}
</style>
