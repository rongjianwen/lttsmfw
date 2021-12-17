import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Engine, StyledComponent } from '@smfw/web';

class TestEngine extends Engine {
    createRouter(themeName: string, themeList: any) {
        const RootEl = StyledComponent('div', (_theme: any) => ({
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
        }));
        return (
            <Router>
                <RootEl>{this.createPages(themeList[themeName])}</RootEl>
            </Router>
        );
    }
}

export default TestEngine;
