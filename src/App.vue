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
        <EntityView :http-entity="httpEntity" :bean-map="beanMap"/>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
    import store from '@/store'
    import MethodTag from '@/components/MethodTag'
    import swagger from '@/utils/swagger'
    import EntityView from "@/views/EntityView";

    export default {
        name: 'App',
        components: {EntityView, MethodTag},
        data() {
            return {
                tagsKeyWord: '',
                isCollapsed: false,
                httpEntity: undefined,
                beanMap: undefined
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

                this.$data.httpEntity = swagger.findHttpEntity(store.state.apiData, menuItemName);
                this.$data.beanMap = store.state.apiData.beanMap;
            }
        },
    }


</script>
<style lang="less">
  html {
    overflow-y: hidden;
  }
</style>
