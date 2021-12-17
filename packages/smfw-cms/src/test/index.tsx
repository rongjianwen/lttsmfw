import _ from 'lodash';
import { templates, layouts, views, themes } from '@smfw/web';

import TestEngine from './TestEngine';
import store from './store';

const ROOT_URL = process.env.ROOT_URL ? process.env.ROOT_URL : '';

const engine = new TestEngine();

_.forEach(themes, (v: any, i: string) => {
    engine.addTheme(`themes.${i}`, v);
});

_.forEach(views.classic, (v: any, i: string) => {
    engine.addView(`views.classic.${i}`, v);
});

_.forEach(layouts.classic, (v: any, i: string) => {
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
