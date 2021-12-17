import React from 'react';
import StyledComponent from './StyledComponent';

function HtmlTag(tagName: string, makeStyles: any, options: any = {}) {
    const El = StyledComponent(tagName, makeStyles, options);

    return (props: any) => <El {...props.attrs}>{props.children}</El>;
}

export default HtmlTag;
