module.exports = {
	root: true,
	rules: {
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 4,
			},
		],
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
