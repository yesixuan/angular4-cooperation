import { CooperationPage } from './app.po';

describe('cooperation App', () => {
  let page: CooperationPage;

  beforeEach(() => {
    page = new CooperationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
