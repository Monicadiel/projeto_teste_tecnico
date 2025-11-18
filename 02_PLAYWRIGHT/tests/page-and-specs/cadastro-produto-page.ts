import { expect, Locator, Page } from "@playwright/test";

export class CadastroProdutoPage {
  readonly page: Page;
  readonly inputNome: Locator;
  readonly inputPreco: Locator;
  readonly inputDescricao: Locator;
  readonly inputQuantidade: Locator;
  readonly inputImagem: Locator;
  readonly btnCadastrar: Locator;
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  private index = 0;

  constructor(page: Page) {
    this.page = page;
    this.inputNome = page.locator('[data-testid="nome"]');
    this.inputPreco = page.locator('[data-testid="preco"]');
    this.inputDescricao = page.locator('[data-testid="descricao"]');
    this.inputQuantidade = page.locator('[data-testid="quantity"]');
    this.inputImagem = page.locator('[data-testid="imagem"]');
    this.btnCadastrar = page.locator('[data-testid="cadastrarProdutos"]');
  }

async gerarNomeUnico(nomeBase: string, workerIndex?: number): Promise<string> {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let sufixo = "";
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * alphabet.length);
    sufixo += alphabet[index];
  }

  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);

  return `${nomeBase}-${sufixo}-${timestamp}-${random}${workerIndex !== undefined ? `-W${workerIndex}` : ""}`;
}

  async preencherCadastroProduto(nomeBase: string, preco: string, descricao: string, quantidade: string, caminhoImagem: string) {
    const nomeGerado = await this.gerarNomeUnico(nomeBase);

    await this.inputNome.fill(nomeGerado);
    await this.inputPreco.fill(preco);
    await this.inputDescricao.fill(descricao);
    await this.inputQuantidade.fill(quantidade);
    await this.inputImagem.setInputFiles(caminhoImagem);
    await this.page.keyboard.press("Tab"); // Trocar de campo
    await this.page.keyboard.press("Tab"); // Trocar de campo
    await this.page.keyboard.press("Enter"); // Pressionar cadastrar
    return nomeGerado;
  }

 
}
