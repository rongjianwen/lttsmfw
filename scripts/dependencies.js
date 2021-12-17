const dependencies = [
    {
        files: [
            {
                url: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
                output: 'normalize@8.0.1.min.css'
            }
        ],
        destDir: 'normalize.css'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/jquery@3.3.1/dist/jquery.min.js',
                output: 'jquery@3.3.1.min.js'
            }
        ],
        destDir: 'jquery'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/lodash@4.17.21/lodash.min.js',
                output: 'lodash@4.17.21.min.js'
            }
        ],
        destDir: 'lodash'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/chroma-js@2.0.3/chroma.min.js',
                output: 'chroma-js@2.0.3.min.js'
            }
        ],
        destDir: 'chroma-js'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/react@17.0.2/umd/react.development.js',
                output: 'react@17.0.2.umd.development.js'
            },
            {
                url: 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
                output: 'react@17.0.2.umd.production.min.js'
            }
        ],
        destDir: 'react'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/history@5.1.0/umd/history.development.js',
                output: 'history@5.1.0.umd.development.js'
            },
            {
                url: 'https://unpkg.com/history@5.1.0/umd/history.production.min.js',
                output: 'history@5.1.0.umd.production.min.js'
            }
        ],
        destDir: 'history'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/react-router@6.0.2/umd/react-router.development.js',
                output: 'react-router@6.0.2.umd.development.js'
            },
            {
                url: 'https://unpkg.com/react-router@6.0.2/umd/react-router.production.min.js',
                output: 'react-router@6.0.2.umd.production.min.js'
            }
        ],
        destDir: 'react-router'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
                output: 'react-dom@17.0.2.umd.development.js'
            },
            {
                url: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
                output: 'react-dom@17.0.2.umd.production.min.js'
            }
        ],
        destDir: 'react-dom'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/react-router-dom@6.0.2/umd/react-router-dom.development.js',
                output: 'react-router-dom@6.0.2.umd.development.js'
            },
            {
                url: 'https://unpkg.com/react-router-dom@6.0.2/umd/react-router-dom.production.min.js',
                output: 'react-router-dom@6.0.2.umd.production.min.js'
            }
        ],
        destDir: 'react-router-dom'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/@material-ui/core@4.12.3/umd/material-ui.development.js',
                output: 'material-ui.core@4.12.3.umd.development.js'
            },
            {
                url: 'https://unpkg.com/@material-ui/core@4.12.3/umd/material-ui.production.min.js',
                output: 'material-ui.core@4.12.3.umd.production.min.js'
            }
        ],
        destDir: 'material-ui'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/redux@4.1.2/dist/redux.min.js',
                output: 'redux@4.1.2.min.js'
            }
        ],
        destDir: 'redux'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/react-redux@7.2.6/dist/react-redux.min.js',
                output: 'react-redux@7.2.6.min.js'
            }
        ],
        destDir: 'react-redux'
    },
    {
        files: [
            {
                url: 'https://unpkg.com/@reduxjs/toolkit@1.6.2/dist/redux-toolkit.umd.min.js',
                output: 'toolkit@1.6.2.umd.min.js'
            }
        ],
        destDir: 'redux-toolkit'
    }
];

module.exports = dependencies;
