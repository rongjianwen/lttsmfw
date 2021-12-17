import _ from 'lodash';

import { createTheme } from '@material-ui/core';
import chroma from 'chroma-js';

const globals = {
    padding: '0.5rem',
    fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
    primaryBackgroundColor: '#2d4a77',
    secondaryBackgroundColor: chroma('#2d4a77').brighten(0.4).hex()
};

const theme = _.merge(
    createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
        },
        palette: {
            primary: {
                main: 'rgb(33, 111, 193)'
            }
        }
    }),
    {
        header: {
            height: '3rem',
            backgroundColor: globals.primaryBackgroundColor,
            color: '#fff'
        },
        logobar: {
            fontSize: '1.2rem',
            width: '12rem'
        },
        navbar: {
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        navbarPopoverPaper: {
            width: '12rem'
        },
        navMenu: {},
        sidebar: {
            width: '12rem',
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        extrabar: {
            backgroundColor: globals.secondaryBackgroundColor,
            color: '#fff'
        },
        extrabarMenu: {},
        extrabarPopoverPaper: {
            width: '12rem'
        },
        workspace: {
            backgroundColor: '#fff',
            color: '#000'
        },
        footer: {
            backgroundColor: '#ececec',
            color: 'rgb(40, 40, 40)',
            fontSize: '0.8rem'
        },
        copyrightText: {
            fontSize: '0.8rem',
            color: 'rgb(68, 67, 67)'
        },
        globals
    }
);

export default theme;
