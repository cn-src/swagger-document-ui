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
    import setCurrentSwaggerJson from '@/utils/api'

    export default {
        name: "SwaggerResources",
        data() {
            return {
                show: false,
                switchValue: ''
            }
        },
        methods: {
            setCurrentSwaggerJsonAction(url) {
                setCurrentSwaggerJson(url)
            }
        },
        computed: {
            swaggerResources: function () {
                return this.$store.state.swaggerResources
            }
        }
    }
</script>
