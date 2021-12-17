const path = require('path');
const download = require('./download');
const ensureDir = require('./ensure_dir');
const dependencies = require('./dependencies');
const downloadMaterialDesignIcons = require('./download_material_design_icons');

const libDir = process.cwd();
const projectDir = path.join(libDir, 'build', 'test');
const vendorDir = path.join(projectDir, 'vendor');

ensureDir(vendorDir);
dependencies.forEach((dependency) => {
    dependency.files.forEach((file) => {
        const url = file.url;
        const output = file.output;
        const destDir = path.join(vendorDir, dependency.destDir);
        const dest = path.join(vendorDir, dependency.destDir, output);
        ensureDir(destDir);
        download(url, dest)
            .then(() => {})
            .catch((_e) => {});
    });
});

downloadMaterialDesignIcons(vendorDir);
