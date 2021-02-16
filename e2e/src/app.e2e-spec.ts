import { AppPage } from './app.po';
import { browser, logging, element, By, by, protractor } from 'protractor';


const EC = protractor.ExpectedConditions;

describe('OrganicWorld App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not load product page ', () => {
    page.navigateToBase();
    browser.get('/products/all');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
  });

  it('should not load product page ', () => {
    page.navigateToBase();
    browser.get('/products/fruit');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
  });

  it('should not load account page ', () => {
    page.navigateToBase();
    browser.get('/account');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
  });

  it('should Have navbar with classes', () => {
    page.toHeader();
    expect(element(By.tagName('nav')).getAttribute('class')).toEqual(
      'navbar navbar-dark bg-dark navbar-expand-md fixed-top'
    );
  });

  it('should have nav-brand of image', () => {
    const img = element(By.className('navbar-brand'));
    expect(img.element(By.tagName('img')).getAttribute('src')).toEqual(
      browser.baseUrl + 'assets/images/logo.webp'
    );
  });

  it('should have navbar with collapsable navtabs', () => {
    const div = element(By.css('#navbarSupportedContent'));
    expect(div.getAttribute('class')).toEqual('collapse navbar-collapse');
  });

  it('should have three navtabs', () => {
    const list = element.all(By.className('nav-item'));
    expect(list.count()).toEqual(3);
  });

  it('should have login modal', () => {    
    expect(element(By.css('[data-target="#loginModal"]')).getText()).toEqual('LOGIN');
  });

  it('should have register modal', () => {    
    expect(element(By.css('[data-target="#registerModal"]')).getText()).toEqual('REGISTER');
  });

  it('should have register modal to register new user and login modal to login', async () => {
    const register = element(By.css('[data-target="#registerModal"]'));
    register.click();
    browser.sleep(2000);
    browser.driver.switchTo().activeElement();
    const button = element(by.partialButtonText('Register'));
    expect(button.isEnabled()).toBeFalsy();
    element(by.css('input[id="registerEmailId"]')).sendKeys('john@email.com');
    element(by.css('input[id="registerPasswordId"]')).sendKeys('johnnny');
    await element(by.css('input[id="registerConfirmPasswordId"]')).sendKeys('johnnny');
    expect(button.isEnabled()).toBeTruthy();
    button.click();
    browser.sleep(2000);
    browser.driver.switchTo().activeElement();
    const loginButton = element(by.partialButtonText('Login'));
    expect(loginButton.isEnabled()).toBeFalsy();
    element(by.css('input[id="loginEmailId"]')).sendKeys('john@email.com');
    element(by.css('input[id="loginPasswordId"]')).sendKeys('johnnny');
    expect(loginButton.isEnabled()).toBeTruthy();
    loginButton.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/products/all');
  });

  it('should have product search', () => {
    const searchButton = element(by.partialButtonText('Search'));
    element(by.css('input[placeholder="Search"]')).sendKeys('apple');
    searchButton.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/products/search/apple');
    expect(element.all(by.partialButtonText('Add To Cart')).count()).toEqual(2);
  });

  it('should add to cart button to save in sessionStorage', () => {
    browser.get('#/products/fruit');
    const cards = element.all(by.partialButtonText('Add To Cart'));
    browser.wait(EC.elementToBeClickable(element(by.partialButtonText('Add To Cart'))), 5000);
    browser.actions().mouseMove(cards.get(4)).click().perform();
    browser.actions().mouseMove(cards.get(7)).click().perform();
    expect(browser.driver.executeScript('return sessionStorage.getItem("cart");')).toEqual(
      '[{"productId":"14","productName":"Guava","quantity":1,"price":50},{"productId":"21","productName":"Peach","quantity":1,"price":233}]'
      );
  });

  it('should have cart page with table and checkout button', () => {
    browser.get('#/cart');
    expect(element(by.tagName('table'))).toBeTruthy();
    expect(element(by.partialButtonText('Check Out'))).toBeTruthy();
    const heading = element.all(by.tagName('th'));
    expect(heading.get(0).getText()).toEqual('Product');
    expect(heading.get(1).getText()).toEqual('Price');
    expect(heading.get(2).getText()).toEqual('Quantity');
    expect(heading.get(3).getText()).toEqual('SubTotal');
    const quantityInput = element.all(By.css('input[type="number"]'));
    quantityInput.get(1).clear();
    quantityInput.get(1).sendKeys('3');
    expect(quantityInput.get(1).getAttribute('value')).toEqual('3');
  });

  it('should have account page with an accordion with two cards "User Details" and "Previous Orders"', () => {
    browser.get('#/account');
    expect(element(by.className('accordion'))).toBeTruthy();
    expect(element(by.partialButtonText('User Details'))).toBeTruthy();
    expect(element(by.partialButtonText('Orders'))).toBeTruthy();
    expect(element.all(By.className('card-body')).get(0).element(By.tagName('form'))).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

});
