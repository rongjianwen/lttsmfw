const { merge } = require('webpack-merge');
const pkg = require('./package.json');
const createWebpackConfig = require('../../configs/create-webpack-test-config');

const config = merge(
    createWebpackConfig({
        projectDir: __dirname,
        port: 3000,
        pkg,
        useDefaultExternals: true,
        externals: {}
    }),
    {}
);

module.exports = config;
