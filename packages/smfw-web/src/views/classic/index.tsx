import React from 'react';
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import StyledComponent from '../../utils/StyledComponent';
import Panel from '../../components/Panel';
import navMenuSlice from '../../slices/navMenu';
import PopoverList from '../../components/PopoverList';

export const mNavMenuBar = {
    id: 'm-navMenuBar',
    props: {
        styledElement: StyledComponent('div', (theme: any) => ({
            marginLeft: theme.globals.padding,
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'flex'
            }
        })),
        defaultContent: 'm-navMenuBar'
    },
    element: Panel,
    children: [
        {
            id: 'm-navMenu',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    backgroundColor: theme.navMenu.backgroundColor
                })),
                defaultContent: 'm-navMenu'
            },
            element: (_props: any) => {
                const useStyle = makeStyles((theme: any) => ({
                    popoverPaper: {
                        width: theme.navbarPopoverPaper.width
                    },
                    buttonLabel: {
                        color: theme.navbar.color
                    }
                }));
                const classes = useStyle();

                const menu = useSelector((state: any) => state.navMenu.mobileMenu);
                const dispatch = useDispatch();
                const updateMenu = (id: string, newMenu: any) => {
                    dispatch(navMenuSlice.actions.updateMobileMenu({ id, menu: newMenu }));
                };
                return <PopoverList menu={menu} updateMenu={updateMenu} classes={classes} />;
            }
        }
    ]
};

export const navMenuBar = {
    id: 'navMenuBar',
    props: {
        styledElement: StyledComponent('div', (theme: any) => ({
            marginLeft: theme.globals.padding,
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        })),
        defaultContent: 'm-navMenuBar'
    },
    element: Panel,
    children: [
        {
            id: 'navMenu',
            props: {
                styledElement: StyledComponent('div', (theme: any) => ({
                    backgroundColor: theme.navMenu.backgroundColor
                })),
                defaultContent: 'navMenu'
            },
            element: (_props: any) => {
                const useStyle = makeStyles((theme: any) => ({
                    popoverPaper: {
                        width: theme.navbarPopoverPaper.width
                    },
                    buttonLabel: {
                        color: theme.navbar.color
                    }
                }));
                const classes = useStyle();

                const menu = useSelector((state: any) => state.navMenu.menu);
                const dispatch = useDispatch();
                const updateMenu = (id: string, newMenu: any) => {
                    dispatch(navMenuSlice.actions.updateMenu({ id, menu: newMenu }));
                };
                if (!_.isEmpty(menu.children)) {
                    return menu.children.map((v: any, _i: number) => (
                        <PopoverList key={v.id} menu={v} updateMenu={updateMenu} classes={classes} />
                    ));
                }
                return null;
            }
        }
    ]
};
