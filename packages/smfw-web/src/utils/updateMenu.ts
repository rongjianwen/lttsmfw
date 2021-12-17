import _ from 'lodash';
import menuFindExt from './menuFindExt';

function updateMenu(state: any, key: string, id: string, menu: any) {
    let mm = _.cloneDeep(state[key]);
    menuFindExt(
        mm,
        (m: any) => m.id === id,
        (m: any, pm: any, i: any) => {
            if (pm) {
                pm.children[i] = menu;
            } else {
                mm = menu;
            }
        }
    );
    state[key] = mm;
}

export default updateMenu;
