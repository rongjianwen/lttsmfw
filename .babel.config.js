function config(api) {
    api.cache(true);
    return {
        babelrcRoots: ['.', 'packages/*']
    };
}

module.exports = config;
