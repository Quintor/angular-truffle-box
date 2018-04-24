import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    browser.get('/');
    return browser.driver.sleep(1000);
  }

  getHeader() {
    return element(by.css('mat-toolbar')).getText();
  }

  getButton() {
    return element(by.id('send'));
  }

  getBalance() {
    return element(by.id('balance')).getText();
  }

  clickSelect() {
    return element(by.id('address-selector')).click();
  }

  setAddress(index: number) {
    return element.all(by.tagName('mat-option')).filter((
      (el, i) => {
        return index === i;
      }
    )).click();
  }

  setToAddress(address: string) {
    return element(by.id('receiver')).sendKeys(address);
  }

  setAmount(amount: string) {
    return element(by.id('amount')).sendKeys(amount);
  }

  clickSend() {
    return this.getButton().click();
  }
}
