module.exports = {
    $schema: 'http://json.schemastore.org/prettierrc',
    arrowParens: 'always',
    jsxSingleQuote: true,
    endOfLine: 'lf',
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json'
            }
        },
        {
            files: 'docs/src/examples/**/*.js',
            options: {
                printWidth: 80
            }
        }
    ]
};
