<template lang="pug">
    Modal(v-model='show' title='选择 Swagger API')
        CellGroup(@on-click='setCurrentSwaggerJsonAction')
            Cell(
            v-for='sr of swaggerResources' :key='sr.url'
            :title='sr.name' :label='sr.url' :name='sr.url'
            )
</template>

<script>
    import api from '../utils/api'

    export default {
        name: "SwaggerResources",
        data() {
            return {
                show: false
            }
        },
        methods: {
            setCurrentSwaggerJsonAction(url) {
                api.setCurrentSwaggerJson(url, this, () => {
                    this.show = false;
                    this.$router.push('/');
                });
            }
        },
        computed: {
            swaggerResources: function () {
                return this.$root.swaggerResources
            }
        }
    }
</script>
<style>
    /* 修补压缩图标字体后造成的图标移位问题 */
    .ivu-modal .ivu-icon-ios-close {
        top: -13px !important;
    }
</style>
