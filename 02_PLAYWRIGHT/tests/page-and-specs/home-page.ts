import { expect, type Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;

  private homeLocator: Locator;
  private listaComprasLocator: Locator;
  private carrinhoLocator: Locator;
  private cadastrarUsuariosLocator: Locator;
  private listarUsuariosLocator: Locator;
  private cadastrarProdutosLocator: Locator;
  private listarProdutosLocator: Locator;
  private relatoriosLocator: Locator;
  private logoutLocator: Locator;
  private pesquisaLocator: Locator;
  private botaoPesquisarLocator: Locator;
  private botaoAdicionarLista: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLocator = page.getByTestId("home");
    this.listaComprasLocator = page.getByTestId("lista-de-compras");
    this.carrinhoLocator = page.getByTestId("carrinho");
    this.cadastrarUsuariosLocator = page.getByTestId("cadastrar-usuarios");
    this.listarUsuariosLocator = page.getByTestId("listar-usuarios");
    this.cadastrarProdutosLocator = page.getByTestId("cadastrar-produtos");
    this.listarProdutosLocator = page.getByTestId("listar-produtos");
    this.relatoriosLocator = page.getByTestId("link-relatorios");
    this.logoutLocator = page.getByTestId("logout");
    this.pesquisaLocator = page.getByTestId("pesquisar");
    this.botaoPesquisarLocator = page.getByTestId("botaoPesquisar");
    this.botaoAdicionarLista = page.getByTestId("adicionarNaLista");
  }

  /**
   * Método auxiliar para garantir que um elemento esteja visível
   * antes de qualquer interação.
   *
   * Isso melhora a estabilidade dos testes, evitando falhas causadas
   * por carregamentos lentos ou delays na renderização.
   *
   * @param locator Locator do elemento que deve estar visível
   */
  private async esperarVisivel(locator: Locator) {
    await expect(locator).toBeVisible({timeout: 5000 });
  }

  /**
   * Valida se o menu exibido para o usuário comum está correto.
   * Verifica a visibilidade das opções: Home, Lista de compras e Carrinho.
   */
  async validarMenuUsuarioComum() {
    await Promise.all([
      this.esperarVisivel(this.homeLocator),
      this.esperarVisivel(this.listaComprasLocator),
      this.esperarVisivel(this.carrinhoLocator),
    ]);
  }

  /**
   * Valida se o menu exibido para o administrador está correto.
   * Verifica itens como cadastro, listagem e relatórios.
   */
  async validarMenuAdministrador() {
    await Promise.all([
      this.esperarVisivel(this.homeLocator),
      this.esperarVisivel(this.cadastrarUsuariosLocator),
      this.esperarVisivel(this.listarUsuariosLocator),
      this.esperarVisivel(this.cadastrarProdutosLocator),
      this.esperarVisivel(this.listarProdutosLocator),
      this.esperarVisivel(this.relatoriosLocator),
    ]);
  }

  /**
   * Realiza o clique no botão Logout.
   * Garante primeiro que o elemento está visível.
   */
  async clicarLogout() {
    await this.esperarVisivel(this.logoutLocator);
    await this.logoutLocator.click();
  }

  /**
   * Preenche o campo de pesquisa com o valor informado.
   *
   * @param valor Texto que será digitado no input de pesquisa
   */
  async fillPesquisar(valor: string) {
    await this.esperarVisivel(this.pesquisaLocator);
    await this.pesquisaLocator.fill(valor);
  }

  /**
   * Clica no botão de pesquisar, após garantir que esteja visível.
   */
  async clicarBotaoPesquisar() {
    await this.esperarVisivel(this.botaoPesquisarLocator);
    await this.botaoPesquisarLocator.click();
  }

  /**
   * Clica no botão de adicionar item à lista.
   * Usado em páginas que possuem a lista de compras.
   */
  async clicarBotaoAddLista() {
    await this.esperarVisivel(this.botaoAdicionarLista);
    await this.botaoAdicionarLista.click();
  }

  /**
   * Acessa o menu "Cadastrar Produto" no sistema.
   * Muito utilizado antes de abrir o formulário de cadastro.
   */
  async clicarMenuCadastrarProduto() {
    await this.esperarVisivel(this.cadastrarProdutosLocator);
    await this.cadastrarProdutosLocator.click();
  }

    async clicarMenuCadastrarUsuario() {
    await this.esperarVisivel(this.cadastrarUsuariosLocator);
    await this.cadastrarUsuariosLocator.click();
  }

}
