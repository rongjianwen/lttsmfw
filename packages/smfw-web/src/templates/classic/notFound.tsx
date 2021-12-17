import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import Panel from '../../components/Panel';
import PopoverList from '../../components/PopoverList';
import StyledComponent from '../../utils/StyledComponent';
import extraMenuSlice from '../../slices/extraMenu';

import * as classicViews from '../../views/classic';

const template = {
    __layout: 'basic',
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
                    styledElement: StyledComponent('div', (_theme: any) => ({
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    })),
                    defaultContent: 'main'
                },
                element: Panel,
                children: [
                    {
                        element: (_props: any) => 'not found'
                    }
                ]
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
