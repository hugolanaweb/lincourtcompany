# Lincourt Company · proposta de site

Proposta de redesign para [lincourt.co](https://lincourt.co): um site estático em HTML, CSS e JavaScript puros, sem dependências e sem tela de loading.

## Estrutura

- `site/` contém o site:
  - `index.html`: a página;
  - `assets/css/style.css`: os estilos;
  - `assets/js/main.js`: as interações e animações;
  - `assets/img/`: as imagens em WebP e o favicon;
  - `assets/fonts/`: a fonte Raleway variável em woff2.
- `PROPOSTA.md` traz o diagnóstico do site atual e as melhorias.
- `LOVABLE-PROMPT.md` explica como levar o site para o Lovable.

## Como ver

Abra `site/index.html` no navegador ou rode um servidor local:

```bash
npx http-server site -p 5520
```

## Publicar

A pasta `site/` pode ir direto para qualquer hospedagem estática, como GitHub Pages, Netlify, Vercel ou Hostinger.

## Pendências

- Cases reais no lugar dos cards "Em breve".
- Foto da equipe no lugar do espaço "Anexar foto".
- Baixar os logos dos parceiros para `site/assets/img/`. Hoje eles carregam direto de lincourt.co.
