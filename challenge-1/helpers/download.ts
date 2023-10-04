import * as https from 'https';
import * as fs from 'fs';
import * as fse from 'fs-extra';

export const downloadFile = (url: string, destination: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination);

        https.get(url, response => {
            const totalSize = parseInt(response.headers['content-length'] || '0', 10);
            let downloadedSize = 0;

            response.on('data', chunk => {
                downloadedSize += chunk.length;
                const percent = (downloadedSize / totalSize) * 100;
                console.log(`Downloaded: ${percent.toFixed(2)}%`);
            });

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', error => {
            fse.unlink(destination).catch(() => {}); // Ignore errors in unlink
            reject(error);
        });
    });
};
