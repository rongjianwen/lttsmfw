module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: 'false',
        babelOptions: {
            configFile: './.babelrc.js'
        }
    },
    extends: ['airbnb', 'prettier', 'plugin:json/recommended'],
    env: {
        browser: true
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],

        'no-param-reassign': 0,
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'newline-per-chained-call': 'off',
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        complexity: ['warn', 10],
        'global-require': 'off',
        'lines-between-class-members': 'off',
        'no-console': 'error',
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true
            }
        ],
        'no-return-assign': ['error', 'except-parens'],
        'no-underscore-dangle': 'off',
        'padded-blocks': [
            'error',
            {
                blocks: 'never',
                switches: 'never',
                classes: 'never'
            }
        ],
        'prefer-destructuring': 'off',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/label-has-for': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'import/named': 'off',
        'import/no-cycle': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'off',
        'import/extensions': 'off',
        'react/button-has-type': 'off',
        'react/destructuring-assignment': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-curly-newline': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/prefer-stateless-function': 'off',
        'react/no-unused-prop-types': 'off',
        'react/sort-comp': 'off',
        'react/state-in-constructor': 'off',
        'react/require-default-props': 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'react/function-component-definition': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-boolean-value': 'off'
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-empty-interface': 'off'
            }
        },
        {
            files: ['rollup.config.js'],
            rules: {
                'import/no-relative-packages': 'off'
            }
        }
    ],
    ignorePatterns: [
        '*.d.ts',
        '!.babel.config.js',
        '!.prettierrc.js',
        '!.babelrc.js',
        '!.eslintrc.js',
        '!lint-staged.config.js',
        '!.vscode/settings.json',
        '!.vscode/tasks.json',
        '!.vscode/launch.json',
        '!.vscode/extensions.json'
    ]
};
