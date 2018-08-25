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
                </div>
            </i-menu>
        </i-header>
        <i-layout>
            <i-sider hide-trigger :style="{background: '#fff'}">
                <i-menu theme="light" width="auto" :open-names="['1']" style="height: 100%" @on-select="menuItemAction">
                    <i-submenu :name="i" :key="i" v-for="(httpInfos,tag, i) in apiData.collection">
                        <template slot="title">
                            <i-icon type="ios-book"></i-icon>
                            {{tag}}
                        </template>

                        <template v-for="httpInfo in httpInfos">
                            <i-menu-item :name="httpInfo.index" :key="httpInfo.index">
                                <i-icon type="ios-bookmark"></i-icon>
                                {{httpInfo.name}}
                            </i-menu-item>
                        </template>
                    </i-submenu>
                </i-menu>
            </i-sider>
            <i-layout :style="{minHeight: '100vh'}">
                <i-content :style="{padding: '24px', background: '#fff'}">
                    <i-tabs>
                        <i-tab-pane label="API 文档">
                            <i-row>
                                <i-col span="24">
                                    <h2>接口说明</h2>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="6">
                                    http 请求：
                                </i-col>
                                <i-col span="4">
                                    <Tag checkable color="primary">{{httpInfo.method}}</Tag>
                                </i-col>
                                <i-col span="14">
                                    {{httpInfo.path}}
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    请求体类型: {{httpInfo.consumes}}
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    响应体类型: {{httpInfo.produces}}
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <h2>请求参数</h2>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <Table border :columns="paramsColumns" :data="httpInfo.params"></Table>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <h2>响应格式</h2>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <h3>200 - 正确响应</h3>
                                </i-col>
                            </i-row>
                            <i-row>
                                <i-col span="24">
                                    <Table border :columns="objectColumns" :data="responseOk.properties"></Table>
                                </i-col>
                            </i-row>
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
    import {findHttpInfo, findSchema} from '@/util/utils'

    export default {
        name: 'app',
        data() {
            return {
                paramsColumns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    }, {
                        title: '位置',
                        key: 'in'
                    }, {
                        title: '必须',
                        key: 'required'
                    }, {
                        title: '类型',
                        key: 'type'
                    }, {
                        title: '格式',
                        key: 'format'
                    }
                ], objectColumns: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    }, {
                        title: '类型',
                        key: 'type'
                    }, {
                        title: '格式',
                        key: 'format'
                    }
                ],
                httpInfo: {},
                responseOk: {}
            }
        },
        methods: {
            menuItemAction(index) {
                let httpInfo = findHttpInfo(store.state.apiData, index);
                this.$data.httpInfo = httpInfo
                let hasRef = (typeof(httpInfo.responses) !== undefined)
                    && (typeof(httpInfo.responses['200']) !== undefined)
                    && (typeof(httpInfo.responses['200'].schema['$ref']) !== undefined);
                if (hasRef) {
                    let schemaElement = httpInfo.responses['200'].schema['$ref'];
                    let responseOk = findSchema(store.state.apiData, schemaElement);
                    this.$data.responseOk = responseOk;
                } else {
                    this.$data.responseOk = {}
                }
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
</style>
