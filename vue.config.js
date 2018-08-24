module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('iview-loader')
            .loader('iview-loader')
            .tap(() => {
                return {
                    prefix: true
                }
            })
            .end()
    }
}
