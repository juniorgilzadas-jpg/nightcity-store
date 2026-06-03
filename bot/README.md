# NightCity Store Bot

Bot Discord para a loja FiveM.

## Rodar localmente

```bash
npm install
node bot.js
```

## Deploy no Railway

1. Faca upload desta pasta no Railway
2. Adicione as variaveis de ambiente:
   - `DISCORD_TOKEN` = token do seu bot
   - `CHANNEL_COMPRAS` = ID do canal de compras
   - `CHANNEL_PROMOS` = ID do canal de promocoes
3. O Railway inicia automaticamente com `node bot.js`

## Endpoints

- `GET  /status`       - status do bot
- `POST /config`       - salvar configuracoes
- `POST /setstatus`    - mudar status/presenca
- `POST /send`         - enviar mensagem ou embed
- `GET  /`             - health check
