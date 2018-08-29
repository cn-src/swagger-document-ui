module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/strongly-recommended',
        'eslint:recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/max-attributes-per-line': 'off',
        "vue/no-parsing-error": [2, {"x-invalid-end-tag": false}]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
