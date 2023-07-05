module.exports = {
    root: true,
    rules: {
        'prettier/prettier': [
            'off',
            {
                useTabs: false,
                tabWidth: 4,
            },
        ],
        'quotes': [2, 'single'],
        'no-unused-vars': 'error',
        'vue/valid-template-root': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', '401', '404'],
            },
        ],
    },
    extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
}
