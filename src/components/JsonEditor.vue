<template>
  <div ref="jsonEditor"/>
</template>

<script>

    import 'jsoneditor/dist/jsoneditor.css';
    import JSONEditor from 'jsoneditor';

    export default {
        name: 'JsonEditor',
        props: {
            json: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            onChange: {
                type: Function,
                default: () => {
                    return {}
                }
            }
        },
        watch: {
            json: {
                handler(newJson) {
                    if (this.editor) {
                        this.editor.set(newJson)
                    }
                },
                deep: true
            }
        },
        methods: {
            _onChange() {
                if (this.onChange && this.editor) {
                    this.onChange(this.editor.get())
                }
            }
        },
        mounted() {
            const container = this.$refs.jsonEditor;
            const options = {onChange: this._onChange};
            Object.assign(options, this.options);

            this.editor = new JSONEditor(container, options);
            this.editor.set(this.json)
        },
        beforeDestroy() {
            if (this.editor) {
                this.editor.destroy();
                this.editor = null
            }
        }
    }
</script>

<style>
</style>
