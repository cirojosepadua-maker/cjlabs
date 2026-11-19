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
<app>/index.html    página do app: Como funciona, Biblioteca, Política de privacidade, Privacy policy
<app>/como-funciona.html   o que é o app e como se joga (português)
<app>/privacidade.html     política em português
<app>/privacy.html         política em inglês
<app>/icone.png
<app>/biblioteca.html      álbum com os prints do jogo (gerada, veja abaixo)
<app>/biblioteca/         os prints em WebP: miniatura (NN-mini.webp) e grande (NN.webp), gerados
album.js            visor das páginas Biblioteca (ampliar, setas, deslizar o dedo)
ferramentas/biblioteca.cjs  gera as páginas Biblioteca
```

Toda página fora a inicial tem o botão "← Voltar" no alto: a do app volta para
a da CjLabs; as outras voltam para a do app.

| App | Pasta | Classe (cor) |
|---|---|---|
| 4eroes | `4eroes/` | `app-4eroes` (dourado) |
| Gude Rush | `gude-rush/` | `app-gude` (laranja) |
| Universal Mundi Guesser (Quiz de Geografia) | `quiz-geografia/` | `app-quiz` (azul) |
| Quero Dizer | `quero-dizer/` | `app-querodizer` (azul) |
| Multi Dice | `multi-dice/` | `app-multidice` (verde-água) |
| Olho do Furacão | `olho-do-furacao/` | `app-furacao` (violeta) |
| Encaixe | `encaixe/` | `app-encaixe` (rosa) |

**App novo:** copiar a pasta de um app, trocar textos e ícone, criar a classe de
cor em `estilo.css` (se quiser outra cor) e pôr o cartão no `index.html`.

## Biblioteca (álbum de prints)

A página Biblioteca de cada app é um álbum com os prints de tela do jogo, cada um com um
título e uma frase. Tocar num print abre ele grande, com setas (e deslizar o dedo) para os
outros. Do Universal Mundi Guesser vão só os prints em inglês. A página é gerada a partir das
pastas `loja` de cada projeto em `C:jogos` (o 4eroes fica em `the-magic-village`):

```bash
node ferramentas/biblioteca.cjs            # todos os apps
node ferramentas/biblioteca.cjs gude-rush  # só um
```

Os prints, a ordem, os títulos e as frases ficam na lista `APPS`, no começo do script: para
mudar algo ou pôr um app novo, mude lá e rode de novo. A pasta `<app>/biblioteca/` e o
`biblioteca.html` são apagados e refeitos: não mude nada neles à mão. O sharp vem de
`C:jogosquiz-geografia
ode_modules` (outro caminho: `SHARP=...`).

## Endereços para as lojas

- https://cirojosepadua-maker.github.io/cjlabs/4eroes/privacidade.html
- https://cirojosepadua-maker.github.io/cjlabs/gude-rush/privacidade.html
- https://cirojosepadua-maker.github.io/cjlabs/quiz-geografia/privacidade.html
- https://cirojosepadua-maker.github.io/cjlabs/multi-dice/privacidade.html (inglês: `multi-dice/privacy.html`)
- https://cirojosepadua-maker.github.io/cjlabs/olho-do-furacao/privacidade.html (inglês: `olho-do-furacao/privacy.html`)
- https://cirojosepadua-maker.github.io/cjlabs/encaixe/privacidade.html (inglês: `encaixe/privacy.html`; o Encaixe também tem a página do app em inglês, `encaixe/en.html` e `encaixe/how-it-works.html`)
