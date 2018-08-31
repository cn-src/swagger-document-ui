<template>
  <div style="padding: 24px 0 0 24px;">
    <Tabs>
      <TabPane label="API 文档" icon="md-document">
        <div id="doc-content" :style="{height: '90vh',overflowY: 'auto'}">
          <div :style="{width:'75vw'}">
            <ul>
              <li><h2 id="h2_1">接口说明</h2>
              </li>
              <li class="no-border">
                <Table :columns="apiInfoColumns" :data="apiInfo"
                       :show-header="false"/>
              </li>

              <!--参数信息-->
              <li>
                <h2 id="h2_2">请求参数</h2>
              </li>
              <li>
                <Table :columns="paramBeanColumns" :data="httpEntity.paramBean.props" border/>
              </li>

              <template v-for="child of allChildParamBeans">
                <li :key="child.name">
                  <ul>
                    <li>
                      <h3>类型
                        <Icon type="md-arrow-dropright" size="20"/>
                        {{ child.title }}
                      </h3>
                    </li>
                    <li>
                      <Table :columns="beanColumns" :data="child.props" border/>
                    </li>
                  </ul>
                </li>
              </template>

              <!--响应信息-->
              <li>
                <h2 id="h2_3">响应信息</h2>
              </li>
              <li>
                <Table :columns="responseBeanColumns" :data="httpEntity.responseBean.props"
                       border/>
              </li>

              <template v-for="child of allChildResponseBeans">
                <li :key="child.name">
                  <ul>
                    <li>
                      <h3>类型
                        <Icon type="md-arrow-dropright" size="20"/>
                        {{ child.title }}
                      </h3>
                    </li>
                    <li>
                      <Table :columns="beanColumns" :data="child.props" border/>
                    </li>
                  </ul>
                </li>
              </template>
              <li style="margin: 10px 0">
                &nbsp;
              </li>
            </ul>
          </div>
          <Anchor show-ink container="#doc-content" style="top:100px;right:100px;position: fixed;">
            <AnchorLink href="#h2_1" title="接口说明"/>
            <AnchorLink href="#h2_2" title="请求参数"/>
            <AnchorLink href="#h2_3" title="响应信息"/>
          </Anchor>
        </div>
      </TabPane>
      <TabPane label="在线调试" icon="md-bug">Waiting...</TabPane>
    </Tabs>
  </div>
</template>
<script>
    import swagger from "@/utils/swagger";

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

                const allChildParamBeans = [];
                swagger.findAllBean(this.httpEntity.paramBean, this.beanMap, allChildParamBeans);
                return allChildParamBeans

            },
            allChildResponseBeans() {

                const allChildResponseBeans = [];
                swagger.findAllBean(this.httpEntity.responseBean, this.beanMap, allChildResponseBeans);
                return allChildResponseBeans
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
      border: 0 solid #dcdee2;
      td {
        border: 0 solid #e8eaec;
      }
    }
    .ivu-table:before, .ivu-table:after {
      width: 0;

    }
  }

</style>
