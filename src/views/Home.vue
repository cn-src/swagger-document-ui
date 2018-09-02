<template>
  <div style="height: 85vh; overflow: auto; padding: 24px 24px 50px;">
    <Divider>{{ apiTitle }}</Divider>
    <Table :columns="apiInfoColumns" :data="apiInfoItems" border
           :show-header="false"/>
  </div>
</template>

<script>
    import store from '@/store'

    export default {
        name: "Home",
        data() {
            return {
                apiInfoColumns: [
                    {title: '', key: 'k1', width: 110, align: 'right'},
                    {title: '', key: 'k2', render: methodColumnRender}
                ]
            }
        },
        computed: {
            apiTitle() {
                if (!store.state.apiData || !store.state.apiData.info) {
                    return ''
                }
                return store.state.apiData.info.title;
            },
            apiInfoItems() {
                if (!store.state.apiData || !store.state.apiData.info) {
                    return []
                }
                const info = store.state.apiData.info;

                return [
                    {k1: '描述:', k2: info.description},
                    {k1: '版本:', k2: info.version},
                    {k1: '许可证:', k2: info.license},
                    {k1: '服务条款:', k2: info.termsOfService},
                    {k1: '联系开发人员:', k2: info.contact.email},
                    {k1: 'host:', k2: info.host},
                    {k1: 'basePath:', k2: info.basePath}
                ]
            }
        }
    }

    function methodColumnRender(h, params) {
        if (params.row.k1 === '许可证:') {
            const license = params.row.k2;
            return h('a', {
                attrs: {
                    target: '_blank',
                    href: license.url
                }
            }, license.name);
        }
        else if (params.row.k1 === '服务条款:') {
            return h('a', {
                attrs: {
                    target: '_blank',
                    href: params.row.k2
                }
            }, params.row.k2);
        } else if (params.row.k1 === '联系开发人员:') {
            return h('a', {
                attrs: {
                    target: '_blank',
                    href: 'mailto:'+params.row.k2
                }
            }, params.row.k2);
        }
        else {
            return h('span', {}, params.row.k2)
        }
    }
</script>

<style scoped>

</style>
