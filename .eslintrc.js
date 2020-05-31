module.exports = {
	env: {
		node: true
	},
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['react', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:react/recommended'
	],
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'react/no-unescaped-entities': 'off',
		'react/jsx-uses-vars': 'warn',
		'react/jsx-uses-react': 'warn',
		'react/prop-types': 'off'
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
