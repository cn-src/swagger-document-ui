<template lang="pug">
  li: h2#h2_1 接口说明
  li.no-border
    Table(
    :columns='apiInfoColumns' :data='apiInfo'
    :show-header='false' size='small')

</template>

<script>
    import copiedTagRender from './copiedTagRender'

    export default {
        name: "EntityViewApiInfo",
        data() {
            return {
                apiInfoColumns: [
                    {title: '', key: 'k1', width: 110, align: 'right', render: methodColumnRender},
                    {title: '', key: 'k2', render: copiedTagRender}
                ]
            }
        },
        computed: {
            apiInfo() {
                const apiInfo = [
                    {k1: this.httpEntity.method, k2: this.httpEntity.path},
                    {k1: '请求体类型', k2: this.httpEntity.consumes},
                    {k1: '响应体类型', k2: this.httpEntity.produces},
                    {k1: '描述', k2: this.httpEntity.description}];

                if (this.httpEntity.method === 'GET') {
                    apiInfo.splice(1, 1)
                }
                return apiInfo
            }
        },
        props: {
            httpEntity: {
                type: Object,
                required: true
            }
        }
    }

    const colorsMapping = {
        'GET': 'success',
        'POST': 'warning',
        'PUT': 'primary',
        'DELETE': 'error'
    };

    function methodColumnRender(h, params) {
        if (params.index === 0) {
            let color = colorsMapping[params.row.k1] || 'default';

            return h('Tag', {
                props: {
                    color: color
                }
            }, params.row.k1);
        } else {
            return h('span', params.row.k1)
        }
    }

</script>
