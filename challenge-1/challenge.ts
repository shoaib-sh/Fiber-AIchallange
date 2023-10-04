import { downloadFile } from './helpers/download';
import { extractTarGz } from './helpers/extract';
import { parseAndInsert } from './helpers/parseAndInsert';
import { DUMP_DOWNLOAD_URL, SQLITE_DB_PATH } from './resources';

export async function processDataDump() {
    const tmpDownloadPath = "./tmp/dump.tar.gz";
    const tmpExtractPath = "./tmp/extracted";

    // Download
    await downloadFile(DUMP_DOWNLOAD_URL, tmpDownloadPath);

    // Extract
    await extractTarGz(tmpDownloadPath, tmpExtractPath);

    // Parse and insert
    await parseAndInsert(`${tmpExtractPath}/dump/customers.csv`, 'customers');
    await parseAndInsert(`${tmpExtractPath}/dump/organizations.csv`, 'organizations');
}