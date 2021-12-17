import React from 'react';
import Panel from '../../components/Panel';
declare const layout: {
    id: string;
    props: {
        styledElement: React.ComponentType<any>;
        defaultContent: string;
    };
    element: typeof Panel;
    children: ({
        id: string;
        props: {
            styledElement: React.ComponentType<any>;
            defaultContent: string;
        };
        element: typeof Panel;
        children: ({
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: string;
            };
            element: typeof Panel;
            children: ({
                id: string;
                props: {
                    styledIcon: React.ComponentType<any>;
                    styledElement?: undefined;
                };
                element: (props: any) => JSX.Element;
            } | {
                id: string;
                props: {
                    styledElement: React.ComponentType<any>;
                    styledIcon?: undefined;
                };
                element: (props: any) => JSX.Element;
            })[];
        } | {
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: string;
            };
            element: typeof Panel;
            children?: undefined;
        })[];
    } | {
        id: string;
        props: {
            styledElement: React.ComponentType<any>;
            defaultContent: string;
        };
        element: typeof Panel;
        children: ({
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: string;
            };
            element: (props: any) => any;
            children?: undefined;
        } | {
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
                element: typeof Panel;
            }[];
        })[];
    })[];
};
export default layout;
