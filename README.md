# NightCity Store — FiveM

Loja virtual com painel admin, carrinho e integracao com bot Discord.

## Estrutura

```
nightcity-store-completo/
├── bot/          # API + bot Discord (Node.js)
├── site/         # Loja (HTML/CSS/JS)
├── DEPLOY.md     # Guia: online gratis para sempre
└── render.yaml   # Deploy automatico no Render
```

## Inicio rapido

**Local:** instale [Node.js](https://nodejs.org), depois:

```bash
cd bot
npm install
npm start
```

Abra `site/index.html` no navegador.

**Online gratis:** siga o guia **[DEPLOY.md](DEPLOY.md)** (GitHub Pages + Render + UptimeRobot).

## Funcionalidades

- Loja com produtos, carrinho e checkout
- Painel admin (produtos, pedidos, config)
- Bot Discord: status, mensagens, embeds, notificacoes de compra
- API REST: `/status`, `/config`, `/send`, `/setstatus`
