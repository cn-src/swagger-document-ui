<template lang="pug">
  span(:style='{color:actionColor(method)}' class='http-method-tag')
    | {{ shortMethod }}
</template>

<script>
    const colorsMapping = {
        'GET': '#18BE6B',
        'POST': '#FF9901',
        'PUT': '#2D8CF0',
        'DELETE': '#ED4015'
    };
    const methodMapping = {
        'DELETE': 'DEL',
        'OPTIONS': 'OPT'
    };
    export default {
        name: "MethodTag",
        computed: {
            shortMethod() {
                return methodMapping[this.$props.method] || this.$props.method;
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
                return colorsMapping[method] || '#EEEEEE';
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
