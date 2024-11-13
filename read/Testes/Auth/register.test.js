import { driver } from '../selenium.config.js';
import { By, until } from 'selenium-webdriver';
import { assert } from 'chai';

describe('Registrar usuario', function () {
  it('Deve registrar um novo usuario', async function () {
    await driver.get('http://localhost:5173/register');
    
 
    await driver.findElement(By.name('username')).sendKeys('zzz');
    await driver.findElement(By.name('email')).sendKeys('zzz@zzz.com');
    await driver.findElement(By.name('password')).sendKeys('zzz123');
    await driver.findElement(By.name('passwordconfirm')).sendKeys('zzz123');

    await driver.findElement(By.css('button[type="submit"]')).click();
    
    await driver.wait(driver.getCurrentUrl(), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'http://localhost:5173/register');  
  });
});