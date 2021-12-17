import * as ElementNodeTypes from '../DS/ElementNode/types';

export interface Theme {
    [key: string]: any;
}

export interface PageOptions {
    title: string;
    path: string;
    page: ElementNodeTypes.LoadOptions;
    themeName: string;
}

export interface BasicPageOptions {
    title: string;
    path: string;
}

export interface ReplaceOptions {
    [key: string]: ElementNodeTypes.LoadOptions;
}

export interface StartOptions {
    store: any;
}
