import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('angular-truffle-box meta-sender', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should transfer money', () => {
    page.navigateTo();
    page.setAddress(0);
    browser.driver.sleep(100);

    expect(page.getBalance()).toBe('10000');

    page.setAmount('50');
    page.setToAddress('0xf17f52151ebef6c7334fad080c5704d77216b732');
    page.clickSend();

    browser.driver.sleep(1000);

    // Auto-refresh is broken in test for some reason
    page.navigateTo();

    expect(page.getBalance()).toBe('9950');
    page.clickSelect();
    page.setAddress(1);
    browser.driver.sleep(100);
    expect(page.getBalance()).toBe('50');
  });
});
