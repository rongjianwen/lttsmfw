import _ from 'lodash';

function menuFindExt(menu: any, find: any, process: any, pmenu: any = null, index: any = null) {
    if (!_.isEmpty(menu.children)) {
        _.forEach(menu.children, (v: any, i: number) => {
            menuFindExt(v, find, process, menu, i);
        });
    }
    if (find(menu)) {
        process(menu, pmenu, index);
    }
}

export default menuFindExt;
