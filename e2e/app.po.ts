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
}
