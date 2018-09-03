<template>
  <Modal
    v-model="show"
    title="选择 Swagger API"
    @on-ok="'oc'"
    @on-cancel="'cancel'">
    <p>Content of dialog</p>
  </Modal>
</template>

<script>
    export default {
        name: "SwaggerResources",
        data() {
            return {
                show: false
            }
        }
    }
</script>
