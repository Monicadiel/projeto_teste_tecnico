import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";
import { ListaComprasPage } from "./lista-compras-page";

test.beforeEach("Abrir aplicação e preparar o cenário", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});

test.describe(" Buscar, adicionar e validar itens na lista de compras", () => {
  test("[003] Buscar, adicionar e validar itens na lista de compras", async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const listaComprasPage = new ListaComprasPage(page);
    let userData: { name: string; email: string; password: string };
    const produtoNome = "DELL MD";

    await test.step("Realizar login com CREDENCIAIS VÁLIDAS", async () => {
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("NÃO");
      await homePage.clicarLogout();
      await loginPage.login(userData.email, userData.password);
      await loginPage.clickLoginButton();
      await homePage.validarMenuUsuarioComum();
    });

    await test.step("Buscar produto", async () => {
      await homePage.fillPesquisar(produtoNome);
      await homePage.clicarBotaoPesquisar();
      await homePage.clicarBotaoAddLista();
    });

    await test.step("adicionar e validar produtos na lista", async () => {
      await homePage.clicarBotaoAddLista();
      await listaComprasPage.validarNomeProdutoEsperado(produtoNome);
    });

    await test.step("Aumentar e diminuir a lista validando valores", async () => {
      await listaComprasPage.validarProductQuantity("1");
      await listaComprasPage.validarPrecoEsperado("2000");
      await listaComprasPage.clickIncrease();
      await listaComprasPage.validarProductQuantity("2");
      await listaComprasPage.validarPrecoEsperado("4000");
      await listaComprasPage.clickDecrease();
      await listaComprasPage.validarProductQuantity("1");
      await listaComprasPage.validarPrecoEsperado("2000");
    });



  });
});
