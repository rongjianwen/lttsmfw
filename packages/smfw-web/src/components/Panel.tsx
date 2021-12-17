import React from 'react';
import _ from 'lodash';

export interface PanelProps {
    styledElement?: any;
    attrs?: any;
    children?: any;
    defaultContent?: any;
}

function Panel(props: PanelProps) {
    const El = props.styledElement ? props.styledElement : 'div';
    return <El {...props.attrs}>{!_.isEmpty(props.children) ? props.children : props.defaultContent}</El>;
}

export default Panel;
