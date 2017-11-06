import { AppPage } from './app.po';

describe('angular-truffle-box meta-sender', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should transfer money', () => {
    page.navigateTo();
    page.setAmount('50')
    page.setToAddress()
  });
});
