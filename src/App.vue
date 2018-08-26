<template>
    <i-layout :style="{minHeight: '100vh'}">
        <i-header>
            <i-menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo"></div>
                <div class="layout-nav">
                    <i-menu-item name="1">
                        <i-icon type="ios-navigate"></i-icon>
                        Item 1
                    </i-menu-item>
                    <i-menu-item name="2">
                        <i-icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}"
                                type="md-menu" size="24"></i-icon>
                    </i-menu-item>
                </div>
            </i-menu>
        </i-header>
        <i-layout>
            <i-sider ref="side1" hide-trigger :style="{background: '#fff'}" collapsible :collapsed-width="0"
                     v-model="isCollapsed">
                <i-menu theme="light" width="auto" :open-names="['1']" style="height: 100%" @on-select="menuItemAction">
                    <i-submenu :name="'m'+i" :key="i" v-for="(httpInfos,tag, i) in apiData.collection">
                        <template slot="title">
                            <i-icon type="ios-book"></i-icon>
                            {{tag}}
                        </template>
                        <!--TODO 对齐方式-->
                        <template v-for="httpInfo in httpInfos">
                            <i-menu-item :name="httpInfo.index" :key="httpInfo.index">
                                <span v-if="httpInfo.method ==='GET'"
                                      style="font-size: 10px;font-weight:bold;color: #18BE6B;">{{httpInfo.method}}</span>
                                <span v-else-if="httpInfo.method ==='POST'"
                                      style="font-size: 10px;font-weight:bold;color: #FF9901;">{{httpInfo.method}}</span>
                                <span v-else-if="httpInfo.method ==='PUT'"
                                      style="font-size: 10px;font-weight:bold;color: #2D8CF0;">{{httpInfo.method}}</span>
                                <span v-else-if="httpInfo.method ==='DELETE'"
                                      style="font-size: 10px;font-weight:bold;color: #ED4114;">{{httpInfo.method}}</span>
                                <span v-else style="font-size: 10px;font-weight:bold;color: #FFF1F0;">{{httpInfo.method}}</span>
                                {{httpInfo.name}}
                            </i-menu-item>
                        </template>
                    </i-submenu>
                </i-menu>
            </i-sider>
            <i-layout :style="{minHeight: '100vh'}">
                <i-content :style="{padding: '24px', background: '#fff'}">

                    <i-tabs>
                        <i-tab-pane label="API 文档" class="row-padding-bottom">

                            <i-row class="no-border">
                                <i-col>
                                    <h2>接口说明</h2>
                                </i-col>
                                <i-col>
                                    <i-table :columns="apiInfoColumns" :data="apiInfo" :show-header="false"></i-table>
                                </i-col>
                            </i-row>

                            <!--参数信息-->
                            <i-row>
                                <i-col>
                                    <h2>请求参数</h2>
                                </i-col>
                                <i-col>
                                    <i-table border :columns="paramsColumns" :data="rootParams.props"></i-table>
                                </i-col>
                            </i-row>

                            <template v-for="sub of subParams">
                                <i-row :key="sub.name">
                                    <i-col>
                                        <h3>类型：{{sub.title}}</h3>
                                    </i-col>
                                    <i-col>
                                        <i-table border :columns="objectColumns" :data="sub.props"></i-table>
                                    </i-col>
                                </i-row>
                            </template>

                            <!--响应信息-->
                            <i-row>
                                <i-col>
                                    <h2>响应信息</h2>
                                </i-col>
                                <i-col>
                                    <i-table border :columns="responsesColumns" :data="rootResponses.props"></i-table>
                                </i-col>
                            </i-row>

                            <template v-for="sub of subResponses">

                                <i-row :key="sub.name">
                                    <i-col>
                                        <h3>类型：{{sub.title}}</h3>
                                    </i-col>
                                    <i-col>
                                        <i-table border :columns="objectColumns" :data="sub.props"></i-table>
                                    </i-col>
                                </i-row>
                            </template>

                        </i-tab-pane>
                        <i-tab-pane label="在线调试"></i-tab-pane>
                    </i-tabs>
                </i-content>
            </i-layout>
        </i-layout>
    </i-layout>
</template>
<script>
    import store from '@/store'
    import {findHttpInfo, findAllSchema, methodColumnRender} from '@/util/utils'

    export default {
        name: 'app',
        data() {
            return {
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
                httpInfo: {},
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
            menuItemAction(index) {

                let httpInfo = findHttpInfo(store.state.apiData, index);
                this.$data.httpInfo = httpInfo;

                this.$data.apiInfoColumns = [
                    {
                        title: '',
                        key: 'k1',
                        width: 110,
                        align: 'right',
                        render: methodColumnRender,
                    }, {'title': '', 'key': 'k2'}];

                this.$data.apiInfo = [{
                    'k1': httpInfo.method,
                    'k2': httpInfo.path
                }, {
                    'k1': '请求体类型：',
                    'k2': httpInfo.consumes
                }, {
                    'k1': '响应体类型：',
                    'k2': httpInfo.produces
                }];

                this.$data.rootParams = httpInfo.params;
                const subParams = [];
                findAllSchema(httpInfo.params, store.state.apiData.definitions, subParams);
                this.$data.subParams = subParams;

                this.$data.rootResponses = httpInfo.responses;
                const subResponses = [];
                findAllSchema(httpInfo.responses, store.state.apiData.definitions, subResponses);
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
        height: 100%;
    }

    body {
        height: 100%;
    }

    .row-padding-bottom .ivu-row {
        padding-bottom: 50px;
    }

    .no-border .ivu-table-wrapper {
        border: 0 solid #dcdee2;
    }

    .no-border .ivu-table-wrapper td {
        border: 0 solid #e8eaec;
    }

    .no-border .ivu-table:after {
        width: 0;
    }

</style>
