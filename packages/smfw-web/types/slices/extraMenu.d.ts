import { PayloadAction } from '@reduxjs/toolkit';
export interface ExtraMenuState {
    menu: any;
}
declare const slice: import("@reduxjs/toolkit").Slice<ExtraMenuState, {
    updateMenu: (state: import("immer/dist/internal").WritableDraft<ExtraMenuState>, action: PayloadAction<any>) => void;
}, "extraMenu">;
export default slice;
