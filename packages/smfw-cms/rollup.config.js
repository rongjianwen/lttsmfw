const path = require('path');
const pkg = require('./package.json');
const createRollupConfig = require('../../configs/create-rollup-config');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const distDir = path.resolve(__dirname, './build');
const { libname } = pkg;

const config = [
    createRollupConfig({
        projectDir: __dirname,
        distDir: `${distDir}/umd`,
        filename: isDev ? `${libname}.umd.development` : `${libname}.umd.production.min`,
        libname,
        format: 'umd',
        useDefaultExternals: true,
        externals: isDev
            ? {}
            : {
                  '@smfw/web': 'SmfwWEB'
              }
    })
];

module.exports = config;
