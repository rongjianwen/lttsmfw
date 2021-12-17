export interface OutlinerState {
    open: boolean;
}
declare const slice: import("@reduxjs/toolkit").Slice<OutlinerState, {
    toggle: (state: import("immer/dist/internal").WritableDraft<OutlinerState>) => void;
}, "outliner">;
export default slice;
