import { expect, type Page, Locator } from "@playwright/test";

export class ListaComprasPage {
  private page: Page;

  // --- Locators ---
  /** Localiza o nome do produto exibido na lista de compras */
  private productNameLocator: Locator;

  /** Localiza a quantidade atual do produto na lista */
  private productQuantity: Locator;

  /** Botão para aumentar a quantidade do produto */
  private increaseButtonLocator: Locator;

  /** Botão para diminuir a quantidade do produto */
  private decreaseButtonLocator: Locator;

  /** Localiza o preço do produto na lista */
  private productPriceLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productNameLocator = this.page.getByTestId("shopping-cart-product-name");
    this.productQuantity = this.page.getByTestId("shopping-cart-product-quantity");
    this.increaseButtonLocator = this.page.getByTestId("product-increase-quantity");
    this.decreaseButtonLocator = this.page.getByTestId("product-decrease-quantity");
    this.productPriceLocator = this.page.locator("p:has-text('Preço')");
  }

  /**
   * Valida se o nome exibido no carrinho contém o nome esperado.
   *
   * @param nomeEsperado Nome que deve estar presente no item da lista
   */
  async validarNomeProdutoEsperado(nomeEsperado: string) {
    await expect(this.productNameLocator).toBeVisible();
    const nomeProduto = await this.productNameLocator.textContent();
    expect(nomeProduto?.trim()).toContain(nomeEsperado);
  }

  /**
   * Valida se a quantidade do produto corresponde ao valor esperado.
   *
   * @param numeroEsperado Quantidade que deve estar sendo exibida
   */
  async validarProductQuantity(numeroEsperado: string) {
    await expect(this.productQuantity).toBeVisible();
    const nomeProduto = await this.productQuantity.textContent();
    expect(nomeProduto?.trim()).toContain(numeroEsperado);
  }

  /**
   * Clica no botão de aumentar quantidade do produto.
   */
  async clickIncrease() {
    await expect(this.increaseButtonLocator).toBeVisible();
    await this.increaseButtonLocator.click();
  }

  /**
   * Clica no botão de diminuir quantidade do produto.
   */
  async clickDecrease() {
    await expect(this.decreaseButtonLocator).toBeVisible();
    await this.decreaseButtonLocator.click();
  }

  /**
   * Valida o preço do produto exibido na lista de compras.
   *
   * @param precoEsperado Valor esperado do produto
   */
  async validarPrecoEsperado(precoEsperado: string) {
    await expect(this.productPriceLocator).toBeVisible();
    const preco = await this.productPriceLocator.textContent();

    // remove espaços em branco antes de validar
    expect(preco?.replace(/\s+/g, "")).toContain(precoEsperado);
  }
}
