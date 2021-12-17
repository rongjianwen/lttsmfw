import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import Panel from '../../components/Panel';
import StyledComponent from '../../utils/StyledComponent';

const layout = {
    id: 'root',
    props: {
        styledElement: StyledComponent('div', (theme: any) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: theme.globals.fontFamily
        })),
        defaultContent: 'root'
    },
    element: Panel,
    children: [
        {
            id: 'header',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    display: 'flex',
                    height: theme.header.height,
                    backgroundColor: theme.header.backgroundColor,
                    color: theme.header.color
                })),
                defaultContent: 'header'
            },
            element: Panel,
            children: [
                {
                    id: 'logobar',
                    props: {
                        styledElement: StyledComponent('div', (theme: any) => ({
                            width: `calc(${theme.logobar.width} - ${theme.globals.padding}*2)`,
                            padding: theme.globals.padding,
                            fontSize: theme.globals.fontSize,
                            display: 'flex',
                            alignItems: 'center'
                        })),
                        defaultContent: 'logobar'
                    },
                    element: Panel,
                    children: [
                        {
                            id: 'logo',
                            props: {
                                styledElement: StyledComponent(Button, (theme: any) => ({
                                    color: (theme as any).header.color,
                                    fontSize: (theme as any).logobar.fontSize,
                                    justifyContent: 'flex-start',
                                    flex: 1,
                                    '&:hover': {
                                        backgroundColor: theme.header.backgroundColor
                                    }
                                }))
                            },
                            element: (props: any) => {
                                const text = useSelector((state: any) => state.logo.text);
                                const El = props.styledElement ? props.styledElement : Button;

                                return (
                                    <El {...props.attrs} disableRipple>
                                        {text}
                                    </El>
                                );
                            }
                        }
                    ]
                },
                {
                    id: 'navbar',
                    props: {
                        styledElement: StyledComponent('div', (theme: any) => ({
                            flex: 1,
                            backgroundColor: theme.navbar.backgroundColor,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        })),
                        defaultContent: 'navbar'
                    },
                    element: Panel
                },
                {
                    id: 'extrabar',
                    props: {
                        styledElement: StyledComponent('div', (theme: any) => ({
                            backgroundColor: theme.extrabar.backgroundColor,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        })),
                        defaultContent: ''
                    },
                    element: Panel
                }
            ]
        },
        {
            id: 'content',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    flex: 1,
                    display: 'flex',
                    [theme.breakpoints.down('xs')]: {
                        flexDirection: 'column'
                    }
                })),
                defaultContent: 'content'
            },
            element: Panel,
            children: [
                {
                    id: 'workspace',
                    props: {
                        styledElement: StyledComponent('div', (_theme: any) => ({
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        })),
                        defaultContent: 'workspace'
                    },
                    element: Panel,
                    children: [
                        {
                            id: 'main',
                            props: {
                                styledElement: StyledComponent('div', (_theme: any) => ({
                                    flex: 1,
                                    display: 'flex'
                                })),
                                defaultContent: 'main'
                            },
                            element: Panel
                        }
                    ]
                }
            ]
        },
        {
            id: 'footer',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    padding: theme.globals.padding,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.footer.backgroundColor,
                    color: theme.footer.color,
                    fontSize: theme.footer.fontSize
                })),
                defaultContent: 'footer'
            },
            element: Panel
        }
    ]
};

export default layout;
