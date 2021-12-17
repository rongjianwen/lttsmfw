import React from 'react';
import Panel from '../../components/Panel';
declare const template: {
    __layout: string;
    root: {
        element(props: any): JSX.Element;
    };
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
    sidebar: {
        children: {
            element: (_props: any) => JSX.Element;
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
                defaultContent: string;
            };
            element: typeof Panel;
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
