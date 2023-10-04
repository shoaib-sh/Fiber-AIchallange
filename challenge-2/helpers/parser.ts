import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import {CSV_INPUT_PATH} from './../resources'

interface CompanyCsv {
    url(url: any): any;
    'Company Name': string;
    'YC URL': string;
}

export async function parseCsv(): Promise<CompanyCsv[]> {
    const companies: CompanyCsv[] = [];
    const stream = fs.createReadStream(CSV_INPUT_PATH);

    return new Promise((resolve, reject) => {
        stream.pipe(fastcsv.parse({skipRows: 1}))
            .on('data', (row: CompanyCsv) => companies.push(row))
            .on('end', () => resolve(companies))
            .on('error', reject);
    });
}