import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let driver;

beforeEach(async () => {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();
});

afterEach(async () => {
  await driver.quit();
});

export { driver };