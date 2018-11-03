<template>
  <span class="copied-tag" @click="copiedToClipboard"><slot/></span>
</template>

<script>
  import ClipboardJS from 'clipboard'
    export default {
        name: "CopiedTag",
        methods: {
            copiedToClipboard: function () {
                new ClipboardJS('.copied-tag', {
                    text: function(trigger) {
                        return trigger.innerHTML;
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .copied-tag {

  }
</style>
