const fs = require('fs');
const https = require('https');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        fs.access(dest, fs.constants.F_OK, (err) => {
            if (err === null) reject(new Error('File already exists'));
            const request = https.get(url, (response) => {
                if (response.statusCode === 200) {
                    const file = fs.createWriteStream(dest, { flags: 'wx' });
                    file.on('finish', () => resolve());
                    file.on('error', (ferr) => {
                        file.close();
                        if (ferr.code === 'EEXIST') reject(new Error('File already exists'));
                        else fs.unlink(dest, () => reject(new Error(ferr.message)));
                    });
                    response.pipe(file);
                } else if (response.statusCode === 302 || response.statusCode === 301) {
                    download(response.headers.location, dest).then(() => resolve());
                } else {
                    reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
                }
            });

            request.on('error', (rerr) => {
                reject(new Error(rerr.message));
            });
        });
    });
}

module.exports = download;
