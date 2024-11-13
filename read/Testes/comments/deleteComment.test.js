import { driver } from '../selenium.config.js';
import { By, until } from 'selenium-webdriver';
import { assert } from 'chai';

describe('Deletar comentario', function () {
  it('deve deletar um comentario existente', async function () {
    await driver.get('http://localhost:3000/posts'); 

    const deleteButton = await driver.findElement(By.css('.delete-comment-button')); 
    await deleteButton.click();

    const comments = await driver.findElements(By.css('.comment-content'));
    assert.isEmpty(comments); 
  });
});
