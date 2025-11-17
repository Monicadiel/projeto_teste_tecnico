// Importa ferramentas essenciais do Playwright
import { expect, Locator, Page } from "@playwright/test";

// Classe responsável pelas ações e validações da página de Cadastro de Produto
export class ListarProdutosPage {
  readonly page: Page;

  // Exemplo de variáveis auxiliares (caso use para gerar nomes aleatórios)
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  private index = 0;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Valida se o produto recém cadastrado aparece na última linha da tabela.
   * @param nomeEsperado Nome que deve ser encontrado na tabela
   */
  async validarGrid(nomeEsperado: string) {
    // Aguarda a tabela carregar
    await this.page.waitForSelector("tbody tr");

    // Captura todas as linhas da tabela
    const linhas = this.page.locator("tbody tr");
    const total = await linhas.count();

    if (total === 0) {
      throw new Error("Nenhuma linha encontrada na tabela.");
    }

    let encontrado = false;

    // Percorre todas as linhas procurando o nome
    for (let i = 0; i < total; i++) {
      const linha = linhas.nth(i);
      const nome = await linha.locator("td").nth(0).innerText();

      if (nome.trim() === nomeEsperado) {
        encontrado = true;
        break;
      }
    }

    // Validação final
    expect(encontrado).toBeTruthy();

    if (!encontrado) {
      throw new Error(`O nome "${nomeEsperado}" não foi encontrado em nenhuma linha da tabela.`);
    }
  }
}
