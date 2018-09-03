<template>
  <Modal
    v-model="show"
    title="选择 Swagger API">
    <CellGroup @on-click="setCurrentSwaggerJsonAction">
      <Cell :title="sr.name" :label="sr.url" :name="sr.url" v-for="sr of swaggerResources" :key="sr.url"/>
    </CellGroup>
  </Modal>
</template>

<script>
    import api from '@/utils/api'

    export default {
        name: "SwaggerResources",
        data() {
            return {
                show: false
            }
        },
        methods: {
            setCurrentSwaggerJsonAction(url) {
                api.setCurrentSwaggerJson(url);
                this.show = false;
                this.$router.push('/');
            }
        },
        computed: {
            swaggerResources: function () {
                return this.$store.state.swaggerResources
            }
        }
    }
</script>
