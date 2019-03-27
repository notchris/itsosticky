// itsosticky app by notchris (https://github.com/notchris)

const puppeteer = require('puppeteer');

const email = ""; // email
const pass = ""; // password
const filePath = 'cat.jpg';

(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://itsosticky.com/')
  await page.setViewport({ width: 1280, height: 800 })
  await page.click('#button_signin')
  await page.waitForSelector('#signin_itso')
  await page.click('#signin_itso')
  await page.waitForSelector('#email')
  await page.type('#email', email)
  await page.type('input[type="password"]', pass)
  await page.click('#login_submit')
  await page.waitForNavigation()
  await page.click('#button_upload')
  await page.waitForSelector('input[type="file"]')
  let elementHandle = await page.$('input[type="file"]');
  await elementHandle.uploadFile(filePath)
  await page.waitForSelector('img.img_preview')
  await page.click('#submit_upload')
  await page.waitForNavigation()
  await page.waitForSelector('input.input_link_copy')
  let imgUrl = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('input.input_link_copy'));
        let links = elements.map(element => {
            return element.value
        })
        return links;
    });
  console.log(imgUrl[1])
  browser.close()
  console.log('image uploaded.')
})()