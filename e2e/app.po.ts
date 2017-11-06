import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    browser.get('/');
    return browser.driver.sleep(1000);
  }

  getHeader() {
    return element(by.css('h1')).getText();
  }

  setAddress(address: string) {
    return element(by.cssContainingText('select', address)).click();
  }

  setToAddress(address: string) {
    return element(by.id('receiver')).sendKeys(address);
  }

  setAmount(amount: string) {
    return element(by.id('amount')).sendKeys(amount);
  }
}
