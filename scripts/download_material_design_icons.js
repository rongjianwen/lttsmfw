const unzipper = require('unzipper');
const micromatch = require('micromatch');
const fs = require('fs');
const path = require('path');
const download = require('./download');
const ensure_dir = require('./ensure_dir');

function unzipMaterialDesignIcons(filepath, destDir) {
    fs.createReadStream(filepath)
        .pipe(unzipper.Parse())
        .on('entry', function (entry) {
            const filename = entry.path;
            const type = entry.type;
            const size = entry.vars.uncompressedSize;

            if (micromatch.isMatch(filename, '**/iconfont/**/*.*')) {
                entry.pipe(fs.createWriteStream(path.join(destDir, path.basename(filename))));
            } else {
                entry.autodrain();
            }
        })
        .on('finish', function () {
            fs.unlink(filepath, () => {});
        });
}

function downloadMaterialDesignIcons(vendorDir) {
    const mdi_url = 'https://github.com/google/material-design-icons/archive/refs/tags/3.0.2.zip';
    const mdi_zip = path.join(vendorDir, 'material-design-icons.zip');
    let destDir = path.join(vendorDir, 'material-design-icons-3.0.2');
    ensure_dir(destDir);
    destDir = path.join(destDir, 'iconfont');
    ensure_dir(destDir);

    download(mdi_url, mdi_zip)
        .then((e) => {
            unzipMaterialDesignIcons(mdi_zip, destDir);
        })
        .catch((e) => {});
}

module.exports = downloadMaterialDesignIcons;
