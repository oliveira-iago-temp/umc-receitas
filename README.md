# UMC Receitas
Projeto de receitas culinarias usando HTML, CSS e JavaScript puros.
- Layout responsivo (desktop, tablet e celular).

Link do site: [https://oliveira-iago-temp.github.io/umc-receitas/](https://oliveira-iago-temp.github.io/umc-receitas/)

## Estrutura de pastas
- `index.html`
- `pages/receita.html`
- `styles/style.css`
- `scripts/app.js`
- `assets/images/logo-umc-receita.png`
- `assets/images/receitas/` (imagens das receitas)

## Como o projeto funciona
1. O arquivo `scripts/app.js` controla toda a logica.
2. Existem 18 receitas locais (mockadas) em portugues no proprio `app.js`.
3. Depois das 18 locais, o sistema agrega mais receitas da API TheMealDB.
4. O limite atual da API e `MAX_RECEITAS_API = 50`.
5. A pagina inicial mostra cards com paginacao de `12` por pagina.
6. Cada card aponta para `pages/receita.html?id=N`.
7. Na pagina de detalhe:
   - receitas locais usam ingredientes e passos locais;
   - receitas da API buscam detalhes por `lookup.php?i=`.

## Fonte de dados
- API: `https://www.themealdb.com/api/json/v1/1`
- Busca principal usada: `search.php?f=a...z`

## Regras atuais de imagem
- Receitas locais usam imagens em `assets/images/receitas/*.jpg`.
- Logo usa `assets/images/logo-umc-receita.png`.
- Receitas da API usam `meal.strMealThumb` quando disponivel.
- Se uma imagem falhar, cai no fallback local:
  - `assets/images/receitas/empty.jpg`

## Rotas
- Home: `index.html`
- Receita: `pages/receita.html?id=N`

