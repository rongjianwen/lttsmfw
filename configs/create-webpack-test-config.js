const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lerna = require('../lerna.json');

const defaultExternals = require('./defaultExternals');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

function createWebpackTestConfig(options) {
    const { projectDir, port, pkg, useDefaultExternals } = options;
    const externals = useDefaultExternals
        ? {
              ...defaultExternals,
              ...options.externals
          }
        : options.externals;

    const version = lerna.version;
    const libname = pkg.libname;
    const ROOT_URL = mode !== 'development' ? `/v${version}/${libname}` : '';
    const ENV = {
        NODE_ENV: mode,
        VERSION: version,
        ROOT_URL,
        VENDOR_URL: `${ROOT_URL}/vendor`
    };

    return {
        entry: './src/test/index.tsx',
        output: {
            path: path.join(projectDir, 'build/test'),
            filename: 'bundle.js',
            publicPath: `${ROOT_URL}/`
        },
        mode,
        devtool: isDev ? 'eval-source-map' : 'source-map',
        externals: isDev ? {} : externals,
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        },
        devServer: {
            port,
            hot: true,
            historyApiFallback: true,
            static: path.join(projectDir, 'static'),
            compress: true
        },
        module: {
            rules: [
                {
                    test: /\.([t|j]sx?)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader']
                },
                {
                    test: /\.(css|s[ac]ss)$/,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser'
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(ENV)
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                title: `${libname} - Demo: ${version}`,
                template: path.join(projectDir, 'src', 'test', 'index.html'),
                env: ENV
            })
        ]
    };
}

module.exports = createWebpackTestConfig;
