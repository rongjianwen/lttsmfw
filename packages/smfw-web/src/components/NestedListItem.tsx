import React from 'react';
import _ from 'lodash';

import { List, ListItem, ListItemText, Icon, Collapse, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(2)
    }
}));

export interface NestedListItemProps {
    menu: any;
    open: boolean;
    nested: boolean;
    depth: number;
    onClick: any;
}

function NestedListItem(props: NestedListItemProps) {
    const { menu, open, nested, depth, onClick } = props;
    const classes = useStyles();
    const className = (classes as any).nested;
    const attrs: any = {};
    if (typeof nested !== 'undefined') {
        attrs.className = className;
    }
    return (
        <div {...attrs}>
            <ListItem button onClick={() => onClick(menu)}>
                <ListItemText primary={menu.label} />
                {!_.isEmpty(menu.children) && (open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>)}
            </ListItem>
            {!_.isEmpty(menu.children) && (
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {menu.children.map((v: any, _i: number) => (
                            <NestedListItem
                                onClick={onClick}
                                key={v.id}
                                menu={v}
                                open={v.open}
                                nested
                                depth={depth + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </div>
    );
}

export default NestedListItem;
