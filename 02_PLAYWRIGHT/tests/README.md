📘 Cenários de Teste – Desafio QA Automation

Este documento apresenta a descrição formal dos cinco cenários de teste elaborados conforme solicitado no desafio técnico. Cada teste contém: descrição, condições, pré-condições, passos detalhados, validações, resultado esperado, motivo e criticidade.

✅ TESTE 1
Descrição: Teste de Login

Condições do teste:
Ter um cadastro prévio no site. Para isso acesse o site previamente, clique em cadastrar-se, insira os dados na tela (nome, e-mail e senha) e clique em “cadastrar”.

Pré-Condições:
Ter acesso ao site serverest. Ter o login (e-mail e senha) previamente cadastrados para inserir na tela de login.

Passo a passo do teste:
Acesse o site. Na tela de login insira o e-mail e senha de acesso.

Validações:

Validação 1: Inserir e-mail e senha válidos: o login deve ser acessado com sucesso.

Validação 2: Inserir e-mail inválido e senha válida: login não será efetuado e um alerta apresentado.

Validação 3: Inserir e-mail válido e senha inválida: login não será efetuado e um alerta apresentado.

Resultado Esperado:
Ao inserir os dados válidos (previamente cadastrados) o login será efetuado; ao inserir algum dado de login inválido o login não será acessado e um alerta deve ser apresentado. Mensagem de alerta esperada: "Email e/ou senha inválidos".

Motivo da escolha: Funcionalidade básica de um site de compras e que envolve dados sensíveis do usuário/cliente que possui cadastro.

Criticidade: 1-Alto

✅ TESTE 2
Descrição: Teste de cadastro de novo usuário a partir da tela de login

Condições do teste:
Não há. Não há necessidade de cadastros prévios.

Pré-Condições:
Ter acesso ao site serverest.

Passo a passo do teste:
Acesse o site.
Na tela de login clique em “cadastrar-se”.
Na tela de cadastro, insira os dados na tela (nome, e-mail e senha) e clique em “cadastrar”.
Na tela existe um checkbox para indicar a opção “administrador” que define o tipo de usuário; ele será usado nas validações a seguir.

Validações:

Validação 1: Quando o usuário cadastrado for administrador, após logar, deve apresentar o layout respectivo, que inclui cadastro de produtos, cadastro de usuário, lista de produtos e lista de usuários.

Resultado Esperado:
Quando o usuário cadastrado for administrador, após logar, deve apresentar o layout respectivo, que inclui cadastro de produto, lista de produto, cadastro de usuário e lista de usuário.

Motivo da escolha: Funcionalidade importante de um site. Os parâmetros do sistema devem ser respeitados de acordo com cada usuário/perfil selecionados.

Criticidade: 1-Alto

✅ TESTE 3
Descrição: Teste de procurar e adicionar produtos na lista

Condições do teste:
Ter um cadastro prévio no site com o perfil comum para realizar a compra. Ter um produto cadastrado.

Pré-Condições:
Ter acesso ao site serverest.

Condição 1 – Usuário

Ter um cadastro prévio no site. Para isso acesse o site previamente, clique em cadastrar-se, insira os dados na tela (nome, e-mail e senha).
Para o checkbox “Administrador”, não deve ser indicado.
Para esse teste usaremos o perfil comum de comprador.
Agora você pode acessar o site e visualizat os produtos, lista de compra e carrinho.

Condição 2 – Produtos

Para cadastrar o produto que será usado no teste, realize um cadastro de usuário do tipo administrador.
Na mesma tela de cadastro, crie mais um usuário, agora indicando o checkbox “Administrador” como sim.
Realize o login com esse usuário.
No menu “Cadastro de produtos” cadastre o produto com os dados para usar nesse teste.

Passo a passo do teste:
Acesse o site.
Na tela de login insira o e-mail e senha de acesso do usuário perfil comum (com o usuário previamente cadastrado).
Na tela Home já será possível visualizar a lista de produtos disponíveis no site.
Através do campo “Pesquisar produtos”, pesquise o item previamente cadastrado.
Adicione o item na lista.
O item adicionado deve aparecer na lista de compras de acordo com a quantidade e preço.

Resultado Esperado:
O produto pesquisado deve ser apresentado em tela e deve ser adicionado na lista de compras de acordo com a quantidade e preço.

Motivo da escolha: Fluxo importante para o cliente do site.

Criticidade: 1-Alto

✅ TESTE 4
Descrição: Teste de cadastro de produtos usando usuário perfil administrador (checkbox ADM “sim”)

Condições do teste:
Ter acesso ao site serverest.
Ter um cadastro prévio no site com o perfil administrador.

Pré-Condições:
Ter um cadastro prévio no site.
Para isso acesse o site previamente, clique em cadastrar-se, insira os dados na tela (nome, e-mail e senha).
Indique o checkbox “Administrador” e clique em “cadastrar”.
Agora você terá um usuário com perfil administrador que é capaz de realizar cadastros de produtos.

Passo a passo do teste:
Acesse o site.
Na tela de login insira o e-mail e senha de acesso (com o usuário previamente cadastrado).
Acesse o menu superior “Cadastro de produtos”.
Insira os dados necessários, como nome, descrição, valor e imagem.
Salve o produto.
No item de menu “Lista de produtos” valide se o produto foi salvo corretamente.

Resultado Esperado:
O produto foi salvo no cadastro e deve ser apresentado na lista corretamente.

Motivo da escolha: O cadastro de novos produtos é uma funcionalidade importante de um site de compras. É preciso validar se os produtos são salvos e se os valores são corretamente adicionados.

Criticidade: 1-Alto

✅ TESTE 5
Descrição: Teste de cadastro de usuário usando usuário perfil administrador (checkbox ADM “sim”)

Condições do teste:
Ter um cadastro prévio no site com o perfil administrador.

Pré-Condições:
Ter acesso ao site serverest.
Ter um cadastro de usuário com perfil administrador prévio no site.
Para isso acesse o site previamente, clique em cadastrar-se, insira os dados na tela (nome, e-mail e senha).
Indique o checkbox “Administrador” e clique em “cadastrar”.
Agora você terá um usuário com perfil administrador, capaz de realizar cadastros de usuário.

Passo a passo do teste:
Acesse o site.
Na tela de login insira o e-mail e senha de acesso (com o usuário previamente cadastrado).
Acesse o menu superior “Cadastro de usuário”.
Insira os dados necessários, como nome, e-mail e senha.
Salve o usuário.
No item menu “Lista de usuários” valide se o usuário foi salvo corretamente.

Resultado Esperado:
O usuário foi salvo no cadastro e deve ser apresentado na lista corretamente.

Motivo da escolha: O cadastro de novos usuários pelo administrador do site é uma funcionalidade importante.

Criticidade: 1-Alto
