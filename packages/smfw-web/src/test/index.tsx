import _ from 'lodash';

import * as templates from '../templates';
import * as layouts from '../layouts';
import * as views from '../views';
import * as themes from '../themes';

import store from './store';
import TestEngine from './TestEngine';
import ElementNode from '../DS/ElementNode';
import StyledComponent from '../utils/StyledComponent';

const ROOT_URL = process.env.ROOT_URL ? process.env.ROOT_URL : '';

const engine = new TestEngine();

_.forEach(themes, (v: any, i: string) => {
    const theme = _.merge(v, { globals: { outlinerWidth: '240px' } });
    engine.addTheme(`themes.${i}`, theme);
});

_.forEach(views.classic, (v: any, i: string) => {
    engine.addView(`views.classic.${i}`, v);
});

_.forEach(layouts.classic, (v: any, i: string) => {
    if (i === 'common') {
        ElementNode.replace(v, {
            sidebar: {
                props: {
                    styledElement: StyledComponent('div', (theme: any) => ({
                        width: theme.sidebar.width,
                        backgroundColor: theme.sidebar.backgroundColor,
                        color: theme.sidebar.color,
                        [theme.breakpoints.down('xs')]: {
                            width: `calc(100% - ${theme.globals.outlinerWidth})`,
                            height: `calc(100% - ${theme.header.height})`,
                            position: 'absolute',
                            backgroundColor: theme.header.backgroundColor
                        }
                    }))
                }
            }
        });
    }
    engine.addLayout(`layouts.classic.${i}`, v);
});

_.forEach(templates.classic, (v: any, i: string) => {
    engine.addTemplate(`templates.classic.${i}`, `layouts.classic.${v.__layout}`, v);
});

_.forEach(layouts.classic, (v: any, i: string) => {
    engine.addTemplate(`layouts.classic.${i}`, `layouts.classic.${i}`, {});
});

const pages = [
    {
        path: `${ROOT_URL}/template/notFound`,
        templateName: 'templates.classic.notFound',
        themeName: 'themes.classic',
        title: 'Templates - Not Found'
    },
    {
        path: `${ROOT_URL}/template/login`,
        templateName: 'templates.classic.login',
        themeName: 'themes.classic',
        title: 'Templates - Login'
    },
    {
        path: `${ROOT_URL}/template/home`,
        templateName: 'templates.classic.manager',
        themeName: 'themes.classic',
        title: 'Templates - Home'
    },
    {
        path: `${ROOT_URL}/layout/basic`,
        templateName: 'layouts.classic.basic',
        themeName: 'themes.classic',
        title: 'Layouts - Basic'
    },
    {
        path: `${ROOT_URL}/layout/common`,
        templateName: 'layouts.classic.common',
        themeName: 'themes.classic',
        title: 'Layouts - Common'
    },
    {
        path: `${ROOT_URL}`,
        templateName: 'templates.classic.manager',
        themeName: 'themes.classic',
        title: 'Pages - Home'
    }
];

_.forEach(pages, (v: any, _i: number) => {
    engine.addPage(
        {
            title: v.title,
            path: v.path
        },
        v.templateName,
        v.themeName
    );
});

engine.start({ store });
