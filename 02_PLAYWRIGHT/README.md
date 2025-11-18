📘 README – Execução dos Testes e Fluxo com GitHub

Este documento contém as instruções necessárias para instalação, execução e gerenciamento do projeto de testes automatizados utilizando Playwright.


📂 1. Pré-requisitos

Antes de iniciar, certifique-se de possuir:

Node.js (versão recomendada: 18+)

npm (instalado junto com o Node)

VS Code (opcional, mas recomendado)

Git instalado

Acesso ao repositório GitHub onde os testes serão enviados


🚀 2. Instalação do Projeto

No terminal, dentro da pasta do projeto:

npm install


Instale o Playwright:

npx playwright install


(Esse comando instala os browsers: Chromium, Firefox e WebKit.)


🧪 3. Como rodar os testes

▶️ 3.1 Rodar todos os testes
npx playwright test

🎯 3.2 Rodar um teste específico (por arquivo)
npx playwright test nomeDoArquivo.spec.ts


Exemplo:

npx playwright test login.spec.ts

🔍 3.3 Rodar um teste por título

Use a flag --grep:

npx playwright test --grep "texto do título"


Exemplo:

npx playwright test --grep "Deve realizar login com sucesso"


Para rodar apenas títulos que NÃO contenham algo:

npx playwright test --grep-invert "Login"

🧭 3.4 Rodar testes em modo visual (abrindo o navegador)
npx playwright test --headed

🧑‍💻 3.5 Rodar com UI do Playwright (modo fácil)
npx playwright test --ui

Abre a interface onde você pode clicar para rodar cada teste.

🔍 3.6 Rodar o teste usando o número do teste
npx playwright test -g "\[005\]" --project=chromium --headed



🗂 4. Organização do Projeto

Estrutura recomendada:

project/
│── tests/
│     ├── login.spec.ts
│     ├── cadastroUsuario.spec.ts
│     ├── produtos.spec.ts
│     └── README_TESTES.md  ← documentação dos cenários de teste
│
│── pages/
│     ├── LoginPage.ts
│     ├── CadastroPage.ts
│     └── ...
│
│── README.md  ← README técnico de execução, instalação e Git
│── playwright.config.ts


🌱 5. Como criar um novo teste

Dentro da pasta /tests, crie:

nomeDoTeste.spec.ts


Exemplo:

import { test, expect } from "@playwright/test";

test("meu novo teste", async ({ page }) => {
  await page.goto("https://front.serverest.dev/login");
});


🌐 6. Como enviar o projeto para o GitHub
6.1 Configurar o Git no projeto
git init


Adicionar os arquivos:

git add .


Commit inicial:

git commit -m "feat: adiciona projeto de automação"


Conectar com o repositório GitHub:

git remote add origin https://github.com/usuario/repositorio.git


Enviar:

git push -u origin main


(Ou se a branch padrão for master:)

git push -u origin master


🔄 7. Como atualizar o projeto com as alterações do GitHub

Se outro computador ou pessoa atualizou o repositório:

git pull


Se você estiver em outra branch:

git pull origin nomeDaBranch


📤 8. Como enviar novas alterações para o GitHub

Salvar e enviar novas alterações:

git add .
git commit -m "feat: atualiza testes"
git push


Se for a primeira vez enviando essa branch:

git push -u origin nomeDaBranch


🔧 9. Como criar uma nova branch
git checkout -b nomeDaBranch


Enviar essa branch:

git push -u origin nomeDaBranch


🧹 10. Limpando o projeto (cache de testes)
npx playwright test --reporter=list


Excluir o diretório de reports:

rm -rf playwright-report


❓ 11. Dicas úteis

💡 Rodar testes repetidamente sem abrir navegador:

npx playwright test --ignore-snapshots


💡 Ver log completo:

npx playwright test --verbose


💡 Gerar relatório bonito:

npx playwright show-report


💡 Rodar em firefox:
npx playwright test --project=firefox --headed
npx playwright test -g "\[003\]" --project=firefox --headed

💡 Rodar em webkit:
npx playwright test --project=webkit --headed
npx playwright test -g "\[003\]" --project=webkit --headed
