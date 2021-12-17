const { merge } = require('webpack-merge');
const pkg = require('./package.json');
const createWebpackConfig = require('../../configs/create-webpack-test-config');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const config = merge(
    createWebpackConfig({
        projectDir: __dirname,
        port: 3001,
        pkg,
        useDefaultExternals: true,
        externals: isDev
            ? {}
            : {
                  '@smfw/web': 'SmfwWEB'
              }
    }),
    {}
);

module.exports = config;
