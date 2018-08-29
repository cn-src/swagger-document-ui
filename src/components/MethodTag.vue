<template>
  <span class="http-method-tag" :style="{color:actionColor(method)}">{{ method }}</span>
</template>

<script>
  const colorsMap = {
    'GET': '#18BE6B',
    'POST': '#FF9901',
    'PUT': '#2D8CF0',
    'DELETE': '#ED4015'
  };
  export default {
    name: "MethodTag",
    methods: {
      actionColor(method) {
        const colorFromMap = colorsMap[method];
        return colorFromMap ? colorFromMap : '#EEEEEE';
      }
    },
    props: {
      method: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .http-method-tag {
    font-size: 10px;
    font-weight: bold;
    width: 40px;
    display: inline-block;
    text-align: right;
    padding-right: 5px;
  }
</style>
