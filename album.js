// Visor das páginas "Biblioteca": toque num print para vê-lo grande; setas, teclado ou deslizar o dedo
// passam para o anterior e o próximo; Esc, o X ou um toque fora da imagem fecham.
(function () {
  const botoes = Array.from(document.querySelectorAll('.album .foto button'));
  if (!botoes.length) return;

  const visor = document.createElement('div');
  visor.className = 'visor';
  visor.hidden = true;
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Imagem ampliada');
  visor.innerHTML = `
    <button type="button" class="visor-fechar" aria-label="Fechar">×</button>
    <button type="button" class="visor-seta anterior" aria-label="Anterior">‹</button>
    <figure>
      <img alt="">
      <figcaption><span class="visor-contador"></span><strong></strong><span class="visor-frase"></span></figcaption>
    </figure>
    <button type="button" class="visor-seta proxima" aria-label="Próxima">›</button>`;
  document.body.appendChild(visor);

  const img = visor.querySelector('img');
  const titulo = visor.querySelector('figcaption strong');
  const frase = visor.querySelector('.visor-frase');
  const contador = visor.querySelector('.visor-contador');
  let atual = 0;
  let origem = null;

  function mostrar(i) {
    atual = (i + botoes.length) % botoes.length;
    const b = botoes[atual];
    img.src = b.dataset.grande;
    img.alt = b.dataset.titulo;
    titulo.textContent = b.dataset.titulo;
    frase.textContent = b.dataset.frase;
    contador.textContent = `${atual + 1} de ${botoes.length}`;
    // já carrega a próxima, para a troca ser imediata
    new Image().src = botoes[(atual + 1) % botoes.length].dataset.grande;
  }
  function abrir(i) {
    origem = document.activeElement;
    mostrar(i);
    visor.hidden = false;
    document.body.classList.add('visor-aberto');
    visor.querySelector('.visor-fechar').focus();
  }
  function fechar() {
    visor.hidden = true;
    document.body.classList.remove('visor-aberto');
    if (origem) origem.focus();
  }

  botoes.forEach((b, i) => b.addEventListener('click', () => abrir(i)));
  visor.querySelector('.visor-fechar').addEventListener('click', fechar);
  visor.querySelector('.anterior').addEventListener('click', () => mostrar(atual - 1));
  visor.querySelector('.proxima').addEventListener('click', () => mostrar(atual + 1));
  visor.addEventListener('click', (e) => { if (e.target === visor || e.target.tagName === 'FIGURE') fechar(); });
  document.addEventListener('keydown', (e) => {
    if (visor.hidden) return;
    if (e.key === 'Escape') fechar();
    else if (e.key === 'ArrowLeft') mostrar(atual - 1);
    else if (e.key === 'ArrowRight') mostrar(atual + 1);
  });

  // deslizar o dedo para os lados troca a imagem
  let inicioX = null;
  visor.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    inicioX = null;
    if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
  });
})();
