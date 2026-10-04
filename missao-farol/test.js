const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.message));
    page.on('requestfailed', request => console.error('REQ FAIL:', request.url(), request.failure().errorText));
    await page.goto('http://127.0.0.1:5000', { waitUntil: 'networkidle0', timeout: 5000 });
    console.log("Page loaded");
    await page.click('#login');
    await new Promise(r => setTimeout(r, 1000));
    const msg = await page.$eval('#msg', el => el.textContent);
    console.log("MSG:", msg);
    await browser.close();
  } catch (e) { console.error("SCRIPT ERR:", e); process.exit(1); }
})();
