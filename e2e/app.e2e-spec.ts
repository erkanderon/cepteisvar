import { CepteisPage } from './app.po';

describe('cepteis App', () => {
  let page: CepteisPage;

  beforeEach(() => {
    page = new CepteisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
