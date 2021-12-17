import * as ElementNodeTypes from './types';
declare class ElementNode {
    id: string;
    props: {
        [key: string]: any;
    };
    element: any;
    children: ElementNode[];
    static replace(element: ElementNodeTypes.LoadOptions, map?: ElementNodeTypes.ReplaceOptions, depth?: number): ElementNodeTypes.LoadOptions;
    constructor();
    load(options: ElementNodeTypes.LoadOptions): void;
    toComponent(props?: any): any;
}
export * as ElementNodeTypes from './types';
export default ElementNode;
