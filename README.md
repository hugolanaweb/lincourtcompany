# Lincourt Company · proposta de site

Proposta de redesign para [lincourt.co](https://lincourt.co): um site estático em HTML, CSS e JavaScript puros, sem dependências e sem tela de loading.

## Estrutura

- `site/` contém o site:
  - `index.html`: a página;
  - `assets/css/style.css`: os estilos;
  - `assets/js/main.js`: as interações e animações;
  - `assets/img/`: as imagens em WebP e o favicon;
  - `assets/img/parceiros/`: os 24 logos dos parceiros;
  - `assets/fonts/`: a fonte Raleway variável em woff2.
- `PROPOSTA.md` traz o diagnóstico do site atual e as melhorias.
- `LOVABLE-PROMPT.md` explica como levar o site para o Lovable.

## Como ver

Abra `site/index.html` no navegador ou rode um servidor local:

```bash
npx http-server site -p 5520
```

## Publicar

**Vercel:** importe este repositório em vercel.com/new. O `vercel.json` já serve a pasta `site/`: não há build e não é preciso mudar nenhuma configuração. Cada push no `main` publica de novo.

A pasta `site/` também pode ir para qualquer outra hospedagem estática, como Netlify ou Hostinger.

## Pendências

- Cases reais no lugar dos cards "Em breve".
- Foto da equipe no lugar do espaço "Anexar foto".
