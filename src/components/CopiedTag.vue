<template lang="pug">
Tooltip(content='点击复制' placement='right-start')
    span(class='copied-tag' @click='copyToClipboard'): slot
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
    name: "CopiedTag",
    methods: {
        copyToClipboard: function () {
            new ClipboardJS('.copied-tag', {
                text: function (trigger) {
                    return trigger.innerHTML;
                }
            });
            this.$Message.success('复制成功');
        }
    }
}
</script>
