import { Page, Locator } from "@playwright/test";

/**
 * Classe que representa a página de cadastro de usuários.
 * Contém os locators dos campos de formulário e métodos para interagir com a página.
 */
export class CadastroUsuarioPage {
  readonly page: Page;
  readonly campoNome: Locator;
  readonly campoEmail: Locator;
  readonly campoSenha: Locator;
  readonly botaoCadastrar: Locator;

  /**
   * Construtor da página de cadastro de usuário.
   * Inicializa os locators dos elementos presentes na página.
   * @param page Instância da página do Playwright.
   */
  constructor(page: Page) {
    this.page = page;

    // Locators conforme aparecem no HTML
    this.campoNome = page.locator('input[data-testid="nome"]');
    this.campoEmail = page.locator('input[data-testid="email"]');
    this.campoSenha = page.locator('input[data-testid="password"]');
    this.botaoCadastrar = page.locator('button:has-text("Cadastrar")');
  }

  /**
   * Gera um nome único adicionando um sufixo aleatório de 3 letras ao nome base.
   * @param nomeBase O nome base a ser utilizado.
   * @returns Uma Promise que resolve para o nome único gerado.
   */
  async gerarNomeUnico(): Promise<string> {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name = "";

    for (let i = 0; i < 20; i++) {
      const index = Math.floor(Math.random() * alphabet.length);
      name += alphabet[index];
    }

    //return `${nomeBase} ${sufixo}`;
    return name;
  }

  /**
   * Gera um cadastro de usuário preenchendo automaticamente os campos de nome, email e senha.
   * Utiliza o método gerarNomeUnico para criar um nome único.
   * @param nomeBase Nome base para gerar o nome único.
   * @param email Email do usuário.
   * @param senha Senha do usuário.
   * @returns Uma Promise que resolve para o nome único gerado.
   */

  async gerarCadastroUsuario() {
    let newUserData: { name: string; email: string; password: string } = {
      name: "",
      email: "",
      password: "",
    };

    // Depois preenche
    newUserData.name = await this.gerarNomeUnico();
    newUserData.email = `${newUserData.name}@example.com`;
    newUserData.password = "123456";

    return newUserData;
  }

  async gravarCadastroUsuarios(nomeBase: string, email: string, senha: string) {
    await this.campoNome.fill(nomeBase);
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(senha);
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Enter"); //para pressionar o botão cadastrar
    return nomeBase;
  }
}
