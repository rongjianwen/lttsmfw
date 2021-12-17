import { PayloadAction } from '@reduxjs/toolkit';
export interface NavMenuState {
    menu: any;
    mobileMenu: any;
}
declare const slice: import("@reduxjs/toolkit").Slice<NavMenuState, {
    updateMenu: (state: import("immer/dist/internal").WritableDraft<NavMenuState>, action: PayloadAction<any>) => void;
    updateMobileMenu: (state: import("immer/dist/internal").WritableDraft<NavMenuState>, action: PayloadAction<any>) => void;
}, "navMenu">;
export default slice;
