import axios from 'axios';
import cheerio from 'cheerio';

interface Company {
    name: string;
    founded: string;
    team_size: Number;
    founders: Array<{}>;
    launchPosts: Array<{}>;
    jobs: Array<{}>
    // ... more fields as needed
}

export async function scrapeCompany(url: string): Promise<Company | null> {
    if (!url) {
        console.error("URL is not defined.");
        return null;
    }

    try {
        const result: Company = {
            name: '',
            founded: '',
            team_size: 0,
            founders: [],
            launchPosts: [],
            jobs: []
        };
        
        const response = await axios.get(url);
        console.log(response.data)
        const $ = cheerio.load(response.data);
        
        const arr: any = [];
 $('script').each((index, element) => {
      const title = $(element).text().trim();
      arr.push(title)
 
    });
      const companyData =  JSON.parse(arr.pop())

        
        console.log(companyData)
        result.name = companyData["company"].name
        result.founded = companyData["company"].year_founded
        result.team_size = companyData["company"].team_size
        result.founders = companyData["company"].founders
        result.jobs = companyData.jobPostings
        return result;

    } catch (error) {
        console.error(`Failed to scrape the company from the URL: ${url}`, error);
        return null;
    }
}

// import { PlaywrightCrawler, Dataset } from 'crawlee';

// // PlaywrightCrawler crawls the web using a headless
// // browser controlled by the Playwright library.
// const crawler = new PlaywrightCrawler({
//     // Use the requestHandler to process each of the crawled pages.
//     async requestHandler({ request, page, enqueueLinks, log }) {
//         const title = await page.title();
//         log.info(`Title of ${request.loadedUrl} is '${title}'`);

//         const repos = await page.$$eval('div.ycdc-with-link-color', (cards) => {
//             cards.map(card => {
//                 return card.querySelectorAll('a')
//             })
//         })

//         console.log(repos)
//         // Save results as JSON to ./storage/datasets/default
//         await Dataset.pushData({ title, url: request.loadedUrl });

//         // Extract links from the current page
//         // and add them to the crawling queue.
//         // await enqueueLinks();
//     },
//     // Uncomment this option to see the browser window.
//     // headless: false,
// });

// // Add first URL to the queue and start the crawl.
// console.log(await crawler.run(['https://www.ycombinator.com/companies/fiber-ai']))