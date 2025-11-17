import { Page, Locator, expect } from "@playwright/test";

export class ListaUsuariosPage {
  readonly page: Page;
  readonly tabelaLinhas: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabelaLinhas = page.locator("tbody tr");
  }

  /**
   * Valida se um usuário existe na grid.
   * Lança erro e falha o teste se não encontrar.
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
