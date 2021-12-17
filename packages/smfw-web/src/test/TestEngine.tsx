import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Engine from '../Engine';
import store from './store';
import * as slices from './slices';

import Outliner from './components/Outliner';
import StyledComponent from '../utils/StyledComponent';

document.onkeydown = (e: any) => {
    if (e.ctrlKey && e.altKey && e.keyCode === 83) {
        store.dispatch(slices.outliner.actions.toggle());
    }
};

class TestEngine extends Engine {
    createRouter(themeName: string, themeList: any) {
        const RootEl = StyledComponent('div', (_theme: any) => ({
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
        }));
        return (
            <Router>
                <RootEl>
                    <Outliner engine={this} />
                    {this.createPages(themeList[themeName])}
                </RootEl>
            </Router>
        );
    }
}

export default TestEngine;
