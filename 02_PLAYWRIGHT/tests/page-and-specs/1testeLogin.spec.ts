import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";

test.beforeEach("Abrir aplicação e preparar o cenário", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});

test.describe("Teste de Login validando inconsistencias do cenário e o login de sucesso", () => {
  test("[001] Teste de Login validando inconsistencias do cenário e o login de sucesso", async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    let userData: { name: string; email: string; password: string };

    await test.step("Realizar login com CREDENCIAIS VÁLIDAS", async () => {
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("NÃO");
      await homePage.clicarLogout();
      await loginPage.login(userData.email, userData.password);
      await loginPage.clickLoginButton();
      await homePage.validarMenuUsuarioComum();
      await homePage.clicarLogout();
    });

    await test.step("Realizar login com SENHA INVÁLIDA e e-mail válido e validar alerta", async () => {
      await loginPage.login(userData.email , "1234567");
      await loginPage.clickLoginButton();
      await loginPage.assertInvalidLoginMessageVisible();
      await loginPage.clickCloseErrorButton();
    });

    await test.step("Realizar login com senha válida e E-MAIL INVÁLIDO e validar alerta", async () => {
      await loginPage.login("email@hotmail.com" , userData.password);
      await loginPage.clickLoginButton();
      await loginPage.assertInvalidLoginMessageVisible();
      await loginPage.clickCloseErrorButton();
    });
  });
});
