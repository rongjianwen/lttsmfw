import React from 'react';
import Panel from '../../components/Panel';
declare const template: {
    __layout: string;
    root: {};
    logo: {
        children: {
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: (_props: any) => JSX.Element;
            };
            element: typeof Panel;
        }[];
    };
    navbar: {
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
                element: (_props: any) => any;
            }[];
        }[];
    };
    extrabar: {
        children: {
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: string;
            };
            element: (_props: any) => JSX.Element;
        }[];
    };
    main: {
        children: {
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: string;
            };
            element: typeof Panel;
            children: {
                element: (_props: any) => JSX.Element;
            }[];
        }[];
    };
    footer: {
        children: {
            id: string;
            props: {
                styledElement: React.ComponentType<any>;
                defaultContent: (_props: any) => JSX.Element;
            };
            element: typeof Panel;
        }[];
    };
};
export default template;
