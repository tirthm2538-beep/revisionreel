import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\Dell-5470\\.gemini\\antigravity\\brain\\e637022d-ff51-4ea4-af33-017556c9ee8a\\screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const subjects = [
    { name: 'physics', label: 'Physics' },
    { name: 'chemistry', label: 'Chemistry' },
    { name: 'mathematics', label: 'Mathematics' }
  ];

  for (const sub of subjects) {
    // 1. Desktop screenshot
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1280, height: 820, deviceScaleFactor: 2 });
    const url = `http://localhost:3000/?guest=true&subject=${sub.name}`;
    console.log(`Navigating desktop: ${url}`);
    await pageDesktop.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1000));
    const destDesktop = path.join(OUTPUT_DIR, `${sub.name}_desktop.png`);
    await pageDesktop.screenshot({ path: destDesktop });
    console.log(`Captured: ${destDesktop}`);
    await pageDesktop.close();

    // 2. Mobile screenshot
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 420, height: 860, deviceScaleFactor: 2 });
    console.log(`Navigating mobile: ${url}`);
    await pageMobile.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1000));
    const destMobile = path.join(OUTPUT_DIR, `${sub.name}_mobile.png`);
    await pageMobile.screenshot({ path: destMobile });
    console.log(`Captured: ${destMobile}`);
    await pageMobile.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
