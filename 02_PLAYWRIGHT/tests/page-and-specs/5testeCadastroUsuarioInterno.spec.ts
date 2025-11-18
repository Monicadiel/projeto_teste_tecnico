import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";
import { CadastroUsuarioPage } from "./cadastro-usuário-page";
import { ListaUsuariosPage } from "./lista-usuarios-page";

test.beforeEach("Abrir aplicação e preparar o cenário", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});

test.describe("Teste de Cadastro de usuário interno  no sistema", () => {
  test("[005] Teste de Cadastro de usuário interno  no sistema", async ({ page }) => {
    test.slow();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    const cadastroUsuarioPage = new CadastroUsuarioPage(page);
    const listaUsuariosPage = new ListaUsuariosPage(page);
    
    await test.step("Realizar login com CREDENCIAIS VÁLIDAS Administrador", async () => {
      let userData: { name: string; email: string; password: string };
      await loginPage.clickRegister();
      userData = await loginPage.registerNormalNewUser("SIM");
      await homePage.validarMenuAdministrador();
    });

    await test.step("Cadastrar novo usuário no menu 'cadastrar usuário'", async () => {
      await homePage.clicarMenuCadastrarUsuario();
      await homePage.validarMenuAdministrador();
      let newUserData = await cadastroUsuarioPage.gerarCadastroUsuario();
      const nomeEsperado = await cadastroUsuarioPage.gravarCadastroUsuarios(newUserData.name, newUserData.email, newUserData.password);
      await listaUsuariosPage.validarGrid(nomeEsperado);
    });
    
  });
});
