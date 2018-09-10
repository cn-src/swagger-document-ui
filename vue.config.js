const swaggerResources = require("./tests/swagger-resources");

module.exports = {
    filenameHashing: false,

    pages: {
        'swagger-document-ui': {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'API 文档'
        }
    },
    devServer: {
        proxy: 'http://swagger-bootstrap-ui.xiaominfo.com',
        before: function (app) {
            app.get('/swagger-resources.json', function (req, res) {
                res.json(swaggerResources);
            });
        }
    },
    lintOnSave: undefined
};
