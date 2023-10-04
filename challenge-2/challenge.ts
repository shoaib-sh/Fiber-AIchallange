import { parseCsv } from './helpers/parser';
import { scrapeCompany } from './helpers/scraper';
import * as fs from 'fs/promises';
import { JSON_OUTPUT_PATH } from './resources';

interface CompanyCsv {
  "Company Name": string,
  "YC URL": string
}

export async function processCompanyList() {
  const companiesData = await parseCsv();
  
  const results: CompanyCsv[] = [];
  for(const company of companiesData) {
    const scrapedData: any = await scrapeCompany(company[1]);
    results.push(scrapedData);
  }
  
  await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify(results, null, 2));
}