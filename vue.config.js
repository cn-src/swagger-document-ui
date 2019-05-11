const swaggerResources = require('./tests/swagger-resources');
const swaggerJson = require('./tests/unit/utils/swagger.json');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: '',
    indexPath: 'swagger-ui.html',
    assetsDir: 'webjars/swagger-document-ui',
    devServer: {
        openPage: '/swagger-ui.html',
        open: true,
        proxy: 'http://swagger-bootstrap-ui.xiaominfo.com',
        before: function(app) {
            app.get('/swagger-resources.json', function(req, res) {
                res.json(swaggerResources);
            });
            app.get('/swagger.json', function(req, res) {
                res.json(swaggerJson);
            });
        }
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new CompressionPlugin({ exclude: /\/*.html/ })]
            };
        }
    }
};
