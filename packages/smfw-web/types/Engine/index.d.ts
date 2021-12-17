import { ElementNodeTypes } from '../DS/ElementNode';
import * as EngineTypes from './types';
declare class Engine {
    pages: EngineTypes.PageOptions[];
    templates: {
        [key: string]: ElementNodeTypes.LoadOptions;
    };
    layouts: {
        [key: string]: ElementNodeTypes.LoadOptions;
    };
    views: {
        [key: string]: ElementNodeTypes.LoadOptions;
    };
    themes: {
        [key: string]: EngineTypes.Theme;
    };
    constructor();
    addView(name: string, options: ElementNodeTypes.LoadOptions, map?: EngineTypes.ReplaceOptions): ElementNodeTypes.LoadOptions;
    addLayout(name: string, options: ElementNodeTypes.LoadOptions, map?: EngineTypes.ReplaceOptions): ElementNodeTypes.LoadOptions;
    addTemplate(name: string, layoutName: string, map?: EngineTypes.ReplaceOptions): ElementNodeTypes.LoadOptions;
    addTheme(name: string, options: EngineTypes.Theme): EngineTypes.Theme;
    addPage(options: EngineTypes.BasicPageOptions, templateName: string, themeName: string, map?: EngineTypes.ReplaceOptions): {
        title: string;
        path: string;
        page: ElementNodeTypes.LoadOptions;
        themeName: string;
    };
    createPages(pages: EngineTypes.PageOptions[]): JSX.Element;
    createRouter(themeName: string, themes: any): JSX.Element;
    createApp(): JSX.Element;
    start(options: EngineTypes.StartOptions): void;
}
export * as EngineTypes from './types';
export default Engine;
