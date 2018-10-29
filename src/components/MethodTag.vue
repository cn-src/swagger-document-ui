<template>
  <span :style="{color:actionColor(method)}" class="http-method-tag">{{ simplifyMethod }}</span>
</template>

<script>
    const colorsMap = {
        'GET': '#18BE6B',
        'POST': '#FF9901',
        'PUT': '#2D8CF0',
        'DELETE': '#ED4015'
    };
    const simplifyMethodMapping = {
        'DELETE': 'DEL',
        'OPTIONS': 'OPT'
    };
    export default {
        name: "MethodTag",
        computed: {
            simplifyMethod() {
                const formMap = simplifyMethodMapping[this.$props.method];
                return formMap ? formMap : this.$props.method;
            }
        },
        props: {
            method: {
                type: String,
                default: ''
            }
        },
        methods: {
            actionColor(method) {
                const colorFromMap = colorsMap[method];
                return colorFromMap ? colorFromMap : '#EEEEEE';
            }
        },
    }
</script>

<style scoped>
  .http-method-tag {
    font-size: 10px;
    font-weight: bold;
    width: 50px;
    display: inline-block;
    text-align: right;
    padding-right: 5px;
  }
</style>
