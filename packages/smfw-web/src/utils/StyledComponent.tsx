import { styled } from '@material-ui/core';

function StyledComponent(component: any, makeStyles: any, options: any = {}) {
    return styled(component)((params: any) => {
        const { theme } = params;
        return makeStyles(theme);
    }, options);
}

export default StyledComponent;
