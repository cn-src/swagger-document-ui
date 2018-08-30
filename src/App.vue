<template>
  <Layout stype="overflow-y:hide">
    <Header :style="{padding: 0,position: 'fixed', width: '100%',zIndex:999}">
      <Menu mode="horizontal" theme="dark">
        <MenuItem :style="{width: '200px'}" name="0">
        <Input v-show="!isCollapsed" v-model="tagsKeyWord" placeholder="过滤..." clearable></Input>
        </MenuItem>
        <MenuItem name="1">
        <Icon type="md-menu"
              size="24" @click.native="collapsedSider"/>
        </MenuItem>
        <MenuItem name="2">
        <span style="font-size: 20px;">
          {{ apiData.info && apiData.info.title }}
        </span>
        <Icon type="md-repeat" size="20"/>
        </MenuItem>
      </Menu>
    </Header>
    <Layout :style="{marginTop:'64px',background: '#FFF'}">
      <Sider ref="side1" :style="{height: '100vh',overflow: 'auto',whiteSpace:'nowrap'}"
             :width="250"
             :collapsed-width="0"
             v-model="isCollapsed"
             hide-trigger
             collapsible>
        <Menu theme="dark" width="auto" @on-select="menuItemAction">
          <MenuItem :name="'home'">
          <Icon type="md-home"/>
          首页
          </MenuItem>

          <Submenu v-for="(httpEntities,tagName, i) in apiData.collection" :name="'m'+i" :key="i">
            <template slot="title">
              <Icon type="ios-pricetags"/>
              {{ tagName }}
            </template>
            <template v-for="httpEntity in httpEntities">
              <MenuItem :name="httpEntity.id" :key="httpEntity.id">
              <MethodTag :method="httpEntity.method" :key="httpEntity.id"/>
              {{ httpEntity.name }}
              </MenuItem>
            </template>
          </Submenu>
        </Menu>
      </Sider>
      <Content :style="{padding: '24px 0 0 24px', background: '#fff'}">
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
                    <Table :columns="paramsColumns" :data="rootParams.props" border/>
                  </li>

                  <template v-for="sub of subParams">
                    <li :key="sub.name">
                      <ul>
                        <li>
                          <h3>类型
                            <Icon type="md-arrow-dropright" size="20"/>
                            {{ sub.title }}
                          </h3>
                        </li>
                        <li>
                          <Table :columns="objectColumns" :data="sub.props" border/>
                        </li>
                      </ul>
                    </li>
                  </template>

                  <!--响应信息-->
                  <li>
                    <h2 id="h2_3">响应信息</h2>
                  </li>
                  <li>
                    <Table :columns="responsesColumns" :data="rootResponses.props"
                           border/>
                  </li>

                  <template v-for="sub of subResponses">
                    <li :key="sub.name">
                      <ul>
                        <li>
                          <h3>类型
                            <Icon type="md-arrow-dropright" size="20"/>
                            {{ sub.title }}
                          </h3>
                        </li>
                        <li>
                          <Table :columns="objectColumns" :data="sub.props" border/>
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
      </Content>
    </Layout>
  </Layout>
</template>
<script>
    import store from '@/store'
    import MethodTag from '@/components/MethodTag'
    import swagger from '@/utils/swagger'

    export default {
        name: 'App',
        components: {MethodTag},
        data() {
            return {
                tagsKeyWord: '',
                isCollapsed: false,
                apiInfoColumns: [],
                paramsColumns: [
                    {title: '名称', key: 'name'},
                    {title: '描述', key: 'description'},
                    {title: '位置', key: 'in'},
                    {title: '必须', key: 'required'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
                objectColumns: [
                    {title: '名称', key: 'name'},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
                responsesColumns: [
                    {title: '状态', key: 'status'},
                    {title: '描述', key: 'description'},
                    {title: '类型', key: 'type'},
                    {title: '格式', key: 'format'}],
                apiInfo: [],
                httpEntity: {},
                rootParams: {},
                subParams: [],
                rootResponses: {},
                subResponses: []
            }
        },
        computed: {
            apiData() {
                return store.state.apiData
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            menuItemAction(menuItemName) {
                if (!menuItemName.startsWith('httpEntity')) return;

                let httpEntity = swagger.findHttpEntity(store.state.apiData, menuItemName);
                this.$data.httpEntity = httpEntity;

                this.$data.apiInfoColumns = [
                    {title: '', key: 'k1', width: 110, align: 'right', render: methodColumnRender},
                    {title: '', key: 'k2'}];

                const apiInfo = [
                    {k1: httpEntity.method, k2: httpEntity.path},
                    {k1: '请求体类型', k2: httpEntity.consumes},
                    {k1: '响应体类型', k2: httpEntity.produces}];
                if (httpEntity.method === 'GET') {
                    apiInfo.splice(1, 1)
                }
                this.$data.apiInfo = apiInfo;

                this.$data.rootParams = httpEntity.params;
                const subParams = [];
                swagger.findAllBean(httpEntity.params, store.state.apiData.definitions, subParams);
                this.$data.subParams = subParams;

                this.$data.rootResponses = httpEntity.responses;
                const subResponses = [];
                swagger.findAllBean(httpEntity.responses, store.state.apiData.definitions, subResponses);
                this.$data.subResponses = subResponses

            }
        },
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
  html {
    overflow-y: hidden;
  }

  #doc-content {
    li {
      margin: 5px 0;
      h2, h3 {
        margin-top: 30px;
      }
    }
  }

  /*noinspection CssUnusedSymbol*/
  .row-padding-bottom .ivu-row {
    padding-bottom: 50px;
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
