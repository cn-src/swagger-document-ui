const path = require("path");

// 脚手架已默认配置，此处是为了让 IDE 识别而添加。
module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
};
