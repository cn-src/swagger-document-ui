<template>
  <Modal
    v-model="show"
    title="选择 Swagger API"
    @on-ok="'oc'"
    @on-cancel="'cancel'">
    <CellGroup>
      <Cell :title="sr.name" :label="sr.url" v-for="sr of swaggerResources" :key="sr.url"/>
    </CellGroup>
  </Modal>
</template>

<script>
    export default {
        name: "SwaggerResources",
        data() {
            return {
                show: false,
                switchValue: ''
            }
        },
        computed: {
            swaggerResources: function () {
                return this.$store.state.swaggerResources
            }
        }
    }
</script>
