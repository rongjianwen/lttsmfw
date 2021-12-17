import React from 'react';
import Panel from '../../components/Panel';
export declare const mNavMenuBar: {
    id: string;
    props: {
        styledElement: React.ComponentType<any>;
        defaultContent: string;
    };
    element: typeof Panel;
    children: {
        id: string;
        props: {
            styledElement: React.ComponentType<any>;
            defaultContent: string;
        };
        element: (_props: any) => JSX.Element;
    }[];
};
export declare const navMenuBar: {
    id: string;
    props: {
        styledElement: React.ComponentType<any>;
        defaultContent: string;
    };
    element: typeof Panel;
    children: {
        id: string;
        props: {
            styledElement: React.ComponentType<any>;
            defaultContent: string;
        };
        element: (_props: any) => any;
    }[];
};
