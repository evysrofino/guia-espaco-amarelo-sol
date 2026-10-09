# Guia do Hóspede — Espaço Amarelo Sol Ubatuba

Guia público para hóspedes de suítes de temporada em Ubatuba. O projeto reúne sugestões de praias, passeios e restaurantes, com acesso por link ou QR code.

**Autora e responsável pelo projeto:** Evelyn dos Santos Rofino.

[Acesse a versão publicada](https://amarelo-sol-ubatuba-guia.rainy-stone-4215.chatgpt.site)

## Problema e proposta

Hóspedes precisam consultar endereços, orientações da hospedagem e opções de lazer e alimentação. A proposta é reunir essas informações em uma página acessível pelo celular, compartilhada após o check-in.

## Funcionalidades

- Filtros por praias, passeios e alimentação.
- Busca por nome e descrição, ignorando acentos.
- Links de pesquisa no Google Maps e no Waze.
- WhatsApp da anfitriã e ligação telefônica.
- Endereço com botão para copiar para pedidos de delivery.
- Horários e orientações da estadia.
- Layout responsivo, link para pular conteúdo, foco visível e respeito à preferência por menos movimento.

## Tecnologias

HTML5, CSS3 e JavaScript puro. Não exige instalação de dependências nem servidor de aplicação. O QR code é uma imagem gerada a partir do endereço da versão publicada.

## Estrutura

```text
guia-amarelo-sol/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── qr-guia.png
├── README.md
└── COMO-PUBLICAR.md
```

## Executar e editar

Abra `index.html` no navegador para visualizar. Para testar a cópia do endereço, prefira HTTPS ou localhost: o navegador pode limitar a área de transferência em arquivos locais.

Se tiver Python, execute na pasta do projeto:

```bash
python -m http.server 8000
```

Abra http://localhost:8000.

Os locais estão no array `places` em `script.js`. Cada item contém `name`, `category`, `icon`, `desc`, `query` e `source`. A categoria deve ser `Praias`, `Passeios` ou `Onde comer`.

Edite cores e layout em `style.css`. Edite textos de boas-vindas, endereço e orientações em `index.html`. Ao mudar o endereço, atualize também a variável `address` em `script.js`.

## Conteúdo e validação

Os oito locais são uma seleção inicial pesquisada em fontes de turismo e sites dos estabelecimentos. A curadoria pessoal da anfitriã ainda será incorporada. Os links de cada cartão levam à fonte correspondente.

Não são informados preços, horários ou tempos de viagem. Maps e Waze recebem uma pesquisa textual: confira o destino encontrado antes de iniciar a rota. O endereço da hospedagem e os contatos foram fornecidos pela responsável.

A sintaxe do JavaScript da versão inicial foi verificada e a publicação foi concluída. A versão separada em arquivos também passou pela verificação de sintaxe. Não foi realizada validação visual automatizada nem auditoria de acessibilidade. Antes de divulgar, teste no celular os filtros, busca, contatos, rotas e QR code.

## QR code e GitHub Pages

O QR code incluído aponta para a versão publicada no link acima. Se você publicar em GitHub Pages, gere outro QR code para o novo endereço, ou mantenha o atual para continuar usando a primeira publicação. O QR code não muda automaticamente quando você troca de hospedagem.

## Desenvolvimento e Tecnologias

Projeto desenvolvido com apoio de IA na geração do código e da primeira interface no estilo **vibe coding**.

A autora definiu o problema, os requisitos, a identidade do negócio e os dados da hospedagem. 

A arquitetura lógica, os scripts e o design inicial foram criados por meio de engenharia de prompt utilizando o **ChatGPT Plus**. Essa abordagem guiada por intenção permitiu transformar conceitos abstratos em um site funcional de forma extremamente ágil, focando na orquestração dos recursos da inteligência artificial.

###  Ferramentas Utilizadas
* **[ChatGPT Plus](https://chatgpt.com)** — Geração do código-fonte (HTML/CSS/JS ou Framework) e estrutura da interface.
* **Refinamento Manual** — Ajustes e polimento final do código para garantir a usabilidade.


## Próximas melhorias

- Incorporar os locais indicados pela anfitriã.
- Acrescentar fotos com autorização e créditos.
- Conferir entradas e coordenadas dos destinos.
- Registrar testes em celular e melhorias de acessibilidade.
- Adicionar indicações de delivery com contatos confirmados.

## Fontes da seleção inicial

- https://turismo.ubatuba.sp.gov.br/praias/
- https://projetotamar.org.br/centros_visitantes.php?cod=9
- https://aquariodeubatuba.com.br/
- https://www.raizesubatuba.com/
- https://restaurantereidocamarao.com.br/

Conteúdo consultado em 9 de outubro de 2026. Fotos de terceiros não foram incluídas; os cartões usam emojis e elementos gráficos em CSS.
