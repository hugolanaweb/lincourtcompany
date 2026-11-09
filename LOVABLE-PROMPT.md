# Lincourt no Lovable

Há dois caminhos. O caminho A dá um resultado idêntico ao protótipo. O caminho B funciona só com o prompt, mas o resultado vai sair parecido, não igual.

---

## Caminho A (recomendado): levar os arquivos pelo GitHub

O Lovable gera projetos em React + Vite + Tailwind + TypeScript e tem sincronização com o GitHub nos dois sentidos: o que você envia para o repositório aparece no Lovable. Não dá para importar arquivos soltos direto, mas dá para colocá-los no repositório que o Lovable cria.

1. No Lovable, crie um projeto em branco. Use um prompt curto, como "Projeto em branco, vou enviar os arquivos pelo GitHub".
2. Conecte o projeto ao GitHub: **GitHub → Connect**. O Lovable cria o repositório.
3. Clone o repositório no computador.
4. Copie para dentro dele:
   - `site/assets/` → `public/assets/` (imagens, fontes e favicon);
   - `site/index.html`, `site/assets/css/style.css` e `site/assets/js/main.js` → `reference/` (servem só de referência para a IA).
5. Faça commit e push. Em alguns segundos, os arquivos aparecem no Lovable.
6. No chat do Lovable, mande o **Prompt de conversão** abaixo.

### Prompt de conversão

```
Na pasta /reference há um site estático pronto (index.html, style.css, main.js) e em /public/assets estão as imagens, as fontes e o favicon que ele usa.

Converta esse site em React + TypeScript mantendo o resultado visual e o comportamento IDÊNTICOS ao original:
- Uma landing page em src/pages/Index.tsx, dividida em componentes por seção (Header, MobileMenu, Hero, Numbers, Manifesto, Services, Cases, Method, Band, Team, Partners, Cta, Footer, WhatsAppFloat).
- Copie o CSS de reference/style.css para src/styles/lincourt.css e importe-o globalmente. NÃO reescreva em Tailwind: as classes, as variáveis CSS, os keyframes e os breakpoints devem continuar exatamente iguais.
- Ajuste os caminhos: "assets/..." vira "/assets/..." (as fontes no @font-face também).
- Leve cada trecho de reference/main.js para hooks/useEffect nos componentes correspondentes. Lógica, números, tempos e easing devem continuar iguais: mosaico do hero, reveal com IntersectionObserver, contadores, palavras do manifesto acendendo no scroll, tilt do vidro, botões magnéticos, carrossel de cases (índice próprio, setas desativadas nas pontas, arrastar com o mouse, setas do teclado, começa no 1º card alinhado à esquerda), sempre abrir a página no topo (history.scrollRestoration = 'manual'), linha do método com --p, parallax da faixa, marquee de parceiros com o mapa LOGO_FX, header com a classe "scrolled", nav ativa, menu mobile, ano no rodapé.
- Mantenha o sprite SVG inline (#logo-sym e #i-wa) num componente SvgSprite renderizado uma vez.
- Mantenha os meta tags, o Open Graph e o JSON-LD de reference/index.html no index.html do projeto.
- Respeite prefers-reduced-motion como no original.
- Não adicione bibliotecas de animação, não troque fontes nem cores e não mude nenhum texto.
Ao terminar, compare seção por seção com reference/index.html e corrija qualquer diferença.
```

Se o Lovable cortar a resposta no meio, peça "continue a conversão a partir da seção X".

---

## Caminho B: só o prompt (sem GitHub)

Anexe na mesma mensagem do prompt os 22 arquivos soltos de `site/assets/img/` e os 24 logos de `site/assets/img/parceiros/`. O próprio prompt já manda o Lovable salvá-los em `public/assets/img/` e `public/assets/img/parceiros/` com os mesmos nomes. Se o Lovable limitar o número de anexos, mande os logos numa segunda mensagem: "Salve estes logos em public/assets/img/parceiros/ com os mesmos nomes e use no marquee de parceiros". O prompt é longo; se o Lovable recusar pelo tamanho, mande primeiro a parte 1 (base + hero + números + manifesto) e depois a parte 2 (do Serviços em diante).

```
Crie a landing page da Lincourt Company, uma agência de comunicação e marketing guiada por dados (BH e SP). Tudo em português do Brasil. Página única, sem tela de loading, rápida, com animações suaves no estilo de agência premium.

IMAGENS ANEXADAS (faça isto primeiro)
Salve todas as imagens que anexei nesta mensagem em public/assets/img/, mantendo EXATAMENTE os mesmos nomes de arquivo, sem renomear, sem converter e sem trocar a extensão. No código, use sempre o caminho /assets/img/NOME. Os arquivos são:
icon.svg, logo-vidro-3d.webp, logo-vidro.webp, m-arrow.webp, m-badge.webp, m-banner-arrow.webp, m-banner.webp, m-billboard.webp, m-buttons.webp, m-figure.webp, m-glass-cover.webp, m-glass.webp, m-notebook.webp, m-post1.webp, m-post2.webp, m-smoke-face.webp, texture-1.webp, texture-2.webp, texture-3.webp, texture-4.webp, texture-5.webp, texture-6.webp.
Os logos dos parceiros vão em public/assets/img/parceiros/ (caminho /assets/img/parceiros/NOME), também com os mesmos nomes: porcao.png, colegio-batista.png, light.png, harley-davidson.png, minas-tche.jpg, faemg-clube.png, super-globo.jpg, cruzeiro.png, taca-favelas.png, vino.jpeg, parque-guanabara.avif, pimenta.png, 4infra.png, lider.png, galo-buritis.png, sinpef.webp, conexoes.webp, new-era.png, indiabrazil.jpg, orbi-conecta.png, mybox.png, tecnosys.jpeg, expo-favela-innovation.png, universo-agv.png.
Se faltar algum, avise e use um placeholder roxo (#1b002d) no lugar até eu enviar. Não gere imagens novas nem use bancos de imagem.

STACK E REGRAS
- React + TypeScript + Tailwind, mas os detalhes visuais ficam em um CSS global (src/styles/lincourt.css) com variáveis CSS. Não use bibliotecas de animação: só CSS, IntersectionObserver e requestAnimationFrame.
- Fonte: Raleway variável (pesos 100–900), via Google Fonts ou self-hosted. Títulos misturam pesos finos (200–300) com ExtraBold/Black (800–900) em caixa alta.
- Respeitar prefers-reduced-motion (desliga as animações e mostra tudo).
- Nunca use travessão (—) em nenhum texto.

DESIGN TOKENS (:root)
--ink #0f001a (fundo base) · --p900 #1b002d · --p800 #250c38 · --p700 #34184a
--lilac #7b6b80 · --glow #a77bff · --glow-2 #6b3cff
--sand #dddad4 (texto claro e fundo das seções claras) · --paper #f4f2ee
--muted-dark #5d5363 · --muted-light rgba(221,218,212,.66)
--line-light rgba(221,218,212,.14) · --line-dark rgba(27,0,45,.14) · --wa #25d366
--container 1240px · --pad clamp(20px,4vw,48px) · --radius 22px
--ease cubic-bezier(.22,1,.36,1) · --ease-in-out cubic-bezier(.65,0,.35,1)
body: fundo --ink, texto --sand, 16px/1.6. html com scroll-behavior smooth e scroll-padding-top 90px.

COMPONENTES BASE
- Eyebrow: 12px, 700, letter-spacing .22em, caixa alta, com um traço de 22px antes. Cor --glow nas seções escuras e --p800 nas claras.
- H2 das seções: clamp(34px,5vw,64px), peso 300, line-height 1.04, letter-spacing -.025em, max-width 17ch, com a parte em <strong> no peso 800.
- Botões pílula de 50px de altura, padding 0 24px, 14px, peso 700:
  - claro: fundo --sand, texto --p900; hover branco com glow roxo;
  - WhatsApp: fundo #25d366, texto #062b14, com o ícone do WhatsApp;
  - ghost: borda --line-light, fundo vidro com blur.
  - Seta ↗ que anda (3px,-3px) no hover.
  - Botões "magnéticos": seguem levemente o mouse.
- Link com seta: 14px, peso 700, sublinhado de 1px que recolhe no hover.
- Reveal: elementos com data-reveal começam com opacity 0 e translateY(34px) e entram em 1s com --ease ao aparecer na tela (IntersectionObserver), com um pequeno escalonamento entre eles.

1. HEADER (fixo, sempre visível: não esconde ao rolar)
- Pílula centralizada, top 16px, largura min(100% - 32px, 1280px), 64px de altura, border-radius 999px.
- Depois de 30px de scroll ganha fundo rgba(15,0,26,.62), borda --line-light, backdrop-filter blur(18px) e sombra.
- À esquerda: logo "Lincourt" em SVG cor --sand, 30px de altura.
- No centro: nav em pílula com borda (Serviços, Cases, Método, Lincourt, Parceiros, Blog). Links de 12px, 700, letter-spacing .14em, caixa alta. O link da seção visível fica destacado com fundo rgba(221,218,212,.1).
- À direita: botão ghost "Solicite um diagnóstico ↗".
- Abaixo de 1100px: some a nav e o CTA e aparece um botão hambúrguer que abre um menu mobile em tela cheia (Serviços, Cases, Método, Lincourt, Parceiros, Contato).

2. HERO (100vh, fundo --ink, conteúdo alinhado embaixo)
- Fundo: mosaico 3D com 24 cards (proporção 4:5, radius 14px) em grid de 7 colunas (6 no mobile), largura 150%, transform rotateX(18deg) rotateZ(-10deg).
  - Drift lento de 60s alternando para translateY -58%.
  - Os cards entram escalonados (opacity e translateY 40px).
  - A cada 1.8s um card aleatório troca de imagem com crossfade de 1.4s.
  - Imagens: os mockups da marca (m-arrow, m-glass-cover, m-post2, m-billboard, m-notebook, m-figure, m-badge, m-post1, m-buttons, m-smoke-face, m-banner-arrow, m-glass, logo-vidro, texture-6, m-banner).
- Por cima: dois degradês escurecendo (vertical, de cima para baixo até --ink, e horizontal, mais escuro à esquerda) e um brilho radial violeta de 60vmax que segue o mouse.
- Layout: grid de 2 colunas (1.75fr | .9fr), gap 56px, alinhado embaixo.
  - Coluna esquerda: eyebrow "Inteligência em comunicação" e um H1 de 4 linhas, cada uma revelada de baixo para cima (lineUp 1.1s, atrasos .25/.35/.45/.55s):
    - "Reunimos dados" (peso 300, cor sand a 88%, com "dados" em peso 600 branco)
    - "e estratégia para" (mesmo estilo, com "estratégia" em 600 branco)
    - "MELHORAR SUA" (caixa alta, peso 800, branco, .94em, margin-top .1em)
    - "COMUNICAÇÃO." (caixa alta, peso 800, com um brilho/sheen de degradê branco → #cdb6ff → --glow passando a cada 7s)
    - Tamanho do H1: clamp(34px, min(4.3vw, 7.4vh), 64px), line-height 1.08, letter-spacing -.03em. As 4 linhas devem ter quase a mesma largura. No mobile: clamp(30px, 8.8vw, 54px).
  - Coluna direita: borda esquerda de 1px rgba(221,218,212,.2), padding-left 28px, max-width 420px. Contém:
    - o texto "Tráfego, branding, conteúdo e ações presenciais integrados numa visão só, para empresas que já têm estrutura e querem escalar." (17px, sand 82%);
    - os botões "Solicite um diagnóstico ↗" (claro) e "Fale no WhatsApp" (verde, link wa.me/5531994777425).
    - Entra com fade-up após .8s.
- Embaixo, centralizado: o texto "ROLE" (11px, peso 800, letter-spacing .42em) com uma linha vertical de 30px embaixo e um traço que desce em loop. Leva para a seção de números.

3. NÚMEROS (fundo #000, bordas de 1px em cima e embaixo)
- Frase à esquerda: "Seis anos construindo marcas que vendem, no digital e no físico." ("vendem" em negrito).
- Quatro números com divisória vertical, peso 200, clamp(36px,4.2vw,56px), contando de 0 até o valor ao aparecer:
  - "+500 projetos entregues"
  - "6 anos de mercado"
  - "+20 marcas parceiras"
  - "2 sedes · BH e SP"

4. NOSSO JEITO (manifesto)
- Fundo: texture-6 com --p900 e degradê para --ink em cima e embaixo. Grid 1.3fr | 1fr.
- Esquerda: eyebrow "Nosso jeito" e o texto grande (clamp(30px,3.8vw,54px), peso 300) "Sem fórmula pronta. Sem linha de produção. Partimos do diagnóstico real da sua comunicação para chegar ao retorno que a sua empresa precisa."
  - Cada palavra começa com opacidade .16 e acende conforme o scroll avança pela seção.
  - "fórmula pronta", "produção", "diagnóstico" e "retorno" ficam em peso 800.
  - Abaixo, 4 pílulas: Tráfego, Branding, Conteúdo, On & Off.
- Direita: um quadrado com o círculo de vidro:
  - círculo com inset 13%, fundo radial violeta e sombra roxa;
  - dentro, a imagem logo-vidro-3d.webp (símbolo "L" de vidro roxo, PNG transparente), flutuando 10px em loop de 7s;
  - o círculo faz tilt 3D seguindo o mouse.
  - Em volta, um selo SVG de texto circular girando em 26s com "INTELIGÊNCIA EM COMUNICAÇÃO • DADOS • ESTRATÉGIA • RESULTADO •" (9.5px, peso 700, cor sand).

5. SERVIÇOS (seção clara: fundo --sand, texto --p900)
- Eyebrow "O que fazemos", H2 "Tudo o que a sua marca precisa para **crescer de verdade**" e o subtítulo "Soluções completas e integradas para impulsionar sua marca no digital e no físico. Uma equipe, uma estratégia, um objetivo: resultado."
- Grid de 4 colunas (2 em tablet, 1 no mobile) com bordas de 1px --line-dark.
- Cada card tem número, ícone SVG de traço 2px na cor --p800, título 19px/800 e texto 14.5px.
- No hover, um fundo radial roxo (--p700 → --p900) sobe de baixo para cima (clip-path, .6s), o texto fica sand e o ícone fica --glow e gira -6deg.
- Os cards:
  1. Tráfego Pago: "Gestão e otimização semanal de Meta Ads, Google Ads e LinkedIn Ads, focada em atrair clientes, não curtidas."
  2. Identidade Visual: "Branding completo: logo, valores, princípios e toda a essência da sua marca traduzidos em um sistema visual."
  3. Gestão de Redes Sociais: "Presença forte em Instagram, Facebook e LinkedIn para crescimento orgânico, autoridade e engajamento."
  4. Reels & TikTok: "Vídeo curto pensado para descoberta de marca, alcance e viralização, com roteiro, captação e edição."
  5. Captação Real Time: "Cobertura audiovisual em tempo real para eventos e ações comerciais e promocionais, publicada enquanto acontece."
  6. Criação de Sites: "Sites institucionais, promocionais, e-commerce e landing pages de alta conversão, rápidos e mensuráveis."
  7. Planejamento Estratégico: "Diagnóstico, posicionamento e plano de ação personalizados para alcançar os objetivos do seu negócio."
  8. Ações Comerciais: "Ativações presenciais e estratégicas para impulsionar vendas além do digital. O "Off" que fecha o ciclo."
- Link no fim: "Quero um plano para a minha empresa ↗".

6. CASES (fundo #000)
- Eyebrow "Portfólio", H2 "Cases que transformam **marca em resultado**" e, à direita, dois botões redondos de 54px (← →).
- Carrossel horizontal com scroll-snap no centro. Os cards têm largura clamp(270px,26vw,360px), proporção 3:4. Padding esquerdo alinhado ao container (o 1º card começa alinhado com o título) e padding direito calc(50% - largura/2), para que o último card possa ficar centralizado.
- Navegação:
  - O componente guarda o índice atual.
  - As setas vão para índice ±1 e a seta fica desativada (opacidade .3) na ponta.
  - Dá para arrastar com o mouse e usar as setas do teclado.
  - Começa no 1º card, que é o ativo. Os cards que não conseguem centralizar no início mantêm o índice escolhido pela seta.
- A página sempre abre no topo: history.scrollRestoration = 'manual' e scrollTo(0,0) quando não houver hash.
- São 6 cards vazios, "Case 01" a "Case 06":
  - fundo em degradê --p800 → --p900 → --ink, com um brilho violeta no topo e uma grade sutil de 28px;
  - "CASE 0X" pequeno no canto superior;
  - a logo de vidro no centro;
  - "EM BREVE" embaixo (peso 900, caixa alta) com uma barrinha de 60px abaixo.
- Card inativo: escala .9, opacidade .45, logo em cinza e desfocada.
- Card ativo (centralizado):
  - escala 1 e sombra roxa;
  - uma borda de luz girando em volta (conic-gradient animado com @property --ang, 4s);
  - a logo com cor, flutuando, com um halo violeta pulsando;
  - um reflexo passando no texto "EM BREVE";
  - a barrinha enchendo e esvaziando em loop.
- Link no fim: "Veja mais cases no Instagram ↗" (instagram.com/lincourtcompany).

7. MÉTODO (fundo escuro com 3 blobs de degradê roxo se movendo devagar)
- Eyebrow "Como trabalhamos", H2 "Método **Lincourt**" e o subtítulo "Dados antes de opinião. Cada projeto passa por cinco etapas que conectam estratégia, criação e performance num único processo."
- 5 colunas com uma linha horizontal no topo que se preenche (scaleX) conforme o scroll. No mobile vira uma linha vertical à esquerda. Cada etapa tem bolinha, número, título e texto:
  - 01 Diagnóstico: "Leitura da realidade da sua comunicação: canais, números, concorrência e público."
  - 02 Estratégia: "Posicionamento, metas e plano de mídia definidos a partir dos dados levantados."
  - 03 Criação: "Identidade, conteúdo e audiovisual produzidos por especialistas de cada área."
  - 04 Performance: "Campanhas no ar com acompanhamento e otimização semanal de cada investimento."
  - 05 Escala: "O que funciona ganha força: mais alcance, mais canais, mais resultado, on e off."
- CTAs à direita: "Fale no WhatsApp" e "Comece pelo diagnóstico ↗".

8. FAIXA "ON & OFF"
- Imagem m-billboard em tela cheia, altura clamp(420px,72vh,720px), com parallax e degradê escuro em cima e embaixo.
- No canto inferior esquerdo: "ON & OFF." gigante (clamp(60px,10vw,160px), peso 900, caixa alta), com o "&" em peso 200 na cor --glow.
- Abaixo: "Do feed à rua, a mesma marca." (14px, letter-spacing .3em, caixa alta).

9. EQUIPE (seção clara)
- Grid de 2 colunas. A coluna esquerda fica sticky em top 120px e tem:
  - eyebrow "Quem somos";
  - H2 "Uma equipe completa para **transformar sua marca**";
  - o texto "Profissionais especializados em cada etapa do projeto. Um time multidisciplinar que domina todas as áreas do marketing digital e da comunicação visual, com atendimento próximo e personalizado.";
  - um placeholder de foto 16:10, fundo --p800, borda tracejada, radius 22px, com ícone de câmera e o texto "ANEXAR FOTO".
- Coluna direita: lista com divisórias. Cada item tem número, cargo (clamp(20px,2.4vw,30px), peso 300) e uma seta ↗ que aparece no hover.
  - No hover, um fundo --p900 sobe de baixo, o texto fica sand, anda 10px e vai para o peso 700.
  - Itens: 01 Gestores de Planejamento, 02 Gestores de Tráfego, 03 Videomakers e Fotógrafos, 04 Designers Criativos, 05 Social Media Managers, 06 Desenvolvedores Web.
  - Último item: "Quer fazer parte? **Trabalhe conosco** ↗" (link linclook.agencialincourt.com.br/vagas).

10. PARCEIROS (seção clara)
- Eyebrow "Quem confia em nós" e H2 centralizado "Marcas que **cresceram com a Lincourt**".
- Dois marquees infinitos, um para cada lado (48s e 54s), que pausam no hover e têm máscara de fade nas laterais.
- Os logos ficam em chips de 200x110 com fundo --paper, radius 18px, em cinza com multiply. No hover, sobem 4px e ficam coloridos.
- Parceiros: Porcão, Colégio Batista, Light, BH Harley-Davidson, Minas Tchê, FAEMG Clube, Super Globo, Cruzeiro, Taça das Favelas, Vino, Parque Guanabara, Pimenta, 4infra, Líder Bebedouros, Academia do Galo, SINPEF, Cuidar de Conexões, New Era, IndiaBrazil, Orbi Conecta, MyBox, Tecnosys, Expo Favela Innovation, Universo AGV. Cada logo usa o arquivo de /assets/img/parceiros/ com o mesmo nome do parceiro (ex.: Porcão = porcao.png, Academia do Galo = galo-buritis.png, Cuidar de Conexões = conexoes.webp, Líder Bebedouros = lider.png). Ajustes por logo: porcao escala 1.45, harley 1.4, minas-tche 1.55, super-globo box 0.85, cruzeiro invertido, vino box 0.85, parque 1.1, pimenta box 0.85, 4infra 1.15, lider 1.1, conexoes invertido, new-era 1.1, tecnosys box 0.85 (invertido = logo branco que vira escuro; box = logo com fundo próprio).

11. CTA FINAL (id "contato", fundo --ink com blobs roxos)
- Grid 1.3fr | 1fr.
- Título: "Seu próximo salto de crescimento pode começar com um **DIAGNÓSTICO.**" (peso 300, clamp(38px,5.6vw,80px); o destaque em 900, caixa alta, cor --glow).
- Ao lado: o texto "Conte pra gente sobre a sua empresa. Fazemos uma leitura inicial da sua comunicação, dos canais e das oportunidades, sem compromisso." e um botão claro grande "Solicite um diagnóstico ↗", que abre o WhatsApp com mensagem pronta.

12. RODAPÉ (fundo #000)
- 4 colunas:
  - logo + "Reunimos dados e estratégia para melhorar a sua comunicação. Estratégia guiada por dados para empresas que buscam crescimento real.";
  - Navegação: Serviços, Cases, Método, Lincourt, Blog, Trabalhe conosco;
  - Onde estamos:
    - rótulo "BELO HORIZONTE/MG" e, na linha de baixo, "Av. Pres. Antônio Carlos, 681, Lagoinha";
    - rótulo "SÃO PAULO/SP" e, na linha de baixo, "Av. Paulista, 1471, Bela Vista";
    - os dois com link para o Google Maps;
  - Contato: (31) 9 9477-7425 e ícones redondos de Instagram, Facebook (agencialincourt), TikTok (@agencialincourt) e WhatsApp.
- Barra inferior: "© {ano atual} Lincourt Company. Todos os direitos reservados." e o link "Privacidade".
- No fim, a palavra "LINCOURT" gigante (clamp(80px,21vw,330px), peso 900) só com contorno violeta de 1px a 22% de opacidade.

13. EXTRAS
- Botão flutuante do WhatsApp no canto inferior direito: 58px, verde, com um anel pulsando.
- SEO:
  - title "Lincourt Company | Inteligência em Comunicação | Tráfego, Branding, On e Off";
  - meta description;
  - Open Graph;
  - JSON-LD MarketingAgency com os dois endereços e as redes sociais.
- Favicon: icon.svg (quadrado roxo arredondado com o símbolo areia).
- Acessibilidade: link "Pular para o conteúdo", foco visível na cor --glow, aria-labels.
```

---

## Dicas

- Depois de gerar, compare com o protótipo local (`site/index.html`) e peça os ajustes seção por seção ("no hero, ...").
- Os logos dos parceiros estão em `site/assets/img/parceiros/` (24 arquivos, baixados do lincourt.co). No Lovable, ficam em `public/assets/img/parceiros/`.
- O Lovable muda os recursos com frequência. Se o menu do GitHub não estiver no lugar indicado, procure em **Settings → Integrations**.
