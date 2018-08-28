<template>
    <i-layout stype="overflow-y:hide">
        <i-header :style="{padding: 0,position: 'fixed', width: '100%'}">
            <i-menu mode="horizontal" theme="dark">
                <i-menu-item name="0" :style="{width: '200px'}">
                    <i-input v-model="tagsKeyWord" placeholder="过滤..." clearable v-show="!isCollapsed"/>
                </i-menu-item>
                <i-menu-item name="1">
                    <i-icon @click.native="collapsedSider"
                            type="md-menu" size="24"></i-icon>
                </i-menu-item>
                <i-menu-item name="2">
                        <span style="font-size: 20px;">
                            {{apiData.info && apiData.info.title}}
                        </span>
                    <i-icon type="md-repeat" size="20"></i-icon>
                </i-menu-item>
            </i-menu>
        </i-header>
        <i-layout :style="{marginTop:'64px',background: '#FFF'}">
            <i-sider ref="side1" hide-trigger
                     :style="{width:'250px',minWidth:'250px',maxWidth:'250px',height: '100vh',overflow: 'scroll',whiteSpace:'nowrap'}"
                     collapsible
                     :collapsed-width="0"
                     v-model="isCollapsed">
                <i-menu theme="dark" width="auto" @on-select="menuItemAction">
                    <i-menu-item :name="'home'">
                        <i-icon type="md-home"></i-icon>
                        首页
                    </i-menu-item>

                    <i-submenu :name="'m'+i" :key="i" v-for="(httpEntities,tagName, i) in apiData.collection">
                        <template slot="title">
                            <i-icon type="ios-pricetags"></i-icon>
                            {{tagName}}
                        </template>
                        <template v-for="httpEntity in httpEntities">
                            <i-menu-item :name="httpEntity.id" :key="httpEntity.id">
                                    <span v-if="httpEntity.method ==='GET'" style="color: #18BE6B;"
                                          class="http-method-tag">{{httpEntity.method}}</span>
                                <span v-else-if="httpEntity.method ==='POST'"
                                      class="http-method-tag" style="color: #FF9901;">{{httpEntity.method}}</span>
                                <span v-else-if="httpEntity.method ==='PUT'"
                                      class="http-method-tag" style="color: #2D8CF0;">{{httpEntity.method}}</span>
                                <span v-else-if="httpEntity.method ==='DELETE'"
                                      class="http-method-tag" style="color: #ED4015;">{{httpEntity.method}}</span>
                                <span v-else class="http-method-tag"
                                      style="color: #EEEEEE;">{{httpEntity.method}}</span>

                                {{httpEntity.name}}
                            </i-menu-item>
                        </template>
                    </i-submenu>
                </i-menu>
            </i-sider>
            <i-content :style="{padding: '24px', background: '#fff'}">
                <i-tabs>
                    <i-tab-pane label="API 文档" icon="md-document" :style="{height: '100vh',overflow: 'scroll'}">
                        <div>
                            <div>
                                <i-row class="no-border">
                                    <i-col>
                                        <h2 id="h2_1">接口说明</h2>
                                    </i-col>
                                    <i-col>
                                        <i-table :columns="apiInfoColumns" :data="apiInfo"
                                                 :show-header="false"></i-table>
                                    </i-col>
                                </i-row>

                                <!--参数信息-->
                                <i-row>
                                    <i-col>
                                        <h2 id="h2_2">请求参数</h2>
                                    </i-col>
                                    <i-col>
                                        <i-table border :columns="paramsColumns" :data="rootParams.props"></i-table>
                                    </i-col>
                                </i-row>

                                <template v-for="sub of subParams">
                                    <i-row :key="sub.name">
                                        <i-col>
                                            <h3>类型
                                                <i-icon type="md-arrow-dropright" size="20"></i-icon>
                                                {{sub.title}}
                                            </h3>
                                        </i-col>
                                        <i-col>
                                            <i-table border :columns="objectColumns" :data="sub.props"></i-table>
                                        </i-col>
                                    </i-row>
                                </template>

                                <!--响应信息-->
                                <i-row :style="{marginTop:'60px'}">
                                    <i-col>
                                        <h2 id="h2_3">响应信息</h2>
                                    </i-col>
                                    <i-col>
                                        <i-table border :columns="responsesColumns"
                                                 :data="rootResponses.props"></i-table>
                                    </i-col>
                                </i-row>

                                <template v-for="sub of subResponses">

                                    <i-row :key="sub.name">
                                        <i-col>
                                            <h3>类型
                                                <i-icon type="md-arrow-dropright" size="20"></i-icon>
                                                {{sub.title}}
                                            </h3>
                                        </i-col>
                                        <i-col>
                                            <i-table border :columns="objectColumns" :data="sub.props"></i-table>
                                        </i-col>
                                    </i-row>
                                </template>
                            </div>
                        </div>
                        <div>
                            <i-anchor show-ink>
                                <i-anchor-link href="#h2_1" title="接口说明"></i-anchor-link>
                                <i-anchor-link href="#h2_2" title="请求参数"></i-anchor-link>
                                <i-anchor-link href="#h2_3" title="响应信息"></i-anchor-link>
                            </i-anchor>
                        </div>
                    </i-tab-pane>
                    <i-tab-pane label="在线调试" icon="md-bug">Waiting...</i-tab-pane>
                </i-tabs>
            </i-content>
        </i-layout>
    </i-layout>
</template>
<script>
    import store from '@/store'
    import {findHttpEntity, findAllSchema, methodColumnRender} from '@/util/utils'

    export default {
        name: 'app',
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
<style>
    html {
        overflow-y: hidden;
    }

    .http-method-tag {
        font-size: 10px;
        font-weight: bold;
        width: 40px;
        display: inline-block;
        text-align: right;
        padding-right: 5px;
    }

    /*noinspection CssUnusedSymbol*/
    .row-padding-bottom .ivu-row {
        padding-bottom: 50px;
    }

    /*noinspection CssUnusedSymbol*/
    .no-border .ivu-table-wrapper {
        border: 0 solid #dcdee2;
    }

    .no-border .ivu-table-wrapper td {
        border: 0 solid #e8eaec;
    }

    /*noinspection CssUnusedSymbol*/
    .no-border .ivu-table:after {
        width: 0;
    }

</style>
