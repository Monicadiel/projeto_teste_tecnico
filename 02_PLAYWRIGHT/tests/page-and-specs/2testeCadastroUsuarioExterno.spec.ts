import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";

test.beforeEach("Abrir aplicação e preparar o cenário", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});

test.describe("Realizar o cadastro de usários - administrador e não administrador", () => {
  test("[002] Realizar o cadastro de usários - administrador e não administrador.", async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step("Clicar em cadastrar-se", async () => {
      await loginPage.clickRegister();
    });

    await test.step("Cadastrar novo usuário não administrador ", async () => {
      const userData = await loginPage.registerNormalNewUser("NÃO");
    });

    await test.step("Validar os menus do usuário não administrador", async () => {
      await homePage.validarMenuUsuarioComum();
    });

    await test.step("fazer LogOut", async () => {
      await homePage.clicarLogout();
    });

    await test.step("Clicar em cadastrar-se", async () => {
      await loginPage.clickRegister();
    });

    await test.step("Cadastrar novo usuário administrador ", async () => {
      const userData = await loginPage.registerNormalNewUser("SIM");
    });

    await test.step("Validar os menus do usuário administrador", async () => {
      await homePage.validarMenuAdministrador();
    });

    await test.step("fazer LogOut", async () => {
      await homePage.clicarLogout();
    });
  });
});
