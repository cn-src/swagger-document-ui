<template>
  <AutoComplete
    v-model="keyword"
    @on-search="search"
    clearable
    icon="ios-search"
    placeholder="搜索 API"
    style="width:300px">
    <div style="height: 300px;overflow-y: scroll;">
      <Option v-for="e in entities" :value="e.name" :key="e.id">
        <!-- AutoComplete 无法通过搜索 name 而拿到 id，故自定义点击事件-->
        <div @click="select(e.id,e.tag)">
          <MethodTag :method="e.method"/>
          <span style="">{{ e.name }}</span><br>
          <span style="color: #a6a9aa">{{ e.path }}</span>
        </div>
      </Option>
    </div>
  </AutoComplete>
</template>
<script>
    import Fuse from 'fuse.js'
    import _ from 'lodash'
    import MethodTag from '@/components/MethodTag'

    export default {
        name: 'SearchInput',
        components: {MethodTag},
        data() {
            return {
                keyword: '',
                entities: []
            }
        },
        methods: {
            search(keyword) {
                this.entities = _.slice(fuse.search(keyword), 0, 20)
            },
            select(entityId, entityTag) {
                this.$router.push(`/entity/${entityId}`);
                this.$root.activeMenu = {submenu: [entityTag], menuItem: entityId}
            }
        },
        watch: {
            '$root.currentSwaggerJson.collection': function (val) {
                content = _.flatMap(val);
                fuse = new Fuse(content, options);
            }
        },
        created(){
            content = _.flatMap(this.$root.currentSwaggerJson.collection);
        }
    }
    let content = [];
    const options = {
        keys: [
            {name: 'name', weight: 0.3},
            {name: 'namePinyin', weight: 0.3},
            {name: 'tag', weight: 0.1},
            {name: 'tagPinyin', weight: 0.2},
            {name: 'path', weight: 0.1},
        ]
    };
    let fuse = new Fuse(content, options);

</script>
<style>

</style>
