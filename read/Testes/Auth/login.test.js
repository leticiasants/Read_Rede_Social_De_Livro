import { driver } from '../selenium.config.js';
import { By, until } from 'selenium-webdriver';
import { assert } from 'chai';

describe('Logar na conta', function () {
  it('Deve permitir o login com as credenciais corretas', async function () {
    await driver.get('http://localhost:5173/login');

    await driver.findElement(By.name('email')).sendKeys('iii@iii.com');
    await driver.findElement(By.name('password')).sendKeys('iii123');
    //await driver.findElement(By.name('password')).sendKeys('iii124');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(driver.getCurrentUrl(), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'http://localhost:5173/login');  
  });
});