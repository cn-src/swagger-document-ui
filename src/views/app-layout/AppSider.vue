<template lang='pug'>
    Sider(
    ref='side1' v-model='isCollapsed'
    style='overflow: auto;'
    breakpoint='md'
    :width='270'
    :collapsed-width='0'
    hide-trigger
    collapsible
    )
        Menu(
        @on-select='menuItemAction'
        :open-names='activeSubmenu'
        :active-name='activeMenuItem'
        ref='navMenu'
        theme='dark' width='auto' accordion
        )
            MenuItem(:name="'Home'")
                Icon(type='md-home') 首页
            Submenu(v-for='(httpEntities,tagName, i) in swaggerCollection'
            :name='tagName' :key='i')
                template(slot='title')
                    Icon(type='ios-pricetags') {{ tagName }}
                template(v-for='httpEntity in httpEntities')
                    MenuItem(:name="httpEntity.id" :key="httpEntity.id")
                        MethodTag(:method="httpEntity.method" :key="httpEntity.id")
                        template(v-if="httpEntity.deprecated")
                            span(:key="httpEntity.id" style="color: #787a7b")
                                del {{ httpEntity.name }}
                        template(v-else)
                            | {{ httpEntity.name }}
</template>

<script>
    import MethodTag from '@/components/MethodTag'

    export default {
        name: 'AppSider',
        components: {MethodTag}
    }
</script>

