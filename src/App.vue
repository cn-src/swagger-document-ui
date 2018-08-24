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
                <i-menu theme="light" width="auto" :open-names="['1']" style="height: 100%">
                    <i-submenu :name="i" :key="i" v-for="(collValue,collKey, i) in apiData.collection">
                        <template slot="title">
                            <i-icon type="ios-book"></i-icon>
                            {{collKey}}
                        </template>

                        <template v-for="(item,j) in collValue">
                            <i-menu-item :name="i+'-'+j" :key="j">
                                <i-icon type="ios-bookmark"></i-icon>
                                {{item.name}}
                            </i-menu-item>
                        </template>
                    </i-submenu>
                </i-menu>
            </i-sider>
            <i-layout :style="{minHeight: '100vh'}">
                <i-content :style="{padding: '24px', background: '#fff'}">
                    <i-tabs>
                        <i-tab-pane label="API 文档">API 文档</i-tab-pane>
                        <i-tab-pane label="在线调试"></i-tab-pane>
                    </i-tabs>
                </i-content>
            </i-layout>
        </i-layout>
    </i-layout>
</template>
<script>
    import store from './store'

    export default {
        name: 'app',
        data() {
            return {
                split1: 0.5
            }
        },
        methods: {},
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
