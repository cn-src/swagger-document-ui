<template>
  <AutoComplete
    v-model="keyword"
    @on-search="search"
    icon="ios-search"
    placeholder="搜索 API"
    style="width:300px">
    <div style="height: 300px;overflow-y: scroll;">
      <Option v-for="e in entities" :value="e.name" :key="e.id">
        <MethodTag :method="e.method"/>
        <span style="">{{ e.name }}</span><br>
        <span style="color: #a6a9aa">{{ e.path }}</span>
      </Option>
    </div>
  </AutoComplete>
</template>
<script>
    import Fuse from 'fuse.js'
    import store from '@/store'
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
            }
        }
    }
    const content = _.flatMap(store.state.currentSwaggerJson.collection);
    const options = {
        keys: [
            {name: 'name',},
            {name: 'namePinyin'},
            {name: 'path'},
            {name: 'tag'},
            {name: 'tagPinyin'},
        ]
    };
    const fuse = new Fuse(content, options);

</script>
<style>

</style>
