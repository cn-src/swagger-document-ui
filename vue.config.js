const swaggerResources = require('./tests/swagger-resources');
const swaggerJson = require('./tests/unit/utils/swagger.json');

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
    lintOnSave: undefined
};
