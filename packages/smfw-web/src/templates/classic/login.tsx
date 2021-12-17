import React from 'react';
import _ from 'lodash';
import { makeStyles, Button, TextField, Grid, CardHeader, Card, CardActions, CardContent } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import Panel from '../../components/Panel';
import PopoverList from '../../components/PopoverList';

import StyledComponent from '../../utils/StyledComponent';
import extraMenuSlice from '../../slices/extraMenu';

import * as classicViews from '../../views/classic';

const template = {
    __layout: 'basic',
    root: {},
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
                        display: 'flex'
                    })),
                    defaultContent: 'main'
                },
                element: Panel,
                children: [
                    {
                        element: (_props: any) => {
                            const useStyles = makeStyles((theme: any) => ({
                                cardHeaderRoot: {
                                    padding: 0
                                },
                                cardHeaderTitle: {
                                    textAlign: 'center',
                                    padding: `calc(${theme.globals.padding} / 2)`,
                                    backgroundColor: theme.navbar.backgroundColor,
                                    color: theme.navbar.color,
                                    [theme.breakpoints.down('xs')]: {
                                        backgroundColor: theme.workspace.backgroundColor,
                                        color: theme.workspace.color
                                    }
                                },
                                cardHeaderContent: {
                                    height: '100%'
                                },
                                cardActionsRoot: {
                                    display: 'flex',
                                    justifyContent: 'end'
                                },
                                gridContainer: {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    [theme.breakpoints.down('xs')]: {
                                        justifyContent: 'center',
                                        alignItems: 'start',
                                        marginTop: theme.globals.padding
                                    }
                                },
                                gridItem: {
                                    [theme.breakpoints.down('xs')]: {
                                        flexGrow: 1,
                                        maxWidth: '100%',
                                        flexBasis: '100%'
                                    }
                                },
                                cardRoot: {
                                    [theme.breakpoints.down('xs')]: {
                                        boxShadow: 'none'
                                    }
                                }
                            }));
                            const classes = useStyles();
                            return (
                                <Grid container classes={{ container: classes.gridContainer }}>
                                    <Grid item xs={12} sm={8} md={6} lg={4} classes={{ item: classes.gridItem }}>
                                        <Card classes={{ root: classes.cardRoot }}>
                                            <CardHeader
                                                title='Login'
                                                classes={{
                                                    root: classes.cardHeaderRoot,
                                                    title: classes.cardHeaderTitle,
                                                    content: classes.cardHeaderContent
                                                }}
                                            />
                                            <CardContent>
                                                <TextField
                                                    id='standard-full-width'
                                                    label=''
                                                    placeholder='Username'
                                                    helperText=''
                                                    fullWidth
                                                    margin='normal'
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                                <TextField
                                                    id='standard-full-width'
                                                    label=''
                                                    placeholder='Password'
                                                    helperText=''
                                                    fullWidth
                                                    margin='normal'
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        type: 'password'
                                                    }}
                                                />
                                            </CardContent>
                                            <CardActions classes={{ root: classes.cardActionsRoot }}>
                                                <Button variant='contained' color='primary'>
                                                    Submit
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            );
                        }
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
