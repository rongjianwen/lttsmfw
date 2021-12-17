export interface SidebarState {
    open: boolean;
}
declare const slice: import("@reduxjs/toolkit").Slice<SidebarState, {
    toggle: (state: import("immer/dist/internal").WritableDraft<SidebarState>) => void;
}, "sidebar">;
export default slice;
