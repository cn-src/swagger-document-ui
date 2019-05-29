<template lang="pug">
div(style='padding: 24px 0 0 24px;')
    div.divider-auto
        Divider: h2 {{ httpEntity.name }}
    div#doc-content
        ul
            li: h2#h2_1 接口说明
            li.no-border
                EntityViewApiInfo(:httpEntity="httpEntity")
            li: h2#h2_2 请求参数
            li
                EntityViewParam(:httpEntity="httpEntity")
            template(v-for='(child, index) of httpEntity.paramSubBeans')
                li(:key='`h3_param_${child.schemaKey}`')
                    h3(:id="`h3_param_${index}`")
                        | 类型
                        Icon(type='md-arrow-dropright' size='20')
                        | {{ child.title }}
                li(:key='`param_${child.schemaKey}`')
                    EntityViewBean(:props="child.props")
            li: h2#h2_3 响应信息
            li
                EntityViewResponse(:httpEntity="httpEntity")
            template(v-for='(child, index) of httpEntity.responseSubBeans')
                li(:key='`h3_response_${child.schemaKey}`')
                    h3(:id="`h3_response_${index}`")
                        | 类型
                        Icon(type='md-arrow-dropright' size='20')
                        | {{ child.title }}
                li(:key='`response_${child.schemaKey}`')
                    EntityViewBean(:props="child.props")
    div.anchor-auto
        Anchor(show-ink container='#doc-content')
            AnchorLink(href='#h2_1' title='接口说明')
            AnchorLink(href='#h2_2' title='请求参数')
            AnchorLink(
            v-for='(child, index) of httpEntity.paramSubBeans'
            :key="'h3_param_'+child.schemaKey"
            :href="'#h3_param_' + index"
            :title="child.title"
            )
            AnchorLink(href='#h2_3' title='响应信息')
            AnchorLink(
            v-for='(child, index) of httpEntity.responseSubBeans'
            :key="'h3_response_'+child.schemaKey"
            :href="'#h3_response_' + index"
            :title="child.title"
            )

</template>
<script>
import swagger from '@/utils/swagger';
import EntityViewApiInfo from './EntityViewApiInfo';
import EntityViewParam from './EntityViewParam';
import EntityViewResponse from './EntityViewResponse';
import EntityViewBean from './EntityViewBean';

export default {
    name: 'EntityView',
    components: { EntityViewApiInfo, EntityViewParam, EntityViewResponse, EntityViewBean },
    computed: {
        httpEntity() {
            if (!this.$root.currentSwaggerJson.collection) {
                return { paramBean: { props: [] }, responseBean: { props: [] } };
            }
            return swagger.findHttpEntity(this.$root.currentSwaggerJson.collection, this.$route.params.id);
        }
    }
};
</script>
<style lang="less">
#doc-content {
    height: 75vh;
    overflow-y: auto;
    padding-bottom: 100px;
    @media (min-width: 801px) {
        padding-right: 140px;
    }

    li {
        margin: 5px 0;

        h2,
        h3 {
            margin-top: 30px;
        }
    }
}

.anchor-auto {
    top: 100px;
    right: 20px;
    position: fixed;
    width: 120px;
    @media (max-width: 800px) {
        display: none;
    }
}

.divider-auto {
    @media (max-width: 800px) {
        padding-right: 15px;
    }
    @media (min-width: 801px) {
        padding-right: 155px;
    }
}

/*noinspection CssUnusedSymbol*/
.no-border {
    .ivu-table-wrapper {
        border: 0;

        td {
            border: 0;
        }
    }

    .ivu-table:before,
    .ivu-table:after {
        width: 0;
    }
}
</style>
