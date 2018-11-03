<template>
  <div style="padding: 24px 0 0 24px;">
    <Divider :style="{paddingRight: '155px'}"><h2>{{ httpEntity.name }}</h2></Divider>
    <div id="doc-content" :style="{height: '75vh',overflowY: 'auto',paddingBottom: '100px', paddingRight: '140px'}">
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

          <template v-for="(child, index) of allChildParamBeans">
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

          <template v-for="(child,index) of allChildResponseBeans">
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
    <div style="top:100px; right: 20px; position: fixed; width: 120px">
      <Anchor show-ink container="#doc-content">
        <AnchorLink href="#h2_1" title="接口说明"/>
        <AnchorLink href="#h2_2" title="请求参数"/>
        <AnchorLink :href="'#h3_param_' + index" :title="child.title"
                    :key="'h3_param_'+child.schemaKey"
                    v-for="(child, index) of allChildParamBeans"/>
        <AnchorLink href="#h2_3" title="响应信息"/>
        <AnchorLink :href="'#h3_response_' + index" :title="child.title"
                    :key="'h3_response_'+child.schemaKey"
                    v-for="(child, index) of allChildResponseBeans"/>
      </Anchor>
    </div>
  </div>
</template>
<script>
    import swagger from '@/utils/swagger'
    import CopiedTag from '@/components/CopiedTag'

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
                    {title: '名称', key: 'name', width: 250, render: nameRequiredColumnRender},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in', width: 100},
                    {title: '类型', key: 'type', width: 100},
                    {title: '格式', key: 'format', width: 150},
                    {title: '约束', key: 'constraint'}],
                beanColumns: [
                    {title: '名称', key: 'name', width: 250},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', width: 100},
                    {title: '格式', key: 'format', width: 150},
                    {title: '约束', key: 'constraint'}],
                responseBeanColumns: [
                    {title: '状态', key: 'status', width: 62},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type', width: 100},
                    {title: '格式', key: 'format', width: 150},
                    {title: '约束', key: 'constraint'}],
            }
        },
        computed: {
            apiInfo() {
                const apiInfo = [
                    {k1: this.httpEntity.method, k2: this.httpEntity.path},
                    {k1: '请求体类型', k2: this.httpEntity.consumes},
                    {k1: '响应体类型', k2: this.httpEntity.produces}];

                if (this.httpEntity.method === 'GET') {
                    apiInfo.splice(1, 1)
                }
                return apiInfo
            },
            allChildParamBeans() {
                return swagger.findAllBean(this.httpEntity.paramBean, this.beanMap);
            },
            allChildResponseBeans() {
                return swagger.findAllBean(this.httpEntity.responseBean, this.beanMap);
            }
        },
        props: {
            httpEntity: {
                type: Object,
                required: true,

                id: {type: String, required: true,},
                name: {type: String, required: true,},
                path: {type: String, required: true,},
                method: {type: String, required: true,},
                consumes: {type: Array},
                produces: {type: Array},
                paramBean: {
                    type: Object, required: true, props: {
                        type: Array, required: true
                    }
                },
                responseBean: {
                    type: Object, required: true, props: {
                        type: Array, required: true
                    }
                },
            },
            beanMap: {
                type: Object, required: true
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
        return h(CopiedTag, {}, params.row.k2);
    }

    function nameRequiredColumnRender(h, params) {
        if (params.row.required) {
            return h('span', {}, [h('span', {}, params.row.name), h('span', {
                style: 'color:red;'
            }, ' *')])
        } else {
            return h('span', {}, params.row.name)
        }
    }
</script>
<style lang="less">
  #doc-content {
    li {
      margin: 5px 0;
      h2, h3 {
        margin-top: 30px;
      }
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
