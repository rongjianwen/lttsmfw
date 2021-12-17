import React from 'react';
import _ from 'lodash';
import * as ElementNodeTypes from './types';

class ElementNode {
    id: string;
    props: { [key: string]: any };
    element: any;
    children: ElementNode[];

    static replace(element: ElementNodeTypes.LoadOptions, map?: ElementNodeTypes.ReplaceOptions, depth = 0) {
        if (_.isEmpty(map)) {
            return element;
        }

        if (!_.isEmpty(element.children)) {
            _.forEach(element.children, (item: ElementNodeTypes.LoadOptions, _i: number) => {
                ElementNode.replace(item, map, depth + 1);
            });
        }

        _.forEach(map, (item: any, id: string) => {
            if (id === 'root' && depth === 0) {
                _.merge(element, item);
            }

            if (element.id === id) {
                _.merge(element, item);
            }
        });
        return element;
    }

    constructor() {
        this.id = '';
        this.children = [];
        this.props = {};
        this.element = null;
    }

    load(options: ElementNodeTypes.LoadOptions) {
        this.id = options.id ? options.id : new Date().getTime().toString();
        this.props = options.props ? options.props : {};
        this.element = options.element ? options.element : null;
        const children = options.children ? options.children : [];

        this.children = children.map((item: any, _i: number) => {
            const node = new ElementNode();
            node.load(item);
            return node;
        });
    }

    toComponent(props: any = {}) {
        const elprops = _.merge(this.props, props, { attrs: { _id: this.id } });

        const El = this.element;
        if (typeof El === 'function') {
            return (
                <El {...elprops}>{this.children?.map((subnode: any, i: number) => subnode.toComponent({ key: i }))}</El>
            );
        }

        return El;
    }
}

export * as ElementNodeTypes from './types';
export default ElementNode;
