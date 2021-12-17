import React from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Icon, Button } from '@material-ui/core';

import Panel from '../../components/Panel';
import StyledComponent from '../../utils/StyledComponent';
import sidebarSlice from '../../slices/sidebar';

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
                            id: 'sidebarIcon',
                            props: {
                                styledIcon: StyledComponent(Icon, (theme: any) => ({
                                    color: (theme as any).header.color
                                }))
                            },
                            element: (props: any) => {
                                const StyledIcon = props.styledIcon ? props.styledIcon : Icon;
                                const dispatch = useDispatch();

                                function handleClick() {
                                    dispatch(sidebarSlice.actions.toggle());
                                }

                                return (
                                    <IconButton {...props.attrs} onClick={handleClick}>
                                        <StyledIcon>menu</StyledIcon>
                                    </IconButton>
                                );
                            }
                        },
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

                                const disableRipple = true;
                                return (
                                    <El {...props.attrs} disableRipple={disableRipple}>
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
                    id: 'sidebar',
                    props: {
                        styledElement: StyledComponent('div', (theme: any) => ({
                            width: theme.sidebar.width,
                            backgroundColor: theme.sidebar.backgroundColor,
                            color: theme.sidebar.color,
                            [theme.breakpoints.down('xs')]: {
                                width: '100%',
                                height: `calc(100% - ${theme.header.height})`,
                                position: 'absolute',
                                backgroundColor: theme.header.backgroundColor
                            }
                        })),
                        defaultContent: 'sidebar'
                    },
                    element: (props: any) => {
                        const open = useSelector((state: any) => state.sidebar.open);
                        return open && <Panel {...props} />;
                    }
                },
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
                                styledElement: StyledComponent('div', (theme: any) => ({
                                    flex: 1,
                                    padding: theme.globals.padding
                                })),
                                defaultContent: 'main'
                            },
                            element: Panel
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
                }
            ]
        }
    ]
};

export default layout;
