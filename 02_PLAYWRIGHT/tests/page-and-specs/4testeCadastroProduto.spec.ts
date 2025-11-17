import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";
import { CadastroProdutoPage } from "./cadastro-produto-page";
import { ListarProdutosPage } from "./listar-produtos-page";

test.beforeEach("Abrir aplicação e preparar o cenário", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});

test.describe("Teste de Cadastro de produto", () => {
  test("[004] Teste de Cadastro de produto", async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cadastroProdutoPage = new CadastroProdutoPage(page);
    const listarProdutosPage = new ListarProdutosPage(page);
    let userData: { name: string; email: string; password: string };
    const caminhoImagem = "C:\\ProjetosVScode\\PlayWright\\projetoMonicaSenior\\tests\\commons.ts\\ImagemProduto001.png";

    await test.step("Realizar login com CREDENCIAIS VÁLIDAS Administrador", async () => {
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("SIM");
      await homePage.validarMenuAdministrador();
    });

    await test.step("Cadastrar produto novo no menu 'Cadastrar Produto'", async () => {
      await homePage.clicarMenuCadastrarProduto();
      const nomeGerado = await cadastroProdutoPage.preencherCadastroProduto("Monitor Gamer Full HD", "1299", "Monitor de 24 polegadas ideal para jogos.", "5", caminhoImagem);
      await listarProdutosPage.validarGrid(nomeGerado);
    });
  });
});
