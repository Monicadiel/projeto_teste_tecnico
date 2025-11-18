import { expect, type Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;

  // Locators
  private nameFieldLocator: Locator;
  private emailFieldLocator: Locator;
  private passwordFieldLocator: Locator;
  private loginButtonLocator: Locator;
  private errorMessageLocator: Locator;
  private closeErrorButtonLocator: Locator;
  private registerLinkLocator: Locator;
  private adminCheckboxLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameFieldLocator = this.page.locator('input[placeholder="Digite seu nome"]');
    this.emailFieldLocator = this.page.locator('input[placeholder="Digite seu email"]');
    this.passwordFieldLocator = this.page.locator('input[placeholder="Digite sua senha"]');
    this.loginButtonLocator = this.page.getByRole("button", { name: "Entrar" });
    this.errorMessageLocator = this.page.getByText("Email e/ou senha inválidos");
    this.closeErrorButtonLocator = this.page.locator('button.close.btn-close-error-alert[type="button"]');
    this.registerLinkLocator = this.page.locator('[data-testid="cadastrar"]');
    this.adminCheckboxLocator = this.page.getByTestId("checkbox");
  }

  

  /**
   * Retorna a data e hora atual formatada como string para uso em nomes ou emails únicos.
   * Formato: YYYYMMDD_HHMMSS
   */
  private getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // mês 0-11
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}_${hour}${minute}${second}`;
  }

  /**
   * Preenche o campo de nome com o valor fornecido.
   * @param name Nome do usuário
   */
  async fillName(name: string) {
    await this.nameFieldLocator.fill(name);
  }

  /**
   * Preenche o campo de email com o valor fornecido.
   * @param email Email do usuário
   */
  async fillEmail(email: string) {
    await this.emailFieldLocator.fill(email);
  }

  /**
   * Preenche o campo de senha com o valor fornecido.
   * @param password Senha do usuário
   */
  async fillPassword(password: string) {
    await this.passwordFieldLocator.fill(password);
  }

  /**
   * Clica no botão de login.
   */
  async clickLoginButton() {
    await this.loginButtonLocator.click();
  }

  /**
   * Executa o login preenchendo email e senha e clicando no botão de login.
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async login(email: string, password: string) {
  await this.assertEmailVisible();
  await this.assertPasswordVisible();
  await this.fillEmail(email);
  await this.fillPassword(password);
  await this.clickLoginButton();
}

  /**
   * Verifica se o campo de email está visível na tela.
   */
  async assertEmailVisible() {
    await expect(this.emailFieldLocator).toBeVisible();
  }

  /**
   * Verifica se o campo de senha está visível na tela.
   */
  async assertPasswordVisible() {
    await expect(this.passwordFieldLocator).toBeVisible();
  }

  /**
   * Verifica se a mensagem de login inválido está visível.
   */
  async assertInvalidLoginMessageVisible() {
    await expect(this.errorMessageLocator).toBeVisible();
  }

  /**
   * Clica no botão para fechar a mensagem de erro.
   */
  async clickCloseErrorButton() {
    await this.closeErrorButtonLocator.click();
  }

  /**
   * Clica no link para registrar um novo usuário.
   */
  async clickRegister() {
    await expect(this.registerLinkLocator).toBeVisible();
    await this.registerLinkLocator.click();
  }

  
  /**
   * Preenche os campos para registrar um novo usuário normal com dados únicos.
   * @returns Objeto com name, email e password do novo usuário
   */
  async registerNormalNewUser(administrador: string) {
    const timestamp = this.getFormattedDateTime();

    const user_random = Math.floor(Math.random() * 1000000);

    const uniqueName = `usuario${timestamp}_${user_random}`;

    console.log(uniqueName);

    const uniqueEmail = `usuario${timestamp}_${user_random}@gmail.com`;
    const password = "12345";

    // Preenche os campos
    await this.fillName(uniqueName);
    await this.fillEmail(uniqueEmail);
    await this.fillPassword(password);

    await this.page.keyboard.press("Tab"); // da senha pro checkbox

    // "SIM", marca; se "NÃO", não faz nada
    if (administrador?.toUpperCase() === "SIM") {
      await this.adminCheckboxLocator.check();
    }

    await this.page.keyboard.press("Tab"); // do checkbox para o botão Cadastrar
    await this.page.keyboard.press("Enter"); // aciona o botão

    return { name: uniqueName, email: uniqueEmail, password };
  }
}
