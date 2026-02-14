# UMC Receitas
Projeto simples de receitas culinarias usando HTML, CSS e JavaScript puros.

Link: `https://oliveira-iago-temp.github.io/umc-receitas/`

## Estrutura de pastas
- `index.html`
- `pages/receita.html`
- `styles/style.css`
- `scripts/app.js`
- `assets/images/`

## Funcionalidades
- Pagina inicial com cards de receitas (imagem, titulo e descricao).
- Pagina de detalhe da receita com:
  - imagem da receita
  - titulo e descricao
  - lista de ingredientes
  - lista de modo de preparo
- Header com logo e nome do site.
- Na pagina de receita, botao `Voltar ao inicio`.
- Layout responsivo para desktop, tablet e celular.
- Imagens locais em `assets/images`.

## Logica de funcionamento
1. Toda a logica da aplicacao fica em `scripts/app.js`.
2. Os dados das receitas ficam no mesmo arquivo, em um array de objetos com `id` numerico.
3. Na home (`index.html`), o script monta os cards dinamicamente.
4. Cada card aponta para `pages/receita.html?id=N`.
5. Na pagina de receita, o script le o `id` da URL e renderiza a receita correspondente.
6. Se o `id` for invalido ou ausente, a primeira receita do array e exibida como padrao.

## Rotas e parametros
- Home: `index.html`
- Receita: `pages/receita.html?id=N`

Exemplos:
- `pages/receita.html?id=1`
- `pages/receita.html?id=2`
- `pages/receita.html?id=3`

## Estrutura do objeto de receita
Cada receita segue este formato:
- `id`
- `titulo`
- `descricao`
- `imagem`
- `imagemAlt`
- `ingredientes` (array)
- `passos` (array)

## Recursos visuais
- Paleta de cores definida em variaveis CSS no `styles/style.css`.
