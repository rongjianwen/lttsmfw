const micromatch = require('micromatch');

const ignore = ['**/build/**/*', '**/types/**/*', '**/docs/**/*', '**/static/**/*'];

module.exports = {
    '*.{js,jsx,ts,tsx}': (files) => {
        const match = micromatch.not(files, ignore);
        const list = [];
        match.forEach((path) => {
            list.push(`eslint --fix --max-warnings=0 ${path}`);
            list.push(`prettier --write ${path}`);
        });
        return list;
    },
    '*.{html,css,less,scss,json}': (files) => {
        const match = micromatch.not(files, ignore);
        const list = [];
        match.forEach((path) => {
            list.push(`prettier --write ${path}`);
        });
        return list;
    }
};
