// Gera a página "Biblioteca" de cada app: as imagens da loja (ícone, gráfico de destaque e capturas)
// com uma miniatura leve (WebP) para ver e o PNG original para baixar.
//
// Uso (na pasta do site):  node ferramentas/biblioteca.cjs            todos os apps
//                          node ferramentas/biblioteca.cjs gude-rush  só um
//
// As imagens vêm das pastas `loja` de cada projeto em C:\jogos (lista APPS abaixo). O site não tem
// package.json: o sharp vem de node_modules do Quiz de Geografia (ou do caminho em SHARP=...).
// A pasta <app>/biblioteca/ é apagada e refeita a cada vez: não mude nada nela à mão.

const fs = require('fs');
const path = require('path');
const sharp = require(process.env.SHARP || 'C:/jogos/quiz-geografia/node_modules/sharp');

const SITE = path.join(__dirname, '..');
const JOGOS = 'C:/jogos';

// Cada grupo: título, pasta de origem (relativa a C:\jogos) e os arquivos (ou null = todos os .png da pasta).
const APPS = [
  {
    pasta: 'quiz-geografia', nome: 'Universal Mundi Guesser', classe: 'app-quiz',
    grupos: [
      { id: 'icone', titulo: 'Ícone', origem: 'quiz-geografia/assets', arquivos: ['icone-play-512.png'] },
      { id: 'destaque', titulo: 'Gráfico de destaque', origem: 'quiz-geografia/loja', arquivos: ['grafico-destaque.png', 'grafico-destaque-en-US.png'] },
      { id: 'celular', titulo: 'Celular', origem: 'quiz-geografia/loja/capturas' },
      { id: 'tablet-7', titulo: 'Tablet de 7"', origem: 'quiz-geografia/loja/capturas/tablet-7' },
      { id: 'tablet-10', titulo: 'Tablet de 10"', origem: 'quiz-geografia/loja/capturas/tablet-10' },
      { id: 'en-celular', titulo: 'Celular · em inglês', origem: 'quiz-geografia/loja/capturas/en-US' },
      { id: 'en-tablet-7', titulo: 'Tablet de 7" · em inglês', origem: 'quiz-geografia/loja/capturas/en-US/tablet-7' },
      { id: 'en-tablet-10', titulo: 'Tablet de 10" · em inglês', origem: 'quiz-geografia/loja/capturas/en-US/tablet-10' },
    ],
  },
  {
    pasta: 'gude-rush', nome: 'Gude Rush', classe: 'app-gude',
    grupos: [
      { id: 'icone', titulo: 'Ícone', origem: 'gude-rush/loja', arquivos: ['icone-512.png'] },
      { id: 'destaque', titulo: 'Gráfico de destaque', origem: 'gude-rush/loja', arquivos: ['grafico-destaque.png'] },
      { id: 'celular', titulo: 'Celular', origem: 'gude-rush/loja/capturas' },
      { id: 'tablet-7', titulo: 'Tablet de 7"', origem: 'gude-rush/loja/capturas-tablet-7' },
      { id: 'tablet-10', titulo: 'Tablet de 10"', origem: 'gude-rush/loja/capturas-tablet-10' },
    ],
  },
  {
    pasta: 'quero-dizer', nome: 'Quero Dizer', classe: 'app-querodizer',
    grupos: [
      { id: 'icone', titulo: 'Ícone', origem: 'quero-dizer/loja', arquivos: ['icone-512.png'] },
      { id: 'destaque', titulo: 'Gráfico de destaque', origem: 'quero-dizer/loja', arquivos: ['grafico-destaque.png'] },
      { id: 'celular', titulo: 'Celular', origem: 'quero-dizer/loja/capturas/celular' },
      { id: 'tablet-7', titulo: 'Tablet de 7"', origem: 'quero-dizer/loja/capturas/tablet-7' },
      { id: 'tablet-10', titulo: 'Tablet de 10"', origem: 'quero-dizer/loja/capturas/tablet-10' },
    ],
  },
  {
    pasta: '4eroes', nome: '4eroes', classe: 'app-4eroes',
    grupos: [
      { id: 'icone', titulo: 'Ícone', origem: 'the-magic-village/docs/loja', arquivos: ['icone_512.png'] },
      { id: 'destaque', titulo: 'Gráfico de destaque', origem: 'the-magic-village/docs/loja', arquivos: ['destaque_1024x500.png'] },
      { id: 'celular', titulo: 'Celular', origem: 'the-magic-village/docs/loja/capturas' },
    ],
  },
];

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const mb = (bytes) => (bytes / 1024 / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + ' MB';
const kb = (bytes) => (bytes < 1024 * 1024 ? Math.round(bytes / 1024) + ' KB' : mb(bytes));

/** "02_corrida_doceria.png" → "Corrida doceria"; "grafico-destaque-en-US.png" → "Grafico destaque en US". */
function legenda(arquivo) {
  const base = arquivo.replace(/\.png$/i, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}
const LEGENDAS_FIXAS = {
  'grafico-destaque.png': 'Português', 'grafico-destaque-en-US.png': 'Inglês',
  'icone-play-512.png': 'Ícone 512 × 512', 'icone-512.png': 'Ícone 512 × 512', 'icone_512.png': 'Ícone 512 × 512',
  'destaque_1024x500.png': 'Gráfico de destaque',
};

async function gerarApp(app) {
  const destino = path.join(SITE, app.pasta, 'biblioteca');
  fs.rmSync(destino, { recursive: true, force: true });
  const secoes = [];
  let total = 0, quantas = 0;

  for (const grupo of app.grupos) {
    const origem = path.join(JOGOS, grupo.origem);
    const arquivos = grupo.arquivos ?? fs.readdirSync(origem).filter((a) => /\.png$/i.test(a)).sort();
    if (!arquivos.length) throw new Error(`Nenhuma imagem em ${origem}`);
    const pecas = [];
    for (const arquivo of arquivos) {
      const de = path.join(origem, arquivo);
      const nomePng = arquivo.toLowerCase().replace(/\s+/g, '-');
      const nomeWebp = nomePng.replace(/\.png$/, '.webp');
      const pastaOriginal = path.join(destino, 'original', grupo.id);
      const pastaPrevia = path.join(destino, 'previa', grupo.id);
      fs.mkdirSync(pastaOriginal, { recursive: true });
      fs.mkdirSync(pastaPrevia, { recursive: true });
      fs.copyFileSync(de, path.join(pastaOriginal, nomePng));

      const { width, height } = await sharp(de).metadata();
      const deitada = width > height;
      const larguraPrevia = grupo.id === 'icone' ? 256 : deitada ? 720 : 360;
      await sharp(de).resize({ width: Math.min(larguraPrevia, width) }).webp({ quality: 80 }).toFile(path.join(pastaPrevia, nomeWebp));
      const previa = await sharp(path.join(pastaPrevia, nomeWebp)).metadata();
      const tamanho = fs.statSync(de).size;
      total += tamanho; quantas++;
      pecas.push({
        original: `biblioteca/original/${grupo.id}/${nomePng}`,
        previa: `biblioteca/previa/${grupo.id}/${nomeWebp}`,
        largura: previa.width, altura: previa.height,
        legenda: LEGENDAS_FIXAS[arquivo] ?? legenda(arquivo),
        detalhe: `${width} × ${height} · ${kb(tamanho)}`,
      });
    }
    const largas = pecas.every((p) => p.largura > p.altura);
    secoes.push(`
  <section>
    <h2>${esc(grupo.titulo)}</h2>
    <div class="galeria${grupo.id === 'icone' ? ' icones' : largas ? ' largas' : ''}">
${pecas.map((p) => `      <figure class="peca">
        <a href="${p.original}" target="_blank" rel="noopener"><img src="${p.previa}" width="${p.largura}" height="${p.altura}" loading="lazy" alt="${esc(app.nome)}: ${esc(p.legenda)}"></a>
        <figcaption>
          <span class="nome">${esc(p.legenda)}</span>
          <span class="detalhe">${p.detalhe}</span>
          <a class="baixar" href="${p.original}" download>Baixar PNG</a>
        </figcaption>
      </figure>`).join('\n')}
    </div>
  </section>`);
  }

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Biblioteca do ${esc(app.nome)} · CjLabs</title>
<meta name="description" content="Imagens do ${esc(app.nome)}: ícone, gráfico de destaque e capturas de tela, para ver e baixar.">
<link rel="icon" href="icone.png">
<link rel="stylesheet" href="../estilo.css">
</head>
<body class="${app.classe}">
<main class="largo">
  <a class="voltar" href="index.html">← Voltar</a>
  <div class="topo">
    <img src="icone.png" alt="">
    <div>
      <h1>Biblioteca do ${esc(app.nome)}</h1>
      <p class="sub">${quantas} imagens · toque numa imagem para ver em tamanho real</p>
    </div>
  </div>
  <!-- página gerada por ferramentas/biblioteca.cjs: mude lá, não aqui -->
${secoes.join('\n')}
  <footer>${esc(app.nome)} · CjLabs</footer>
</main>
</body>
</html>
`;
  fs.writeFileSync(path.join(SITE, app.pasta, 'biblioteca.html'), html);
  console.log(`${app.pasta}: ${quantas} imagens, ${mb(total)} de originais`);
}

(async () => {
  const pedido = process.argv[2];
  const lista = pedido ? APPS.filter((a) => a.pasta === pedido) : APPS;
  if (!lista.length) throw new Error(`App desconhecido: ${pedido}`);
  for (const app of lista) await gerarApp(app);
})().catch((erro) => { console.error(erro.message); process.exit(1); });
