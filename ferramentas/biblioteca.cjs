// Gera a página "Biblioteca" de cada app: um álbum com os prints de tela do jogo, para quem quer
// conhecer o app antes de instalar. Cada print tem um título e uma frase; ao tocar, ele abre grande,
// com setas (e deslizar o dedo) para ver o próximo. A parte do visor fica em album.js, na raiz do site.
//
// Uso (na pasta do site):  node ferramentas/biblioteca.cjs            todos os apps
//                          node ferramentas/biblioteca.cjs gude-rush  só um
//
// Os prints vêm das pastas `loja` de cada projeto em C:\jogos (lista APPS abaixo). O site não tem
// package.json: o sharp vem de node_modules do Quiz de Geografia (ou do caminho em SHARP=...).
// A pasta <app>/biblioteca/ e o <app>/biblioteca.html são apagados e refeitos a cada vez.

const fs = require('fs');
const path = require('path');
const sharp = require(process.env.SHARP || 'C:/jogos/quiz-geografia/node_modules/sharp');

const SITE = path.join(__dirname, '..');
const JOGOS = 'C:/jogos';

// origem: pasta dos prints, relativa a C:\jogos. fotos: [arquivo, título, frase], na ordem do álbum.
const APPS = [
  {
    pasta: 'quiz-geografia', nome: 'Universal Mundi Guesser', classe: 'app-quiz',
    sub: 'Quiz de geografia · prints da versão em inglês',
    origem: 'quiz-geografia/loja/capturas/en-US',
    fotos: [
      ['1-menu.png', 'Menu', 'Escolha o modo de jogo, o tipo de rodada e acompanhe o seu nível.'],
      ['2-contorno.png', 'Contorno', 'Adivinhe o país pelo formato, com dicas de distância e direção a cada palpite.'],
      ['3-bandeira.png', 'Bandeira', 'Reconheça as bandeiras do mundo inteiro, digitando ou na múltipla escolha.'],
      ['4-pistas.png', 'Pistas', 'Continente, população, área, fronteiras e mais, uma pista de cada vez.'],
      ['5-desafio.png', 'Desafio do dia', 'Um país por dia, o mesmo para todo mundo, com 7 perguntas e estrelas.'],
      ['6-passaporte.png', 'Passaporte', 'Cada país acertado ganha um selo: bronze, prata, ouro e platina.'],
      ['7-continentes.png', 'Desempenho por continente', 'O mapa pintado pelo seu desempenho, do melhor ao pior país.'],
    ],
  },
  {
    pasta: 'gude-rush', nome: 'Gude Rush', classe: 'app-gude',
    sub: 'Corrida de bolinhas de gude',
    origem: 'gude-rush/loja/capturas',
    fotos: [
      ['01_corrida_madeira.png', 'Corrida na madeira', 'As bolinhas descem a pista e disputam a liderança, trecho a trecho.'],
      ['02_corrida_doceria.png', 'Tema Doceria', 'A mesma emoção com uma pista de doces, cata-ventos e roleta.'],
      ['03_corrida_espaco.png', 'Espaço neon', 'Bolinhas com bandeiras de países correm até a chegada.'],
      ['04_pote_bandeiras.png', 'Pote de bolinhas', 'Chacoalhe o celular para misturar as bolinhas e solte!'],
      ['05_bolinhas_temas.png', 'Escolha o visual', 'Pacotes de bolinhas: planetas, bandeiras e muito mais.'],
      ['06_montar_pista.png', 'Monte a sua pista', 'Escolha os trechos e a ordem deles para criar a sua corrida.'],
      ['07_temas.png', 'Temas da pista', 'Madeira, Doceria, Fábrica, Espaço neon, Inverno e outros.'],
    ],
  },
  {
    pasta: 'quero-dizer', nome: 'Quero Dizer', classe: 'app-querodizer',
    sub: 'Comunicação por figuras',
    origem: 'quero-dizer/loja/capturas/celular',
    fotos: [
      ['01_menu.png', 'Início', 'Os atalhos principais: Falar, Frases, Como estou, Rotina, Calma e mais.'],
      ['02_falar_principal.png', 'Falar', 'Toque nas figuras para montar a frase e ouvir em voz alta.'],
      ['03_falar_comida.png', 'Comidas', 'As figuras ficam separadas por assunto, como as comidas.'],
      ['04_como_estou.png', 'Como você está?', 'Para contar como se sente, e o quanto.'],
      ['05_rotina.png', 'Minha rotina de hoje', 'A rotina do dia, passo a passo, com o que vem agora.'],
      ['06_quantos_sao.png', 'Jogos', 'Jogos simples, como contar quantos são.'],
      ['07_calma.png', 'Calma', 'Ajuda para respirar e se acalmar quando for preciso.'],
      ['08_saude.png', 'Saúde', 'Para mostrar onde dói e o que está sentindo.'],
    ],
  },
  {
    pasta: '4eroes', nome: '4eroes', classe: 'app-4eroes',
    sub: 'Defesa cooperativa para 1 a 4 jogadores',
    origem: 'the-magic-village/docs/loja/capturas',
    fotos: [
      ['1-batalha.png', 'Batalha na vila', 'Os heróis defendem o Monumento das ondas de invasores.'],
      ['2-chefe.png', 'Chefe da onda', 'Toda onda termina com um chefe. Saia da marca vermelha antes do golpe!'],
      ['3-noite.png', 'Noite', 'A cada 5 ondas o dia vira noite, e os invasores ficam mais rápidos.'],
      ['4-chefe2.png', 'Chefes em rodízio', 'Geleca Gigante, Sapo Gigante, Tengu, Ciclope Demônio e Dragão.'],
      ['5-escolha.png', 'Escolha o herói', 'Cavaleiro, Mago, Druida ou Arqueiro, cada um com dois visuais.'],
      ['6-loja.png', 'Melhorias', 'Gaste as almas em melhorias para o seu herói e para o Monumento.'],
      ['7-menu.png', 'Menu', 'Jogue sozinho com aliados do jogo ou com amigos no mesmo Wi-Fi.'],
      ['8-bestiario.png', 'Como jogar', 'As regras, os heróis e os invasores explicados dentro do jogo.'],
    ],
  },
  {
    pasta: 'multi-dice', nome: 'Multi Dice', classe: 'app-multidice',
    sub: 'Rolador de dados',
    origem: 'multi-dice/loja/capturas',
    fotos: [
      ['01_simples.png', 'Qualquer dado', 'Escolha quantos dados e quantos lados, de 2 a 1000.'],
      ['02_rpg.png', 'Notação de RPG', 'Escreva 4d6k3, 2d20kl1 ou 1d20+5 e veja quem ficou de fora.'],
      ['03_aula.png', 'Aprenda a notação', 'Uma aula passo a passo, com exemplos que você rola na hora.'],
      ['04_ordem.png', 'Quem começa?', 'Dados com nomes: sorteie uma ordem, sem repetir ninguém.'],
      ['05_moeda.png', 'Cara ou coroa', 'Moedas e dados de texto, com uma cor para cada face.'],
      ['06_favoritos.png', 'Favoritos', 'Guarde as suas rolagens e role de novo com um toque.'],
      ['07_opcoes.png', 'Chacoalhe para rolar', 'Chacoalhe o celular para rolar, com a força que preferir.'],
    ],
  },
  {
    pasta: 'olho-do-furacao', nome: 'Olho do Furacão', classe: 'app-furacao',
    sub: 'Jogue coisas no furacão e veja girar',
    origem: 'olho-do-furacao/loja/capturas',
    fotos: [
      ['01_tempestade.png', 'Tempestade', 'Jogue as coisas no furacão: elas giram, encolhem e somem no olho.'],
      ['02_noite.png', 'Noite estrelada', 'Lua, estrelas cadentes e o pacote de Natal girando no escuro.'],
      ['03_buraco_negro.png', 'Buraco negro', 'Um disco de fogo no espaço engolindo os brinquedos.'],
      ['04_por_do_sol.png', 'Pôr do sol', 'Céu laranja e a cozinha inteira voando: panela, bule e bolo.'],
      ['05_areia.png', 'Tempestade de areia', 'Coisas grandes se desmancham perto do olho: celeiro, trator, feno.'],
      ['06_redemoinho.png', 'Redemoinho no mar', 'Faixas de espuma e respingos levando a escola embora.'],
      ['07_menu.png', 'Menu', 'O furacão gira atrás do menu, com umas coisas de enfeite.'],
      ['08_cenario_e_coisas.png', 'Cenário e coisas', 'Escolha um de 6 céus e um ou mais dos 6 pacotes de coisas.'],
    ],
  },
  {
    pasta: 'encaixe', nome: 'Encaixe', classe: 'app-encaixe',
    sub: 'Quebra-cabeça geométrico',
    origem: 'encaixe/loja/capturas',
    fotos: [
      ['01_menu.png', 'Menu', 'Jogue os 1000 níveis ou monte formas à vontade no modo livre.'],
      ['02_niveis.png', 'Níveis', '20 mundos de 50 níveis, com um desafio a cada 10.'],
      ['03_estrela.png', 'Estrela', 'Formas em grade de triângulos: gire as peças até elas caberem.'],
      ['04_coracao.png', 'Coração', 'Arraste as peças até o tabuleiro: perto do lugar, elas se encaixam sozinhas.'],
      ['05_vitoria.png', 'Solução perfeita', 'Monte com os movimentos da melhor solução e ganhe 3 estrelas.'],
      ['06_triangulo_vazado.png', 'Peças espelhadas', 'Em alguns níveis é preciso virar as peças do avesso.'],
      ['07_modo_livre.png', 'Modo livre', 'Escolha um de 22 formatos, o tamanho e quantas peças.'],
      ['08_como_jogar.png', 'Como jogar', 'As regras, os movimentos e as estrelas explicados dentro do jogo.'],
    ],
  },
];

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

async function gerarApp(app) {
  const destino = path.join(SITE, app.pasta, 'biblioteca');
  fs.rmSync(destino, { recursive: true, force: true });
  fs.mkdirSync(destino, { recursive: true });
  const origem = path.join(JOGOS, app.origem);

  const fotos = [];
  for (const [i, [arquivo, titulo, frase]] of app.fotos.entries()) {
    const de = path.join(origem, arquivo);
    const { width, height } = await sharp(de).metadata();
    const deitada = width > height;
    const nome = String(i + 1).padStart(2, '0');
    const miniatura = `biblioteca/${nome}-mini.webp`;
    const grande = `biblioteca/${nome}.webp`;
    await sharp(de).resize({ width: Math.min(deitada ? 800 : 480, width) }).webp({ quality: 78 }).toFile(path.join(SITE, app.pasta, miniatura));
    await sharp(de).resize({ width: Math.min(deitada ? 1600 : 900, width) }).webp({ quality: 82 }).toFile(path.join(SITE, app.pasta, grande));
    const m = await sharp(path.join(SITE, app.pasta, miniatura)).metadata();
    fotos.push({ miniatura, grande, titulo, frase, largura: m.width, altura: m.height, deitada });
  }
  const deitadas = fotos.filter((f) => f.deitada).length > fotos.length / 2;

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Biblioteca do ${esc(app.nome)} · CjLabs</title>
<meta name="description" content="Veja as telas do ${esc(app.nome)} antes de instalar.">
<link rel="icon" href="icone.png">
<link rel="stylesheet" href="../estilo.css">
<script src="../album.js" defer></script>
</head>
<body class="${app.classe}">
<!-- página gerada por ferramentas/biblioteca.cjs: mude lá, não aqui -->
<main class="largo">
  <a class="voltar" href="index.html">← Voltar</a>
  <div class="topo">
    <img src="icone.png" alt="">
    <div>
      <h1>${esc(app.nome)}</h1>
      <p class="sub">${esc(app.sub)}</p>
    </div>
  </div>
  <p class="album-dica">${fotos.length} telas do jogo. Toque numa imagem para ampliar.</p>

  <div class="album ${deitadas ? 'paisagem' : 'retrato'}">
${fotos.map((f, i) => `    <figure class="foto">
      <button type="button" data-grande="${f.grande}" data-titulo="${esc(f.titulo)}" data-frase="${esc(f.frase)}" aria-label="Ampliar: ${esc(f.titulo)}">
        <img src="${f.miniatura}" width="${f.largura}" height="${f.altura}" alt="${esc(f.titulo)}"${i > 3 ? ' loading="lazy"' : ''}>
      </button>
      <figcaption><strong>${esc(f.titulo)}</strong><span>${esc(f.frase)}</span></figcaption>
    </figure>`).join('\n')}
  </div>

  <footer>${esc(app.nome)} · CjLabs</footer>
</main>
</body>
</html>
`;
  fs.writeFileSync(path.join(SITE, app.pasta, 'biblioteca.html'), html);
  console.log(`${app.pasta}: ${fotos.length} prints`);
}

(async () => {
  const pedido = process.argv[2];
  const lista = pedido ? APPS.filter((a) => a.pasta === pedido) : APPS;
  if (!lista.length) throw new Error(`App desconhecido: ${pedido}`);
  for (const app of lista) await gerarApp(app);
})().catch((erro) => { console.error(erro.message); process.exit(1); });
