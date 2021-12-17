export interface NestedListItemProps {
    menu: any;
    open: boolean;
    nested: boolean;
    depth: number;
    onClick: any;
}
declare function NestedListItem(props: NestedListItemProps): JSX.Element;
export default NestedListItem;
