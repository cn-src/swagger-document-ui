<template>
  <Layout stype="overflow-y:hide">
    <Header :style="{padding: 0,position: 'fixed', width: '100%'}">
      <Menu mode="horizontal" theme="dark">
        <MenuItem name="0" :style="{width: '200px'}">
          <Input v-model="tagsKeyWord" placeholder="过滤..." clearable v-show="!isCollapsed">
        </MenuItem>
        <MenuItem name="1">
          <Icon @click.native="collapsedSider"
                type="md-menu" size="24"/>
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
      <!-- TODO class + !important提权 -->
      <!--自定义宽度在收缩时存在问题，因优先级问题只能用 style 内联更改 -->
      <Sider ref="side1" hide-trigger
             :style="{width: isCollapsed?0:'250px', minWidth: isCollapsed?0:'250px', maxWidth: isCollapsed?0:'250px', flex: isCollapsed?'0 0 0':'0 0 250px',
                             height: '100vh',overflow: 'auto',whiteSpace:'nowrap'}"
             collapsible
             :collapsed-width="0"
             v-model="isCollapsed">
        <Menu theme="dark" width="auto" @on-select="menuItemAction">
          <MenuItem :name="'home'">
            <Icon type="md-home"/>
            首页
          </MenuItem>

          <Submenu :name="'m'+i" :key="i" v-for="(httpEntities,tagName, i) in apiData.collection">
            <template slot="title">
              <Icon type="ios-pricetags"/>
              {{ tagName }}
            </template>
            <template v-for="httpEntity in httpEntities">
              <MenuItem :name="httpEntity.id" :key="httpEntity.id">
                <MethodTag :method="httpEntity.method"/>
                {{ httpEntity.name }}
              </MenuItem>
            </template>
          </Submenu>
        </Menu>
      </Sider>
      <Content :style="{padding: '24px', background: '#fff'}">
        <Tabs>
          <TabPane label="API 文档" icon="md-document" :style="{height: '85vh',overflowY: 'auto'}">
            <div>
              <div>
                <Row class="no-border">
                  <Col>
                    <h2 id="h2_1">接口说明</h2>
                  </Col>
                  <Col>
                    <Table :columns="apiInfoColumns" :data="apiInfo"
                           :show-header="false"/>
                  </Col>
                </Row>

                <!--参数信息-->
                <Row>
                  <Col>
                    <h2 id="h2_2">请求参数</h2>
                  </Col>
                  <Col>
                    <Table border :columns="paramsColumns" :data="rootParams.props"/>
                  </Col>
                </Row>

                <template v-for="sub of subParams">
                  <Row :key="sub.name">
                    <Col>
                      <h3>类型
                        <Icon type="md-arrow-dropright" size="20"/>
                        {{ sub.title }}
                      </h3>
                    </Col>
                    <Col>
                      <Table border :columns="objectColumns" :data="sub.props"/>
                    </Col>
                  </Row>
                </template>

                <!--响应信息-->
                <Row :style="{marginTop:'60px'}">
                  <Col>
                    <h2 id="h2_3">响应信息</h2>
                  </Col>
                  <Col>
                    <Table border :columns="responsesColumns"
                           :data="rootResponses.props"/>
                  </Col>
                </Row>

                <template v-for="sub of subResponses">

                  <Row :key="sub.name">
                    <Col>
                      <h3>类型
                        <Icon type="md-arrow-dropright" size="20"/>
                        {{ sub.title }}
                      </h3>
                    </Col>
                    <Col>
                      <Table border :columns="objectColumns" :data="sub.props"/>
                    </Col>
                  </Row>
                </template>
              </div>
            </div>
            <div>
              <Anchor show-ink>
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
  import {findHttpEntity, findAllSchema, methodColumnRender} from '@/util/utils'

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
    methods: {
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      },
      menuItemAction(menuItemName) {
        if (!menuItemName.startsWith('httpEntity')) return;

        let httpEntity = findHttpEntity(store.state.apiData, menuItemName);
        this.$data.httpEntity = httpEntity;

        this.$data.apiInfoColumns = [
          {title: '', key: 'k1', width: 110, align: 'right', render: methodColumnRender},
          {title: '', key: 'k2'}];

        this.$data.apiInfo = [
          {k1: httpEntity.method, k2: httpEntity.path},
          {k1: '请求体类型', k2: httpEntity.consumes},
          {k1: '响应体类型', k2: httpEntity.produces}];

        this.$data.rootParams = httpEntity.params;
        const subParams = [];
        findAllSchema(httpEntity.params, store.state.apiData.definitions, subParams);
        this.$data.subParams = subParams;

        this.$data.rootResponses = httpEntity.responses;
        const subResponses = [];
        findAllSchema(httpEntity.responses, store.state.apiData.definitions, subResponses);
        this.$data.subResponses = subResponses

      }
    },
    computed: {
      apiData() {
        return store.state.apiData
      }
    }
  }
</script>
<style lang="less">
  html {
    overflow-y: hidden;
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
    .ivu-table:after {
      width: 0;

    }
  }

  .no-border .ivu-table-wrapper {
  }

</style>
