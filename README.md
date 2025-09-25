# Desafio Frontend — Lista de Vendedores

Bem-vindo(a)! Este repositório contém a base de um desafio técnico voltado para desenvolvedores(as) React/Javascript com experiência em InertiaJS e Laravel. O objetivo é implementar a interface do fluxo de listagem de vendedores consumindo os dados expostos pelo backend já configurado.

## Objetivo do Desafio

- Reproduzir o layout fornecido no Figma para a tela de listagem de vendedores (`SellerList`), garantindo fidelidade visual e responsividade.
- Utilizar o stack existente (Laravel + InertiaJS + React + Tailwind CSS + TypeScript) para implementar filtros, paginação e interações previstas no design.
- Entregar uma experiência completa para seleção de estado/cidade, visualização dos vendedores e carregamento incremental conforme definido.

> **Link do Figma:** 

[Link do Layout Figma](https://www.figma.com/design/XYyh0jIGGwJCpii0JYFhdG/lista-revendas-teste-frontend?node-id=3289-2&m=dev&t=mfV33988Hbj8xbTU-1)

## Pré-requisitos

Certifique-se de ter o ambiente abaixo antes de iniciar:

- PHP **8.2** ou superior
- Composer **2.x**
- Node.js **20.x** (ou superior) e npm
- SQLite (já incluído em boa parte das instalações PHP)
- Git

## Passo a passo de configuração

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd frontend-dev-test
   ```

2. **Criar o arquivo de configuração**
   ```bash
   cp .env.example .env
   ```

3. **Instalar as dependências**
   ```bash
   composer install
   npm install
   ```

4. **Preparar o banco de dados SQLite**
   ```bash
   touch database/database.sqlite
   ```

5. **Gerar a chave da aplicação e rodar as migrations com seeders**
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```
   O seeder principal cria estados, cidades e vendedores fictícios para apoiar o desenvolvimento do frontend.

## Como executar o projeto

Há duas formas sugeridas para executar a aplicação em modo desenvolvimento:

### Opção 1 — Comando único (requer `npx`)
```bash
composer dev
```
Este comando sobe simultaneamente o servidor Laravel, a fila, os logs em tempo real e o Vite. Ideal para uma experiência completa durante o desafio.

### Opção 2 — Processos separados
1. Inicie o backend Laravel:
   ```bash
   php artisan serve
   ```
2. Em outro terminal, suba o bundler frontend:
   ```bash
   npm run dev
   ```

A aplicação ficará disponível em `http://localhost:8000`. A rota principal do desafio é `http://localhost:8000/sellers` (com parâmetros opcionais de estado e cidade, ex.: `/sellers/{stateId?}/{cityId?}`).

## Arquivos e rotas importantes

- `routes/web.php` — Define `Route::get('/sellers/{state?}/{city?}', SellerListController::class)` para servir a página via Inertia.
- `app/Http/Controllers/Sellers/SellerListController.php` — Responsável por buscar estados, cidades e vendedores, além de fornecer filtros e metadados de paginação para o frontend.
- `resources/js/pages/Sellers/Index.tsx` — Ponto de entrada do React que deve ser implementado seguindo o layout do Figma.
- `resources/js/app.tsx` & `resources/js/routes` — Configuração padrão do InertiaJS.

## O que deve ser desenvolvido

O backend já envia para o componente Inertia os seguintes dados:

- `sellers`: lista paginada (20 itens por página) contendo `id`, `name`, `email`, cidade e estado associados.
- `states`: lista completa de estados (`id`, `name`, `abbr`).
- `cities`: lista de cidades (`id`, `name`, `state_id`).
- `filters`: estado e cidade atualmente selecionados, quando houver.
- `hasMorePages`, `currentPage`, `nextPage`: metadados para implementar o carregamento de mais resultados.

Com base nisso, implemente na página `Sellers/Index`:

- Layout e componentes conforme o Figma, considerando estados de carregamento, vazios e responsividade.
- Filtro por estado e cidade. Ao selecionar um estado, restrinja a lista de cidades apenas às pertencentes àquele estado antes de permitir a seleção.
- Ação para carregar mais resultados quando `hasMorePages` for verdadeiro (ex.: botão “Carregar mais” que navega para a próxima página preservando filtros, utilizando o `router` do InertiaJS).
- Organização e componentização conforme necessário, mantendo a leitura do código clara para um(a) desenvolvedor(a) júnior-pleno.
- Remoção de logs temporários e uso consistente de TypeScript (tipagens derivadas das props enviadas pelo backend).

## Critérios de avaliação

- Fidelidade visual ao design (incluindo responsividade e estados alternativos).
- Uso adequado do InertiaJS: navegação sem reloading, preservação de filtros, utilização de `router` e `usePage`.
- Estrutura do código React/TypeScript: componentização, organização, legibilidade e aderência aos padrões do projeto.
- Tratamento de estados (carregando, vazio, erro) e feedbacks ao usuário.
- Qualidade geral: sem warnings relevantes no console, ausência de código morto, limpeza dos logs.

## Scripts úteis

- `npm run dev` — executa o Vite em modo desenvolvimento.
- `npm run build` — gera build de produção.
- `npm run lint` — roda ESLint com `--fix`.
- `npm run format` / `npm run format:check` — aplica ou verifica formatação com Prettier.
- `npm run types` — verifica tipos TypeScript.
- `composer test` — executa a suíte de testes PHP.

## Entrega

- Submeta o código em um fork ou branch dedicado e compartilhe o link do repositório público.
- Opcionalmente, inclua prints ou GIFs demonstrando o resultado.
- Documente no pull request quaisquer decisões relevantes ou trade-offs.

Bom trabalho! Estamos ansiosos para ver sua solução.
