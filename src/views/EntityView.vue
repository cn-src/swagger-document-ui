<template>
  <div style="padding: 24px 0 0 24px;">
    <Tabs>
      <TabPane label="API 文档" icon="md-document">
        <div id="doc-content" :style="{height: '75vh',overflowY: 'auto',paddingBottom: '100px', paddingRight: '200px'}">
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
                <li :key="'Param:' + child.beanRef">
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
                <li :key="'Response:' + child.beanRef">
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
          <div style="top:100px; right: 20px; position: fixed; width: 180px">
            <Anchor show-ink container="#doc-content">
              <AnchorLink href="#h2_1" title="接口说明"/>
              <AnchorLink href="#h2_2" title="请求参数">
                <AnchorLink :href="'#h3_param_' + index" :title="child.title"
                            :key="child.beanRef"
                            v-for="(child, index) of allChildParamBeans"/>
              </AnchorLink>
              <AnchorLink href="#h2_3" title="响应信息">
                <AnchorLink :href="'#h3_response_' + index" :title="child.title"
                            :key="child.beanRef"
                            v-for="(child, index) of allChildResponseBeans"/>
              </AnchorLink>
            </Anchor>
          </div>
        </div>
      </TabPane>
      <TabPane label="在线调试" icon="md-bug">
        <DebugView/>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
    import swagger from '@/utils/swagger'
    import DebugView from '@/views/DebugView'
    export default {
        name: 'EntityView',
        data() {
            return {
                apiInfoColumns: [
                    {title: '', key: 'k1', width: 110, align: 'right', render: methodColumnRender},
                    {title: '', key: 'k2'}
                ],
                paramBeanColumns: [
                    {title: '名称', key: 'name'},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in'},
                    {title: '必须', key: 'required'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
                beanColumns: [
                    {title: '名称', key: 'name'},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
                responseBeanColumns: [
                    {title: '状态', key: 'status'},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
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
        },
        components: {DebugView}
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
            }, params.row.k1,);
        } else {
            return h('span', params.row.k1)
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
