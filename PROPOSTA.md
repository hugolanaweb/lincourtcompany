# Proposta de redesign — lincourt.co

Protótipo navegável em `site/index.html` (HTML, CSS e JS puros, sem dependências).

## 1. Diagnóstico do site atual

| Problema | Impacto |
|---|---|
| Tela de "carregando" antes de mostrar qualquer conteúdo | O visitante espera olhando para o nada. Parte dele desiste antes de ver a marca. |
| O vídeo do hero é `Mojli Website upscaled (12mb).webm`, hospedado no S3 de outra empresa (Mojli) | 12 MB só na primeira dobra. O vídeo não é da Lincourt, não tem relação com a marca e pode sair do ar a qualquer momento. Também há risco de direitos de uso. |
| Os cases são textos genéricos ("Campanha Verão 2024", "Identidade Visual Tech", "ROI de 450%") | Parecem placeholders e tiram credibilidade justamente da seção que mais vende. |
| Os contadores da seção Equipe ficam em "0+" no HTML | O Google e quem rola rápido leem "0+ projetos" e "0+ anos". |
| Logos de parceiros repetidos 3 vezes no código (72 imagens) | Peso e requisições desnecessários. |
| A identidade do manual quase não aparece: o areia `#dddad4`, o símbolo em vidro 3D e as texturas não são usados | O site não conversa com o Instagram nem com o brandbook. |

## 2. O que muda no novo site

**Performance**
- Sem tela de loading: o conteúdo aparece já no primeiro carregamento.
- Cerca de 1,2 MB no total, contra cerca de 13,5 MB hoje (1,5 MB de página + vídeo de 12 MB).
- Imagens em WebP e fonte Raleway em woff2 hospedada no próprio site (80 KB).
- Zero bibliotecas externas.

**Identidade**
- Aplica o manual: Raleway, roxo `#250c38` e `#1b002d`, areia `#dddad4`, lilás do símbolo, texturas e o "L" em vidro 3D.
- Alterna seções escuras e claras (areia), no ritmo da Planneimob.

**Animações (referência: Planneimob)**
- Hero em mosaico 3D com peças da própria marca trocando em crossfade.
- Título revelado linha a linha, com brilho no destaque.
- Brilho violeta que segue o mouse.
- Contadores animados.
- Manifesto em que as palavras "acendem" conforme o scroll.
- Símbolo em vidro com tilt 3D no mouse e selo girando ("Inteligência em comunicação • Dados • Estratégia").
- Serviços com preenchimento roxo no hover.
- Carrossel de cases com foco no card central, arraste com o mouse e setas.
- "Método Lincourt": a linha se preenche com o scroll.
- Faixa "On & Off" com parallax.
- Lista da equipe com hover.
- Marquee de logos que pausa no hover.
- CTA com blobs de gradiente.
- Botões magnéticos.

**Conversão**
- CTA "Solicite um diagnóstico" fixo no header, no hero, no método e no fechamento.
- Botão flutuante de WhatsApp.

**SEO e acessibilidade**
- Title e description revisados.
- Open Graph e schema.org `MarketingAgency` com os dois endereços.
- Hierarquia de títulos e textos alternativos nas imagens.
- Link "pular para o conteúdo" e navegação por teclado no carrossel.
- Respeita `prefers-reduced-motion`.
- Layout responsivo com menu mobile.

## 3. Estrutura da página

1. Hero: "Reunimos dados e estratégia para melhorar sua comunicação"
2. Números: +500 projetos, 6 anos, +20 marcas, 2 sedes
3. Nosso jeito: "Sem fórmula pronta. Sem linha de produção."
4. Serviços: os 8 serviços do site atual
5. Cases (carrossel)
6. Método Lincourt: Diagnóstico, Estratégia, Criação, Performance, Escala
7. Faixa On & Off
8. Equipe e Trabalhe conosco
9. Parceiros (2 marquees)
10. CTA de diagnóstico
11. Rodapé com BH, SP, telefone e redes

## 4. Validar com o cliente antes da versão final

- **Cases:** os 6 cards estão como "Em breve". Precisamos dos cases reais, com números e imagens. Referência: o Instagram cita "+43% em 6 meses".
- **Foto da equipe:** a seção "Quem somos" tem um espaço reservado ("Anexar foto") para uma foto real do time.
- **Método Lincourt:** as 5 etapas são uma proposta de narrativa a partir do "partimos do diagnóstico". Confirmar com a equipe.
- **Números:** +500 projetos e 6 anos vêm do site atual. +20 marcas foi contado a partir dos logos. Se houver o número de profissionais, ele entra aqui.
- **Logos de parceiros:** hoje carregam direto de lincourt.co. Na versão final, baixar para `site/assets/img` (de preferência em versão monocromática).
- **Fotos reais:** fotos da equipe e da sede, além de vídeos de captação real time, elevam muito o resultado. Um vídeo curto da própria Lincourt pode voltar ao hero no lugar do mosaico.
- **Formulário:** hoje o diagnóstico vai para o WhatsApp. Opcionalmente, criar um formulário com qualificação (segmento, faturamento, investimento em mídia).

## 5. Como visualizar

Abra `site/index.html` no navegador. Se preferir rodar um servidor local:

```bash
npx http-server site -p 5520
```
