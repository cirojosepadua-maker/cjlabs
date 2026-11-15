# CjLabs: site público

Páginas públicas dos apps da CjLabs, publicadas pelo GitHub Pages em
https://cirojosepadua-maker.github.io/cjlabs/ (Settings → Pages → Deploy from a
branch → `main`, pasta raiz).

**Este repositório é o original das páginas públicas** (desde 15/11/2026): mude
aqui. As pastas `site/` antigas do Gude Rush e do Quiz de Geografia ficaram
desatualizadas.

## Estrutura

```
index.html          página da CjLabs: um cartão por app, que leva à página dele
estilo.css          estilo comum (cada app só troca a cor: classe no <body>)
<app>/index.html    página do app: Como funciona, Política de privacidade, Privacy policy
<app>/como-funciona.html   o que é o app e como se joga (português)
<app>/privacidade.html     política em português
<app>/privacy.html         política em inglês
<app>/icone.png
```

Toda página fora a inicial tem o botão "← Voltar" no alto: a do app volta para
a da CjLabs; as outras voltam para a do app.

| App | Pasta | Classe (cor) |
|---|---|---|
| 4eroes | `4eroes/` | `app-4eroes` (dourado) |
| Gude Rush | `gude-rush/` | `app-gude` (laranja) |
| Universal Mundi Guesser (Quiz de Geografia) | `quiz-geografia/` | `app-quiz` (azul) |

**App novo:** copiar a pasta de um app, trocar textos e ícone, criar a classe de
cor em `estilo.css` (se quiser outra cor) e pôr o cartão no `index.html`.

## Endereços para as lojas

- https://cirojosepadua-maker.github.io/cjlabs/4eroes/privacidade.html
- https://cirojosepadua-maker.github.io/cjlabs/gude-rush/privacidade.html
- https://cirojosepadua-maker.github.io/cjlabs/quiz-geografia/privacidade.html
