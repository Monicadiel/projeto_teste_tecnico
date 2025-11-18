import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";
import { ListaComprasPage } from "./lista-compras-page";
import { CadastroProdutoPage } from "./cadastro-produto-page";
import { ListarProdutosPage } from "./listar-produtos-page";

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
    const cadastroProdutoPage = new CadastroProdutoPage(page);
    const listarProdutosPage = new ListarProdutosPage(page);
    const caminhoImagem = "C:\\ProjetosVScode\\PlayWright\\projetoMonicaSenior\\tests\\commons.ts\\ImagemProduto001.png";
    let nomeGerado: string;

    await test.step("Realizar cadastro de usuário adminitrador", async () => {
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("SIM");
        await homePage.validarMenuAdministrador();
    });

    await test.step("Cadastrar produto novo no menu 'Cadastrar Produto' com o usuário administrador", async () => {
      await homePage.clicarMenuCadastrarProduto();
      nomeGerado = await cadastroProdutoPage.preencherCadastroProduto("Monitor Gamer Full HD", "2000", "Monitor de 24 polegadas ideal para jogos.", "1", caminhoImagem);
      await listarProdutosPage.validarGrid(nomeGerado);
      await homePage.clicarLogout();
    });

    await test.step("Criar usuário comum e realizar login", async () => {
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("NÃO");
      await homePage.validarMenuUsuarioComum();
    });

    await test.step("Buscar produto", async () => {
      await homePage.fillPesquisar(nomeGerado);
      await homePage.clicarBotaoPesquisar();
    });

    await test.step("adicionar e validar produtos na lista", async () => {
      await homePage.clicarBotaoAddLista();
      await listaComprasPage.validarNomeProdutoEsperado(nomeGerado);
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
