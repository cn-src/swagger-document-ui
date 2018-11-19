<template>
  <div style="padding: 24px 0 0 24px;">
    <div class="divider-auto">
      <Divider><h2>{{ httpEntity.name }}</h2></Divider>
    </div>
    <div id="doc-content">
      <div>
        <ul>
          <li><h2 id="h2_1">接口说明</h2>
          </li>
          <li class="no-border">
            <Table :columns="apiInfoColumns"
                   :data="apiInfo"
                   :show-header="false"
                   size="small"/>
          </li>

          <!--参数信息-->
          <li>
            <h2 id="h2_2">请求参数</h2>
          </li>
          <li>
            <Table :columns="paramBeanColumns"
                   :data="httpEntity.paramBean.props"
                   border size="small"/>
          </li>

          <template v-for="(child, index) of httpEntity.paramSubBeans">
            <li :key="'Param:' + child.schemaKey">
              <ul>
                <li>
                  <h3 :id="'h3_param_' + index">类型
                    <Icon type="md-arrow-dropright" size="20"/>
                    {{ child.title }}
                  </h3>
                </li>
                <li>
                  <Table :columns="beanColumns"
                         :data="child.props"
                         border size="small"/>
                </li>
              </ul>
            </li>
          </template>

          <!--响应信息-->
          <li>
            <h2 id="h2_3">响应信息</h2>
          </li>
          <li>
            <Table :columns="responseBeanColumns"
                   :data="httpEntity.responseBean.props"
                   border size="small"/>
          </li>

          <template v-for="(child,index) of httpEntity.responseSubBeans">
            <li :key="'Response:' + child.schemaKey">
              <ul>
                <li>
                  <h3 :id="'h3_response_' + index">类型
                    <Icon type="md-arrow-dropright" size="20"/>
                    {{ child.title }}
                  </h3>
                </li>
                <li>
                  <Table :columns="beanColumns"
                         :data="child.props"
                         border size="small"/>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>

    </div>
    <div class="anchor-auto">
      <Anchor show-ink container="#doc-content">
        <AnchorLink href="#h2_1" title="接口说明"/>
        <AnchorLink href="#h2_2" title="请求参数"/>
        <AnchorLink :href="'#h3_param_' + index" :title="child.title"
                    :key="'h3_param_'+child.schemaKey"
                    v-for="(child, index) of httpEntity.paramSubBeans"/>
        <AnchorLink href="#h2_3" title="响应信息"/>
        <AnchorLink :href="'#h3_response_' + index" :title="child.title"
                    :key="'h3_response_'+child.schemaKey"
                    v-for="(child, index) of httpEntity.responseSubBeans"/>
      </Anchor>
    </div>
  </div>
</template>
<script>
    import swagger from '@/utils/swagger'
    import CopiedTag from '@/components/CopiedTag'
    import _ from 'lodash'

    export default {
        name: 'EntityView',
        components: {CopiedTag},
        data() {
            return {
                apiInfoColumns: [
                    {title: '', key: 'k1', width: 110, align: 'right', render: methodColumnRender},
                    {title: '', key: 'k2', render: copiedTagRender}
                ],
                paramBeanColumns: [
                    {title: '名称', key: 'name', maxWidth: 150, render: paramNameRender},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in', maxWidth: 100, render: paramInRender},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}],
                beanColumns: [
                    {title: '名称', key: 'name', maxWidth: 150, render: copiedTagRender},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}],
                responseBeanColumns: [
                    {title: '状态', key: 'status', maxWidth: 62},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', maxWidth: 100},
                    {title: '格式', key: 'format', maxWidth: 150},
                    {title: '约束', key: 'constraint', maxWidth: 250}],
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
            },
            httpEntity() {
                if (!this.$root.currentSwaggerJson.collection) {
                    return {paramBean: {props: []}, responseBean: {props: []}}
                }
                return swagger.findHttpEntity(this.$root.currentSwaggerJson.collection, this.$route.params.id);
            }
        }
    }

    const colorsMap = {
        'GET': 'success',
        'POST': 'warning',
        'PUT': 'primary',
        'DELETE': 'error'
    };

    function methodColumnRender(h, params) {
        if (params.index === 0) {
            const colorFromMap = colorsMap[params.row.k1];
            let color = colorFromMap ? colorFromMap : 'default';

            return h('Tag', {
                props: {
                    color: color
                }
            }, params.row.k1);
        } else {
            return h('span', params.row.k1)
        }
    }

    function copiedTagRender(h, params) {
        let subNode = params.row.name || params.row.k2;
        if (_.isArray(subNode)) {
            subNode = subNode.map(it => {
                return h(CopiedTag, {
                    style: 'margin-right:10px'
                }, it)
            });
            return h('span', {}, subNode)
        }
        return h(CopiedTag, {}, subNode);
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
      h2, h3 {
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
    .ivu-table:before, .ivu-table:after {
      width: 0;

    }
  }

</style>
