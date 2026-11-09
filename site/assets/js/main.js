/* Lincourt — interações e animações (vanilla, sem dependências) */
(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Sempre abrir no topo (sem restaurar a rolagem anterior) ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const toTop = () => { if (!location.hash) scrollTo(0, 0); };
  toTop();
  addEventListener('load', toTop);
  addEventListener('pageshow', e => { if (e.persisted) toTop(); });

  /* ---------- Ano no rodapé ---------- */
  const ano = $('#ano'); if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Mosaico do hero ---------- */
  const IMG = 'assets/img/';
  const pool = [
    'm-arrow', 'm-glass-cover', 'm-post2', 'm-billboard', 'm-notebook', 'm-figure',
    'm-badge', 'm-post1', 'm-buttons', 'm-smoke-face', 'm-banner-arrow', 'm-glass',
    'logo-vidro', 'texture-6', 'm-banner'
  ].map(n => IMG + n + '.webp');
  const mosaic = $('#mosaic');
  if (mosaic) {
    const total = 24;
    const frag = document.createDocumentFragment();
    const tiles = [];
    for (let i = 0; i < total; i++) {
      const t = document.createElement('div');
      t.className = 'tile';
      t.style.setProperty('--d', (0.05 + (i % 6) * 0.07 + Math.floor(i / 6) * 0.09).toFixed(2) + 's');
      const img = new Image();
      img.alt = '';
      img.decoding = 'async';
      if (i > 12) img.loading = 'lazy';
      img.src = pool[(i * 7) % pool.length];
      img.className = 'show';
      t.appendChild(img);
      frag.appendChild(t);
      tiles.push(t);
    }
    mosaic.appendChild(frag);

    // troca de imagens com crossfade em tiles aleatórios
    if (!reduce) {
      let last = -1;
      setInterval(() => {
        if (document.hidden) return;
        let k; do { k = Math.floor(Math.random() * tiles.length); } while (k === last);
        last = k;
        const tile = tiles[k];
        const cur = tile.querySelector('img.show');
        const used = new Set(tiles.map(t => t.querySelector('img.show')?.getAttribute('src')));
        const options = pool.filter(p => !used.has(p));
        const src = options[Math.floor(Math.random() * options.length)] || pool[0];
        const next = new Image();
        next.alt = ''; next.className = 'next'; next.src = src;
        next.decode?.().catch(() => {}).finally(() => {
          tile.appendChild(next);
          requestAnimationFrame(() => {
            next.classList.replace('next', 'show');
            cur && cur.classList.remove('show');
            setTimeout(() => cur && cur.remove(), 1500);
          });
        });
      }, 1800);
    }
  }

  /* ---------- Brilho que segue o mouse no hero ---------- */
  const hero = $('.hero');
  const glow = $('.hero-glow');
  if (hero && glow && fine && !reduce) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      glow.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      glow.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }, { passive: true });
  }

  /* ---------- Header: estado ao rolar (fica sempre fixo) ---------- */
  const header = $('.site-header');
  const onScrollHeader = () => {
    header.classList.toggle('scrolled', scrollY > 30);
  };

  /* ---------- Menu mobile ---------- */
  const burger = $('.burger');
  const mm = $('#mobile-menu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mm.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  mm?.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !mm.hidden) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('[data-reveal]').forEach(el => io.observe(el));

  /* ---------- Contadores ---------- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; countIO.unobserve(el);
      const end = +el.dataset.count;
      if (reduce) { el.textContent = end; return; }
      const dur = 1600 + Math.min(end, 500) * 1.2;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------- Manifesto: palavras acendem com o scroll ---------- */
  const words = $('[data-words]');
  let wordEls = [];
  if (words) {
    const highlight = new Set(['fórmula', 'pronta.', 'produção.', 'diagnóstico', 'retorno']);
    words.innerHTML = words.textContent.trim().split(/\s+/)
      .map(w => `<span class="w${highlight.has(w.toLowerCase()) ? ' hl' : ''}">${w}</span>`).join(' ');
    wordEls = $$('.w', words);
  }
  const updateWords = () => {
    if (!wordEls.length) return;
    const r = words.getBoundingClientRect();
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const n = Math.round(p * wordEls.length);
    wordEls.forEach((w, i) => w.classList.toggle('on', i < n));
  };

  /* ---------- Tilt do símbolo em vidro ---------- */
  const tilt = $('[data-tilt]');
  if (tilt && fine && !reduce) {
    const wrap = $('.glass-wrap', tilt);
    tilt.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      wrap.style.setProperty('--ry', (x * 18) + 'deg');
      wrap.style.setProperty('--rx', (-y * 18) + 'deg');
      wrap.style.setProperty('--tx', (x * -4) + '%');
      wrap.style.setProperty('--ty', (y * -4) + '%');
    });
    tilt.addEventListener('pointerleave', () => {
      ['--rx', '--ry', '--tx', '--ty'].forEach(p => wrap.style.removeProperty(p));
    });
  }

  /* ---------- Botões magnéticos ---------- */
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        b.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- Carrossel de cases ---------- */
  const car = $('#carousel');
  if (car) {
    const cards = $$('.case', car);
    const btns = $$('.cbtn');
    let idx = 0;
    // posição de scroll que centraliza o card i
    const centerOf = c => {
      const r = c.getBoundingClientRect(), cr = car.getBoundingClientRect();
      return r.left + r.width / 2 - cr.left - car.clientWidth / 2 + car.scrollLeft;
    };
    const mark = i => {
      idx = i;
      cards.forEach((c, k) => c.classList.toggle('active', k === i));
      btns.forEach(b => { b.disabled = (+b.dataset.dir < 0 && i === 0) || (+b.dataset.dir > 0 && i === cards.length - 1); });
    };
    const setActive = () => {
      const mid = car.getBoundingClientRect().left + car.clientWidth / 2;
      let best = 0, bestD = Infinity;
      cards.forEach((c, k) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) { bestD = d; best = k; }
      });
      // no início da rolagem o 1º card (alinhado à esquerda) é o ativo
      // (cards que não conseguem centralizar dividem a posição 0: mantém o escolhido pela seta)
      if (car.scrollLeft < 8) {
        const atStart = cards.filter(c => centerOf(c) < 8).length;
        best = idx < atStart ? idx : 0;
      }
      mark(best);
    };
    const go = (i, smooth = true) => {
      i = Math.max(0, Math.min(cards.length - 1, i));
      car.scrollTo({ left: centerOf(cards[i]), behavior: smooth && !reduce ? 'smooth' : 'auto' });
      mark(i);
    };
    const step = dir => go(idx + dir);
    $$('.cbtn').forEach(b => b.addEventListener('click', () => step(+b.dataset.dir)));
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
    let raf = 0;
    car.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(setActive); }, { passive: true });
    addEventListener('resize', setActive);

    // arrastar com mouse
    let down = false, sx = 0, sl = 0, moved = 0;
    car.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; sx = e.clientX; sl = car.scrollLeft;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx; moved = Math.abs(dx);
      if (moved > 4) car.classList.add('dragging');
      car.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return; down = false;
      if (car.classList.contains('dragging')) {
        car.classList.remove('dragging');
        setActive(); go(idx);
      }
    });

    // começa no 1º card
    requestAnimationFrame(() => {
      go(0, false);
    });
  }

  /* ---------- Linha do método ---------- */
  const steps = $('#steps');
  const stepEls = steps ? $$('.step', steps) : [];
  const updateSteps = () => {
    if (!steps) return;
    const r = steps.getBoundingClientRect();
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.2)));
    steps.querySelector('.steps-line span').style.setProperty('--p', p.toFixed(3));
    stepEls.forEach((s, i) => s.classList.toggle('lit', p >= (i + 0.2) / stepEls.length));
  };

  /* ---------- Parallax da faixa ---------- */
  const par = $('[data-parallax]');
  const updateParallax = () => {
    if (!par || reduce) return;
    const r = par.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    par.style.transform = `translate3d(0, ${p * -12}%, 0)`;
  };

  /* ---------- Marquee de parceiros ---------- */
  const L = 'assets/img/parceiros/';
  const partners = [
    ['Porcão', 'porcao.png'], ['Colégio Batista', 'colegio-batista.png'], ['Light', 'light.png'],
    ['BH Harley-Davidson', 'harley-davidson.png'], ['Minas Tchê', 'minas-tche.jpg'], ['FAEMG Clube', 'faemg-clube.png'],
    ['Super Globo', 'super-globo.jpg'], ['Cruzeiro', 'cruzeiro.png'], ['Taça das Favelas', 'taca-favelas.png'],
    ['Vino', 'vino.jpeg'], ['Parque Guanabara', 'parque-guanabara.avif'],
    ['Pimenta', 'pimenta.png'], ['4infra', '4infra.png'], ['Líder Bebedouros', 'lider.png'],
    ['Academia do Galo', 'galo-buritis.png'], ['SINPEF', 'sinpef.webp'], ['Cuidar de Conexões', 'conexoes.webp'],
    ['New Era', 'new-era.png'], ['IndiaBrazil', 'indiabrazil.jpg'], ['Orbi Conecta', 'orbi-conecta.png'],
    ['MyBox', 'mybox.png'], ['Tecnosys', 'tecnosys.jpeg'], ['Expo Favela Innovation', 'expo-favela-innovation.png'],
    ['Universo AGV', 'universo-agv.png']
  ];
  // ajustes finos por logo: inv = logo branco (vira escuro), box = logo com fundo próprio, s = escala
  const LOGO_FX = {"porcao": "s:1.45", "harley": "s:1.4", "minas-tche": "s:1.55", "super-globo": "box s:.85", "cruzeiro": "inv", "vino": "box s:.85", "parque": "s:1.1", "pimenta": "box s:.85", "4infra": "s:1.15", "lider": "s:1.1", "conexoes": "inv", "new-era": "s:1.1", "tecnosys": "box s:.85"};
  const buildMarquee = (el, list) => {
    if (!el) return;
    const row = () => {
      const r = document.createElement('div');
      r.className = 'marquee-row';
      r.innerHTML = list.map(([n, f]) => {
        const k = Object.keys(LOGO_FX).find(p => f.startsWith(p));
        const fx = k ? LOGO_FX[k].split(' ') : [];
        const cls = fx.filter(x => !x.startsWith('s:')).join(' ');
        const s = (fx.find(x => x.startsWith('s:')) || '').slice(2);
        return `<div class="logo-chip"><img src="${L + f}" alt="${n}" decoding="async"${cls ? ` class="${cls}"` : ''}${s ? ` style="--s:${s}"` : ''}></div>`;
      }).join('');
      return r;
    };
    const a = row(); const b = row(); b.setAttribute('aria-hidden', 'true');
    b.querySelectorAll('img').forEach(i => (i.alt = ''));
    el.append(a, b);
  };
  const half = Math.ceil(partners.length / 2);
  buildMarquee($('#marquee-a'), partners.slice(0, half));
  buildMarquee($('#marquee-b'), partners.slice(half));

  /* ---------- Nav ativa ---------- */
  const navLinks = $$('.nav a[href^="#"]');
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); s && secIO.observe(s); });

  /* ---------- Loop de scroll ---------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      onScrollHeader(); updateWords(); updateSteps(); updateParallax();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
