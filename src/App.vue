<template>
  <Layout stype="overflow-y:hide">
    <Header :style="{padding: 0,position: 'fixed', width: '100%',zIndex:999}">
      <Menu mode="horizontal" theme="dark">
        <MenuItem name="1">
        <Icon type="md-menu"
              size="24" @click.native="collapsedSider"/>
        </MenuItem>
        <MenuItem name="2">
        {{ currentSwaggerJson.info && currentSwaggerJson.info.title }}
        <Icon type="md-repeat"/>
        </MenuItem>
      </Menu>
    </Header>
    <Layout :style="{height: '100vh', paddingTop:'64px', background: '#FFF'}">
      <Sider ref="side1" :style="{overflow: 'auto'}"
             breakpoint="md"
             :width="250"
             :collapsed-width="0"
             v-model="isCollapsed"
             hide-trigger
             collapsible>
        <Menu theme="dark" width="auto" @on-select="menuItemAction">
          <MenuItem :name="'Home'">
          <Icon type="md-home"/>
          首页
          </MenuItem>

          <Submenu v-for="(httpEntities,tagName, i) in currentSwaggerJson.collection" :name="'m'+i" :key="i">
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
      <Content :style="{background: '#fff'}">
        <router-view/>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
    import store from '@/store'
    import MethodTag from '@/components/MethodTag'
    import EntityView from "@/views/EntityView";

    export default {
        name: 'App',
        components: {EntityView, MethodTag},
        data() {
            return {
                tagsKeyWord: '',
                isCollapsed: false,
                httpEntity: {
                    paramBean: {
                        props: []
                    },
                    responseBean: {
                        props: []
                    }
                },
                beanMap: {}
            }
        },
        computed: {
            currentSwaggerJson() {
                return store.state.currentSwaggerJson
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            menuItemAction(menuItemName) {
                if (menuItemName === 'Home') {
                    this.$router.push('/');
                    return
                }
                if (menuItemName.startsWith('httpEntity')) {
                    this.$router.push(`/entity/${menuItemName}`);
                }
            }
        },
    }


</script>
<style lang="less">
  html {
    overflow-y: hidden;
  }
</style>
