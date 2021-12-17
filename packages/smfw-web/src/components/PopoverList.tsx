import React from 'react';
import _ from 'lodash';

import { Button, Popover, Icon } from '@material-ui/core';
import NestedList from './NestedList';
import menuForeach from '../utils/menuForeach';

export interface PopoverListProps {
    menu: any;
    updateMenu: any;
    classes: any;
}

function PopoverList(props: PopoverListProps) {
    const { menu, updateMenu, classes } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { open } = menu;
    const id = open ? menu.id : undefined;

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
        updateMenu(menu.id, { ...menu, open: !menu.open });
    };

    const handleClose = () => {
        const mm = _.cloneDeep(menu);
        menuForeach(mm, (m: any, _pmenu: any, _i: any) => {
            if (typeof m.open !== 'undefined') {
                m.open = false;
            }
        });
        updateMenu(mm.id, mm);
        setAnchorEl(null);
    };

    return (
        <>
            <Button aria-describedby={id} onClick={(e: any) => handleClick(e)} classes={{ label: classes.buttonLabel }}>
                {menu.label}
                {menu.icon && <Icon>{menu.icon}</Icon>}
                {!_.isEmpty(menu.children) &&
                    !_.isEmpty(menu.label) &&
                    (open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>)}
            </Button>
            {!_.isEmpty(menu.children) && (
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    classes={{ paper: classes.popoverPaper }}
                >
                    <NestedList menu={menu} updateMenu={updateMenu} />
                </Popover>
            )}
        </>
    );
}

export default PopoverList;
