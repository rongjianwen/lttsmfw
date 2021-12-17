import React, { useEffect } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import Panel from '../../components/Panel';
import NestedList from '../../components/NestedList';
import PopoverList from '../../components/PopoverList';

import StyledComponent from '../../utils/StyledComponent';
import sideMenuSlice from '../../slices/sideMenu';
import navMenuSlice from '../../slices/navMenu';
import extraMenuSlice from '../../slices/extraMenu';

import * as classicViews from '../../views/classic';

const template = {
    __layout: 'common',
    root: {
        element(props: any) {
            const dispatch = useDispatch();

            useEffect(() => {
                const sideMenu = {
                    id: 'root',
                    label: 'root',
                    open: false,
                    children: [
                        {
                            id: 'popover-aa',
                            label: 'aa',
                            open: false,
                            children: [
                                {
                                    id: 'popover-aa-1',
                                    label: 'aa-1',
                                    open: false,
                                    children: [
                                        {
                                            id: 'popover-aa-1-1',
                                            label: 'aa-1-1',
                                            onClick(menu: any) {
                                                return menu;
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'popover-bb',
                            label: 'bb',
                            onClick(menu: any) {
                                return menu;
                            }
                        }
                    ]
                };
                dispatch(sideMenuSlice.actions.updateMenu({ id: 'root', menu: sideMenu }));

                const navMenu = {
                    id: 'root',
                    label: 'root',
                    open: false,
                    children: [
                        {
                            id: 'popover-cc',
                            label: 'cc',
                            open: false,
                            children: [
                                {
                                    id: 'popover-cc-1',
                                    label: 'cc-1',
                                    open: false,
                                    children: [
                                        {
                                            id: 'popover-cc-1-1',
                                            label: 'cc-1-1',
                                            onClick(menu: any) {
                                                return menu;
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'dd',
                            id: 'popover-dd',
                            onClick(menu: any) {
                                return menu;
                            }
                        }
                    ]
                };
                dispatch(navMenuSlice.actions.updateMenu({ id: 'root', menu: navMenu }));
                dispatch(
                    navMenuSlice.actions.updateMobileMenu({
                        id: 'root',
                        menu: { ...navMenu, label: '', icon: 'more_horiz' }
                    })
                );

                const extraMenu = {
                    id: 'root',
                    label: '',
                    icon: 'settings',
                    open: false,
                    children: [
                        {
                            label: 'ee',
                            open: false,
                            id: 'popover-ee',
                            children: [
                                {
                                    label: 'ee-1',
                                    open: false,
                                    id: 'popover-ee-1',
                                    children: [
                                        {
                                            label: 'ee-1-1',
                                            id: 'popover-ee-1-1',
                                            onClick(menu: any) {
                                                return menu;
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'ff',
                            id: 'popover-ff',
                            onClick(menu: any) {
                                return menu;
                            }
                        }
                    ]
                };
                dispatch(extraMenuSlice.actions.updateMenu({ id: 'root', menu: extraMenu }));
            });

            return <Panel {...props} />;
        }
    },
    logo: {
        children: [
            {
                id: 'logoText',
                props: {
                    styledElement: StyledComponent('div', (theme: any) => ({
                        marginLeft: theme.globals.padding
                    })),
                    defaultContent: (_props: any) => {
                        const text = useSelector((state: any) => state.logo.text);
                        return <React.Fragment key={1}>{text}</React.Fragment>;
                    }
                },
                element: Panel
            }
        ]
    },
    navbar: {
        children: [classicViews.mNavMenuBar, classicViews.navMenuBar]
    },
    sidebar: {
        children: [
            {
                element: (_props: any) => {
                    const menu = useSelector((state: any) => state.sideMenu.menu);
                    const dispatch = useDispatch();
                    const updateMenu = (id: string, newMenu: any) => {
                        dispatch(sideMenuSlice.actions.updateMenu({ id, menu: newMenu }));
                    };
                    return <NestedList menu={menu} updateMenu={updateMenu} />;
                }
            }
        ]
    },
    extrabar: {
        children: [
            {
                id: 'extraMenu',
                props: {
                    styledElement: StyledComponent('div', (theme: any) => ({
                        backgroundColor: theme.extrabar.backgroundColor
                    })),
                    defaultContent: 'extraMenu'
                },
                element: (_props: any) => {
                    const useStyle = makeStyles((theme: any) => ({
                        popoverPaper: {
                            width: theme.extrabarPopoverPaper.width
                        },
                        buttonLabel: {
                            color: theme.extrabar.color
                        }
                    }));
                    const classes = useStyle();

                    const menu = useSelector((state: any) => state.extraMenu.menu);
                    const dispatch = useDispatch();
                    const updateMenu = (id: string, newMenu: any) => {
                        dispatch(extraMenuSlice.actions.updateMenu({ id, menu: newMenu }));
                    };
                    return <PopoverList menu={menu} updateMenu={updateMenu} classes={classes} />;
                }
            }
        ]
    },
    main: {
        children: [
            {
                id: 'main',
                props: {
                    defaultContent: 'main'
                },
                element: Panel
            }
        ]
    },
    footer: {
        children: [
            {
                id: 'copyrightText',
                props: {
                    styledElement: StyledComponent('div', (theme: any) => ({
                        padding: theme.globals.padding,
                        fontSize: theme.copyrightText.fontSize,
                        color: theme.copyrightText.color
                    })),
                    defaultContent: (_props: any) => {
                        const text = useSelector((state: any) => state.copyright.text);
                        return <React.Fragment key={1}>{text}</React.Fragment>;
                    }
                },
                element: Panel
            }
        ]
    }
};

export default template;
