<template>
  <Layout stype="overflow-y:hide">
    <Header :style="{padding: 0,position: 'fixed', width: '100%',zIndex:999}">
      <Menu mode="horizontal" theme="dark" @on-select="headerAction">
        <MenuItem name="1">
        <Icon type="md-menu"
              size="24" @click.native="collapsedSider"/>
        </MenuItem>
        <MenuItem name="swaggerResources">
        {{ infoTitle }}
        <Icon type="md-repeat"/>
        </MenuItem>
      </Menu>
      <SwaggerResources ref="swaggerResources"/>
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

          <Submenu v-for="(httpEntities,tagName, i) in swaggerCollection" :name="'m'+i" :key="i">
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
    import MethodTag from '@/components/MethodTag'
    import EntityView from "@/views/EntityView";
    import SwaggerResources from "@/views/SwaggerResources";
    import api from '@/utils/api'

    export default {
        name: 'App',
        components: {EntityView, SwaggerResources, MethodTag},
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
            infoTitle() {
                const currentSwaggerJson = this.$store.state.currentSwaggerJson;
                return currentSwaggerJson && currentSwaggerJson.info && currentSwaggerJson.info.title || ''
            },
            swaggerCollection() {
                const currentSwaggerJson = this.$store.state.currentSwaggerJson;
                return currentSwaggerJson && currentSwaggerJson.collection || {}
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            headerAction(menuItemName) {
                if (menuItemName === 'swaggerResources') {
                    this.$refs.swaggerResources.show = true
                }
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
        beforeCreate: function () {
            api.initApi('/swagger-resources');
        }
    }


</script>
<style lang="less">
  html {
    overflow-y: hidden;
  }
</style>
