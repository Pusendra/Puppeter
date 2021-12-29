require('dotenv').config();
const puppeteer = require('puppeteer');
var argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const startDate = argv.startDate;
const endDate = argv.endDate;

const baseUrl = process.env.REACT_APP_BASE_URL;
const userEmail = process.env.USER_EMAIL
const password = process.env.PASSWORD

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(baseUrl);
  
  await page.waitForSelector(".btn-success")
  await page.type("#email",userEmail,{delay: 100})
  await page.type("#password",password,{delay: 100})
  await page.click("#submit")
  await page.waitForTimeout(5000)
 
  await page.goto(`${baseUrl}/${startDate}/${endDate}/20`,{waitUntil : 'domcontentloaded'});
  await page.setViewport({width: 1920, height: 1080});

  await page.waitForTimeout(10000);
  await page.waitForSelector('#vaderReportContent');   

await page.addStyleTag({
    content: '@page { size: auto; }',
})

await page.pdf({ path: 'vaderReport.pdf',scale:0.5,printBackground:true
   })

  browser.close();

}

run();