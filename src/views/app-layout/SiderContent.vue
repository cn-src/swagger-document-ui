<template lang='pug'>
    Menu(
    @on-select='menuItemAction'
    :open-names='activeSubmenu'
    :active-name='activeMenuItem'
    ref='navMenu'
    theme='dark' width='auto' accordion
    )
        MenuItem(:name="'Home'")
            Icon(type='md-home')
            | 首页
        Submenu(v-for='(httpEntities,tagName, i) in swaggerCollection'
        :name='tagName' :key='i')
            template(slot='title')
                Icon(type='ios-pricetags')
                | {{ tagName }}
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
        name: 'SiderContent',
        components: {MethodTag},
        methods: {
            menuItemAction(menuItemName) {
                if (menuItemName === 'Home') {
                    this.$router.push('/');
                    return
                }
                if (menuItemName.startsWith('httpEntity')) {
                    this.$router.push(`/entity/${menuItemName}`);
                }
            }
        },
        computed: {
            swaggerCollection() {
                const currentSwaggerJson = this.$root.currentSwaggerJson;
                return currentSwaggerJson && currentSwaggerJson.collection || {}
            },
            activeSubmenu() {
                return this.$root.activeMenu.submenu;
            },
            activeMenuItem() {
                return this.$root.activeMenu.menuItem;
            }
        },
        watch: {
            '$root.activeMenu.submenu': function () {
                this.$nextTick(() => {
                    this.$refs.navMenu.updateOpened();
                })
            }
        }
    }
</script>

