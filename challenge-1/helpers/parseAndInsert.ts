
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import knex from 'knex';
// @ts-ignore
import config from "./../../knexfile.cjs";

export const parseAndInsert = async (csvPath: string, tableName: string) => {
    const db = knex(config.development)
    const rows: any = [];
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', function(row) {
                rows.push(row);
                if (rows.length >= 100) {
                    this.pause();
                    db.batchInsert(tableName, rows).then(() => {
                        this.resume();
                        rows.length = 0;
                    });
                }
            })
            .on('end', () => {
                console.log(rows.length)
                if (rows.length) {
                    db.batchInsert(tableName, rows).then(resolve).catch(reject);
                } else {
                    resolve();
                }
            })
            .on('error', reject);
    });
};