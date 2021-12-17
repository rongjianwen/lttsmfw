const fs = require('fs');
const path = require('path');

function ensure_dir(dir) {
    const exists = fs.existsSync(dir);
    if (!exists) {
        fs.mkdirSync(dir);
    }
}

module.exports = ensure_dir;
