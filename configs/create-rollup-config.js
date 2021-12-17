const path = require('path');
const cleanup = require('rollup-plugin-cleanup');
const commonjs = require('@rollup/plugin-commonjs');
const eslint = require('@rollup/plugin-eslint');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const yaml = require('@rollup/plugin-yaml');
const externalGlobals = require('rollup-plugin-external-globals');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');
const summary = require('rollup-plugin-summary');

const defaultExternals = require('./defaultExternals');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

function createRollupConfig(options) {
    const { projectDir, distDir, filename, libname, format, useDefaultExternals } = options;
    const externals = useDefaultExternals
        ? {
              ...defaultExternals,
              ...options.externals
          }
        : options.externals;
    const suffix = options.suffix ? options.suffix : 'js';

    return {
        input: path.resolve(projectDir, './src/index.ts'),
        output: {
            file: path.resolve(distDir, `${filename}.${suffix}`),
            format,
            name: libname,
            sourcemap: true
        },
        plugins: [
            json({
                compact: true,
                indent: '  ',
                preferConst: true
            }),
            yaml(),
            eslint({
                configFile: path.resolve(projectDir, '../../.eslintrc.js')
            }),
            typescript({
                clean: true,
                tsconfig: path.resolve(projectDir, './tsconfig.json'),
                useTsconfigDeclarationDir: true
            }),
            nodeResolve(),
            commonjs(),
            externalGlobals({
                ...defaultExternals,
                ...externals
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            !isDev &&
                cleanup({
                    comments: 'none',
                    extensions: ['.ts', '.tsx', '.js', '.jsx']
                }),
            !isDev && terser(),
            summary()
        ].filter(Boolean)
    };
}

module.exports = createRollupConfig;
