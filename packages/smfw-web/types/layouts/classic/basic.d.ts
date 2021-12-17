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
            children: {
                id: string;
                props: {
                    styledElement: React.ComponentType<any>;
                };
                element: (props: any) => JSX.Element;
            }[];
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
        children: {
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
        }[];
    } | {
        id: string;
        props: {
            styledElement: React.ComponentType<any>;
            defaultContent: string;
        };
        element: typeof Panel;
        children?: undefined;
    })[];
};
export default layout;
