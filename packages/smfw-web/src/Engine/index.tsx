import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@material-ui/core';

import ElementNode, { ElementNodeTypes } from '../DS/ElementNode';
import * as EngineTypes from './types';

class Engine {
    pages: EngineTypes.PageOptions[];
    templates: { [key: string]: ElementNodeTypes.LoadOptions };
    layouts: { [key: string]: ElementNodeTypes.LoadOptions };
    views: { [key: string]: ElementNodeTypes.LoadOptions };
    themes: { [key: string]: EngineTypes.Theme };

    constructor() {
        this.pages = [];
        this.templates = {};
        this.layouts = {};
        this.views = {};
        this.themes = {};
    }

    addView(name: string, options: ElementNodeTypes.LoadOptions, map?: EngineTypes.ReplaceOptions) {
        const view = _.cloneDeep(options);
        ElementNode.replace(view, map);
        this.views[name] = view;
        return view;
    }

    addLayout(name: string, options: ElementNodeTypes.LoadOptions, map?: EngineTypes.ReplaceOptions) {
        const layout = _.cloneDeep(options);
        ElementNode.replace(layout, map);
        this.layouts[name] = layout;
        return layout;
    }

    addTemplate(name: string, layoutName: string, map?: EngineTypes.ReplaceOptions) {
        const template = _.cloneDeep(this.layouts[layoutName]);
        ElementNode.replace(template, map);
        this.templates[name] = template;
        return template;
    }

    addTheme(name: string, options: EngineTypes.Theme) {
        const theme = _.cloneDeep(options);
        this.themes[name] = theme;
        return theme;
    }

    addPage(
        options: EngineTypes.BasicPageOptions,
        templateName: string,
        themeName: string,
        map?: EngineTypes.ReplaceOptions
    ) {
        if (typeof this.templates[templateName] === 'undefined') {
            throw new Error(`this templateId (${templateName}) doesn't exists.`);
        }

        const template = _.cloneDeep(this.templates[templateName]);
        ElementNode.replace(template, map);

        const page = {
            title: options.title,
            path: options.path,
            page: template,
            themeName
        };
        this.pages.push(page);
        return page;
    }

    createPages(pages: EngineTypes.PageOptions[]) {
        const children: any[] = [];
        _.forEach(pages, (page: EngineTypes.PageOptions, i: number) => {
            const El = (props: any) => {
                const node = new ElementNode();
                node.load(page.page);
                return node.toComponent(props);
            };

            children.push(<Route key={i} path={page.path} element={<El />} />);
        });

        return <Routes>{children}</Routes>;
    }

    createRouter(themeName: string, themes: any) {
        return <Router>{this.createPages(themes[themeName])}</Router>;
    }

    createApp() {
        const themes: { [key: string]: any } = {};
        _.forEach(this.pages, (page: EngineTypes.PageOptions, _i: number) => {
            if (typeof themes[page.themeName] === 'undefined') {
                themes[page.themeName] = [];
            }
            themes[page.themeName].push(page);
        });

        _.forEach(themes, (pages: EngineTypes.PageOptions[], _i: string) => {
            pages.sort((a: EngineTypes.PageOptions, b: EngineTypes.PageOptions) => a.path.localeCompare(b.path));
        });

        const themeNames = _.keys(themes);
        const pages = themeNames.map((themeName: string, _i: number) => (
            <ThemeProvider key={themeName} theme={createTheme(this.themes[themeName])}>
                {this.createRouter(themeName, themes)}
            </ThemeProvider>
        ));

        return <React.Fragment key={1}>{pages}</React.Fragment>;
    }

    start(options: EngineTypes.StartOptions) {
        const { store } = options;

        ReactDOM.render(<Provider store={store}>{this.createApp()}</Provider>, document.getElementById('app'));
    }
}

export * as EngineTypes from './types';
export default Engine;
