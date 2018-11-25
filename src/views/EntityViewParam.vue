<template lang="pug">
  li: h2#h2_2 请求参数
  li
    Table(
    :columns='paramBeanColumns'
    :data='httpEntity.paramBean.props'
    border size='small')
  template(v-for='(child, index) of httpEntity.paramSubBeans')
    li(:key='"Param:" + child.schemaKey')
      ul
        li
          h3(:id="'h3_param_' + index")
            | 类型
            Icon(type='md-arrow-dropright' size='20')
            | {{ child.title }}
        li
          Table(:columns='beanColumns' :data="child.props" border size="small")

</template>

<script>
    import CopiedTag from '@/components/CopiedTag'
    import {beanColumns} from './EntityViewCommon'

    export default {
        name: "EntityViewParam",
        data() {
            return {
                paramBeanColumns: [
                    {title: '名称', key: 'name', maxWidth: 150, render: paramNameRender},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in', maxWidth: 100, render: paramInRender},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}],
                beanColumns
            }
        },
        props: {
            httpEntity: {
                type: Object,
                required: true
            }
        }
    }

    function paramNameRender(h, params) {
        if (params.row.required) {
            return h('span', {}, [h(CopiedTag, {}, params.row.name), h('span', {
                style: 'color:red;'
            }, '*')])
        } else {
            return h(CopiedTag, {}, params.row.name)
        }
    }

    const inMapping = {
        'header': '#ED4015',
        'path': '#2D8CF0',
        'query': '#18BE6B',
        'body': '#FF9901',
    };

    function paramInRender(h, params) {
        const color = inMapping[params.row.in] || '#7a7a7a';
        return h('span', {
            style: `color:${color};font-weight:bold;`
        }, params.row.in)
    }
</script>

