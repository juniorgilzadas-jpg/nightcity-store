// NightCity Store — BOT DISCORD
// Local:    npm install && npm start
// Online:   Render / Railway (gratis) — veja DEPLOY.md

const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require("discord.js");
const express = require("express");
const cors    = require("cors");
const fs      = require("fs");
const path    = require("path");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

const CFG = path.join(__dirname, "config.json");

function loadCfg() {
  let base = {};
  try { base = JSON.parse(fs.readFileSync(CFG, "utf8")); } catch {}
  if (process.env.DISCORD_TOKEN)   base.token          = String(process.env.DISCORD_TOKEN).trim();
  if (process.env.CHANNEL_COMPRAS) base.channelCompras = process.env.CHANNEL_COMPRAS;
  if (process.env.CHANNEL_PROMOS)  base.channelPromos  = process.env.CHANNEL_PROMOS;
  if (process.env.PORT)            base.port           = Number(process.env.PORT);
  return base;
}

function saveCfg(d) {
  let cur = {};
  try { cur = JSON.parse(fs.readFileSync(CFG, "utf8")); } catch {}
  const merged = { ...cur, ...d };
  try { fs.writeFileSync(CFG, JSON.stringify(merged, null, 2)); } catch {}
  return merged;
}

let cfg = loadCfg();
let client = null;
let ready = false;
let loggingIn = false;

function createClient() {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });
}

function wireClient(c) {
  c.once("ready", () => {
    ready = true;
    loggingIn = false;
    console.log("[BOT] Online como:", c.user.tag);
    setTimeout(applyStatus, 500);
  });

  c.on("error", err => console.error("[BOT] Erro:", err.message));
  c.on("disconnect", () => { ready = false; });
}

async function loginBot() {
  cfg = loadCfg();
  if (!cfg.token) {
    console.log("[BOT] Sem token. Configure DISCORD_TOKEN ou pelo painel do site.");
    return;
  }
  if (loggingIn) return;
  loggingIn = true;

  if (client) {
    try { await client.destroy(); } catch {}
    ready = false;
  }

  client = createClient();
  wireClient(client);

  const token = String(cfg.token || "").trim();
  if (!token) {
    loggingIn = false;
    console.log("[BOT] Token vazio apos trim.");
    return;
  }
  try {
    await client.login(token);
  } catch (e) {
    loggingIn = false;
    ready = false;
    console.error("[BOT] Token invalido:", e.message);
  }
}

function applyStatus() {
  cfg = loadCfg();
  if (!client?.user) return;
  const types = {
    playing:   ActivityType.Playing,
    watching:  ActivityType.Watching,
    listening: ActivityType.Listening,
    competing: ActivityType.Competing
  };
  try {
    client.user.setPresence({
      status: cfg.presenceStatus || "online",
      activities: [{
        name: cfg.statusText || "NightCity RP",
        type: types[cfg.statusType || "playing"] || ActivityType.Playing
      }]
    });
  } catch (e) {
    console.error("[BOT] Status:", e.message);
  }
}

async function getChannel(id) {
  if (!client || !ready) return null;
  try { return await client.channels.fetch(id); } catch { return null; }
}

// ── ROTAS API ─────────────────────────────────────────────────

app.get("/status", (req, res) => res.json({
  online: ready,
  tag:    client?.user?.tag    || null,
  avatar: client?.user?.displayAvatarURL() || null,
  guilds: client?.guilds?.cache.size || 0
}));

app.post("/config", async (req, res) => {
  const oldToken = cfg.token;
  const merged = saveCfg(req.body);
  cfg = merged;
  if (ready) applyStatus();
  if (req.body.token && req.body.token !== oldToken) {
    await loginBot();
  }
  res.json({ ok: true, online: ready });
});

app.get("/config", (req, res) => {
  const c = loadCfg();
  res.json({
    channelCompras: c.channelCompras || "",
    channelPromos:  c.channelPromos  || "",
    statusText:     c.statusText     || "",
    statusType:     c.statusType     || "playing",
    presenceStatus: c.presenceStatus || "online",
    hasToken:       !!c.token
  });
});

app.post("/setstatus", (req, res) => {
  if (!ready) return res.status(503).json({ error: "Bot offline. Aguarde o login ou verifique o token." });
  const { text, type, presence } = req.body;
  cfg = saveCfg({ statusText: text, statusType: type, presenceStatus: presence });
  applyStatus();
  res.json({ ok: true });
});

app.post("/send", async (req, res) => {
  if (!ready) return res.status(503).json({ error: "Bot offline. Verifique DISCORD_TOKEN no servidor." });
  const { channelId, message, embed } = req.body;
  if (!channelId || (!message && !embed)) {
    return res.status(400).json({ error: "Informe channelId e message ou embed." });
  }
  const ch = await getChannel(channelId);
  if (!ch || !ch.isTextBased?.()) {
    return res.status(404).json({ error: "Canal nao encontrado. Confira o ID e se o bot esta no servidor." });
  }
  try {
    const payload = {};
    if (message) payload.content = message;
    if (embed) {
      const e = new EmbedBuilder();
      if (embed.title)       e.setTitle(embed.title);
      if (embed.description) e.setDescription(embed.description);
      if (embed.color)       e.setColor(embed.color);
      if (embed.fields)      e.addFields(embed.fields);
      if (embed.timestamp)   e.setTimestamp(new Date(embed.timestamp));
      payload.embeds = [e];
    }
    await ch.send(payload);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Falha ao enviar mensagem." });
  }
});

app.get("/", (req, res) => res.json({ ok: true, service: "NightCity Bot", online: ready }));
app.get("/health", (req, res) => res.status(200).send("ok"));

process.on("uncaughtException", err => console.error("[BOT] uncaught:", err.message));
process.on("unhandledRejection", err => console.error("[BOT] rejection:", err?.message || err));

const PORT = process.env.PORT || cfg.port || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log("[API] Rodando na porta", PORT);
  setTimeout(loginBot, 1500);
});
