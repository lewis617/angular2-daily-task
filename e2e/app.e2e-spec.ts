import { Angular2DailyTaskPage } from './app.po';

describe('angular2-daily-task App', function() {
  let page: Angular2DailyTaskPage;

  beforeEach(() => {
    page = new Angular2DailyTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
