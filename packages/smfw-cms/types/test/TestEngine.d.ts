import { Engine } from '@smfw/web';
declare class TestEngine extends Engine {
    createRouter(themeName: string, themeList: any): JSX.Element;
}
export default TestEngine;
