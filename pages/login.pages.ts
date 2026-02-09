// pages/login.page.ts
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('メールアドレス');
  }

  async goto() {
    await this.page.goto('/login');
  }
}