# 🎸 Acordes da Fé

**Aprenda. Toque. Louve.**

App para aprender violão através de músicas cristãs/evangélicas: acordes, troca
de acordes, ritmos e prática gradual, com acompanhamento de progresso.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

- `src/types` — tipos do domínio (`Song`, `Chord`, `Rhythm`, `SongProgress`).
- `src/data` — conteúdo do catálogo (músicas, acordes, ritmos) e progresso
  mock do usuário local. Adicionar uma música nova é só adicionar um objeto
  em `src/data/songs.ts`.
- `src/app` — telas (App Router do Next.js).
- `src/components` — componentes reutilizáveis (diagrama de acorde, card de
  música, barra de progresso, navegação inferior).

## Direitos autorais

Todas as músicas do catálogo começam com `rights.status = "em_analise"` e
`rights.publiclyVisible = false` em `src/data/songs.ts`. **Nenhuma letra,
cifra completa ou áudio deve ser adicionado ou exibido publicamente até que a
licença de cada música seja verificada individualmente.** Antes de publicar
o app, revise o status de cada música nesse arquivo.

## Área administrativa

Acessível em `/admin` (sem link no menu do aluno, de propósito). Permite:

- ver o painel geral (`/admin`);
- listar e cadastrar músicas com todos os campos do catálogo (`/admin/musicas`,
  `/admin/musicas/novo`, `/admin/musicas/[id]`);
- revisar o status de direitos autorais de cada música, agrupado por status
  (`/admin/direitos`).

Como ainda não há banco de dados conectado, o formulário de música **não
persiste** as alterações — ao salvar, ele só mostra o objeto pronto para ser
gravado (visível também no console do navegador). Isso é intencional: a tela
já está pronta para ser ligada a uma API assim que o banco de dados existir.

## Deploy

O projeto está pronto para deploy direto na [Vercel](https://vercel.com) a
partir de um repositório do GitHub — nenhuma configuração adicional é
necessária nesta fase (dados locais, sem banco de dados ou variáveis de
ambiente).

## Próximos passos previstos na arquitetura

- Banco de dados (a camada `src/data` já isola o acesso a conteúdo, então a
  troca é local a esses arquivos).
- Login (o campo `userId` já existe em `SongProgress`/`UserStats`).
- Professor virtual / treino inteligente (o tipo `ChordPairDifficulty` já
  está modelado em `src/types`).
- Plano Premium (basta condicionar acesso por um campo `isPremium` no perfil
  do usuário, quando existir).
