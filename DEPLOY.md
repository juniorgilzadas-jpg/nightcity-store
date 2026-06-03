# NightCity Store — Online gratis para sempre

Guia passo a passo (100% gratuito): **site** no GitHub Pages + **bot** no Render.com.

---

## Parte 1 — Bot Discord (API 24h)

### 1. Criar o bot no Discord

1. Acesse https://discord.com/developers/applications
2. **New Application** → nome: `NightCity Store`
3. Menu **Bot** → **Add Bot** → **Reset Token** → copie o token
4. Ative: **Message Content Intent** e **Server Members Intent**
5. **OAuth2 → URL Generator**: marque `bot`, permissoes `Send Messages` e `Embed Links` → copie a URL e convide o bot ao seu servidor

### 2. Publicar no Render (gratis)

1. Crie conta em https://render.com (plano **Free**)
2. Suba este projeto no **GitHub** (repositorio publico ou privado)
3. No Render: **New +** → **Blueprint** → conecte o repositorio
4. O arquivo `render.yaml` ja configura tudo
5. Em **Environment**, adicione:
   - `DISCORD_TOKEN` = token do passo 1
   - `CHANNEL_COMPRAS` = ID do canal de compras (opcional)
   - `CHANNEL_PROMOS` = ID do canal de promocoes (opcional)
6. **Deploy** — anote a URL gerada, ex: `https://nightcity-bot-xxxx.onrender.com`

### 3. Manter o bot acordado 24h (gratis)

No plano free o Render “dorme” apos ~15 min sem acesso. Use **UptimeRobot** (gratis):

1. https://uptimerobot.com → conta gratis
2. **Add Monitor** → tipo **HTTP(s)**
3. URL: `https://SUA-URL.onrender.com/` (a URL do bot)
4. Intervalo: **5 minutos**
5. Salvar — o bot fica online praticamente o tempo todo

---

## Parte 2 — Site da loja (GitHub Pages)

### 1. Configurar URL da API no site

Edite `site/config.js`:

```javascript
window.NIGHTCITY_API = "https://nightcity-bot-xxxx.onrender.com";
```

(substitua pela URL real do Render, **sem** barra no final)

### 2. Publicar no GitHub Pages

1. Crie repositorio no GitHub e envie esta pasta
2. No repositorio: **Settings → Pages**
3. **Build and deployment** → Source: **GitHub Actions**
4. O workflow `.github/workflows/deploy-site.yml` publica automaticamente ao dar push na branch `main`
5. A loja ficara em: `https://SEU-USUARIO.github.io/SEU-REPO/`

### 3. Conectar site ao bot

1. Abra a loja publicada
2. **Admin → Bot Discord**
3. Em **URL da API**, cole a URL do Render (se nao usou `config.js`)
4. Clique **Testar Conexao** — deve mostrar **Bot Online**

---

## Rodar localmente (opcional)

Requer [Node.js 18+](https://nodejs.org):

```bash
cd bot
npm install
npm start
```

Abra `site/index.html` no navegador (ou use Live Server). API padrao: `http://localhost:3001`

---

## Resumo dos servicos gratis

| Servico        | Funcao              | Custo   |
|----------------|---------------------|---------|
| GitHub Pages   | Site da loja        | Gratis  |
| Render.com     | Bot + API           | Gratis  |
| UptimeRobot    | Manter bot acordado | Gratis  |
| Discord        | Bot + canais        | Gratis  |

---

## Problemas comuns

| Erro | Solucao |
|------|---------|
| Bot Offline no site | URL da API errada; bot dormindo — configure UptimeRobot |
| CORS / fetch falhou | Use HTTPS na URL da API; nao use `localhost` no site publicado |
| Canal nao encontrado | Bot precisa estar no servidor; ID do canal correto (Modo Dev) |
| Token invalido | Gere novo token no Discord Developer Portal |

---

## Variaveis de ambiente (Render)

| Variavel | Obrigatorio | Descricao |
|----------|-------------|-----------|
| `DISCORD_TOKEN` | Sim | Token do bot Discord |
| `CHANNEL_COMPRAS` | Nao | ID canal pedidos |
| `CHANNEL_PROMOS` | Nao | ID canal promocoes |
| `PORT` | Nao | Render define automaticamente |
