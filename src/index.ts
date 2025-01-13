import * as fs from 'fs/promises';
import * as path from 'path';

// Define path of log file
const logFilePath = path.join(__dirname, '../resources/web.log');

const pageUrlArray:Record<string, string[]> = {}; //Add record for the page urls and visited ip addresses

// Read the file using Promises
async function readLogFile(filePath: string) {
    try {
        const logFileString = await fs.readFile(filePath, 'utf8'); //Rad the file using fs promises

        //Map and create record for wisitedweb pages
        const pageUrlWithIp = logFileString.trim().split("\n").map(line=>{
            const [pageUrl,ipAddress] = line.split(" ");
            if(!pageUrlArray[pageUrl])
            {
                pageUrlArray[pageUrl] = []
            }

            pageUrlArray[pageUrl].push(ipAddress);
        })

        //sort and create moste visited web pages
        const mostVisitwebpages = Object.entries(pageUrlArray)
                                    .map(([url,ipAddress]) => ({url,count:ipAddress.length}))
                                    .sort((a,b)=>b.count-a.count);

        //sort and create most uniqu web pages
        const mostUniqWebpages = Object.entries(pageUrlArray)
                                    .map(([url,ipAddress]) => ({url,uniqCount:new Set(ipAddress).size}))
                                    .sort((a,b)=>b.uniqCount-a.uniqCount);

        console.log("Moste visited web pages\n",mostVisitwebpages);
        console.log("Most uniqu web pages\n",mostUniqWebpages);   
        
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}

readLogFile(logFilePath);