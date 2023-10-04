import * as fs from 'fs';
import * as zlib from 'zlib';
import * as tar from 'tar';

export const extractTarGz = (source: string, destination: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(source)
            .pipe(zlib.createGunzip())
            .pipe(tar.x({ C: destination }))
            .on('end', resolve)
            .on('error', reject);
    });
};