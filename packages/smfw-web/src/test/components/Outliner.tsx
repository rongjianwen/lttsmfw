import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles, Drawer, List, ListItem, ListItemText, Collapse } from '@material-ui/core';

function Outliner(props: any) {
    const open = useSelector((state: any) => state.outliner.open);

    const useStyles = makeStyles((theme: any) => ({
        nested: {
            paddingLeft: theme.spacing(4)
        },
        drawer: {
            width: theme.globals.outlinerWidth
        },
        paper: {
            width: theme.globals.outlinerWidth
        },
        drawerDnone: {
            width: 0
        },
        paperDnone: {
            width: 0
        }
    }));
    const classes = useStyles();

    const navigate = useNavigate();
    const engine = props.engine;
    const { pages } = engine;

    const categories: any = {};
    _.forEach(pages, (v: any, _i: number) => {
        const catName = v.title.split(' - ')[0];
        if (typeof categories[catName] === 'undefined') {
            categories[catName] = [];
        }
        categories[catName].push(v);
    });

    return (
        <Drawer
            classes={{
                root: clsx(classes.drawer, !open && classes.drawerDnone),
                paper: clsx(classes.paper, !open && classes.paperDnone)
            }}
            variant='persistent'
            anchor='left'
            open={open}
            transitionDuration={0}
        >
            {_.keys(categories).map((catName: any, _i: number) => (
                <List key={catName} component='nav'>
                    <ListItem button>
                        <ListItemText primary={catName} />
                    </ListItem>
                    <Collapse in={true} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            {categories[catName].map((page: any, _ii: number) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={() => {
                                        navigate(page.path);
                                    }}
                                    key={page.title.split(' - ')[1]}
                                >
                                    <ListItemText primary={page.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            ))}
        </Drawer>
    );
}

export default Outliner;
