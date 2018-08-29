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
        'vue/attribute-hyphenation': 'warning',
        'vue/html-indent': 'warning',
        'vue/max-attributes-per-line': 'off',
        'vue/no-parsing-error': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
