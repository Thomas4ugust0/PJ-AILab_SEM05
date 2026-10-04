const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));
  
  await page.goto('http://127.0.0.1:5000');
  await page.waitForSelector('#login');
  await page.click('#login');
  
  await new Promise(r => setTimeout(r, 2000));
  
  await page.type('#t', 'Test message');
  await page.click('form#f button');
  
  await new Promise(r => setTimeout(r, 2000));
  
  const msg = await page.$eval('#msg', el => el.textContent);
  console.log('Final msg:', msg);
  
  await browser.close();
})();
