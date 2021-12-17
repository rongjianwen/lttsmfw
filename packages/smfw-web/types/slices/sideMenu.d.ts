import { PayloadAction } from '@reduxjs/toolkit';
export interface SideMenuState {
    menu: any;
}
declare const slice: import("@reduxjs/toolkit").Slice<SideMenuState, {
    updateMenu: (state: import("immer/dist/internal").WritableDraft<SideMenuState>, action: PayloadAction<any>) => void;
}, "sideMenu">;
export default slice;
