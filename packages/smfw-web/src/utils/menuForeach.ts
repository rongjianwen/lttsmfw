import _ from 'lodash';

function menuForeach(menu: any, process: any, pmenu: any = null, index: any = null) {
    if (!_.isEmpty(menu.children)) {
        _.forEach(menu.children, (v: any, i: number) => {
            menuForeach(v, process, menu, i);
        });
    }
    process(menu, pmenu, index);
}

export default menuForeach;
