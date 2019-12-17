import puppeteer from 'puppeteer';

describe('Course', () => {
  it('test Course List', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(' http://localhost:8000/');
    await page.close();
    browser.close();
  });
});
