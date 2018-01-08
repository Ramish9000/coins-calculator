import { CoinsCalculatorPage } from './app.po';

describe('coins-calculator App', () => {
  let page: CoinsCalculatorPage;

  beforeEach(() => {
    page = new CoinsCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
