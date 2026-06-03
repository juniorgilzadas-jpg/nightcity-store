# Guia completo para iniciantes — NightCity Store online

Voce nao precisa saber programar. Siga na ordem. Cada passo tem um **checkbox** — marque quando terminar.

**Tempo estimado:** 40 a 60 minutos na primeira vez.

**O que voce vai criar:**
1. Um **bot** no Discord (avisa compras no seu servidor)
2. O **bot rodando na internet** (Render — gratis)
3. A **loja no navegador** (GitHub Pages — gratis)

---

## ANTES DE COMECAR — o que voce precisa

- [ ] Conta no **Discord** (discord.com)
- [ ] Um **servidor Discord** seu (ou de administrador) — se nao tiver: Discord → botao **+** → **Criar meu servidor**
- [ ] Conta de **e-mail** (Gmail serve)
- [ ] Esta pasta no PC: `nightcity-store-completo`
- [ ] Navegador Chrome ou Edge

**Nao compartilhe o TOKEN do bot com ninguem.** E a senha do seu bot.

---

# PARTE A — Criar o bot no Discord

## Passo A1 — Entrar no site de desenvolvedores

1. Abra: https://discord.com/developers/applications
2. Faca login com sua conta Discord
3. Clique no botao azul **New Application**
4. Nome: `NightCity Store` → **Create**

## Passo A2 — Pegar o TOKEN (senha do bot)

1. No menu esquerdo, clique em **Bot**
2. Clique **Add Bot** → confirme **Yes, do it!**
3. Clique **Reset Token** → confirme
4. Aparece um texto longo (ex: `MTk4...`). Clique **Copy**
5. **Cole num Bloco de Notas** e guarde. Voce vai usar no Passo C4.

> Se perder o token, repita **Reset Token** e copie de novo.

## Passo A3 — Ligar permissoes importantes

Ainda na pagina **Bot**, role ate **Privileged Gateway Intents** e ligue (azul):

- [ ] **MESSAGE CONTENT INTENT**
- [ ] **SERVER MEMBERS INTENT**

Clique **Save Changes** embaixo.

## Passo A4 — Convidar o bot para seu servidor

1. Menu esquerdo: **OAuth2** → **URL Generator**
2. Em **SCOPES**, marque: `bot`
3. Em **BOT PERMISSIONS**, marque pelo menos:
   - Send Messages
   - Embed Links
   - Read Message History
4. Copie a **URL** que aparece embaixo (comeca com `https://discord.com/oauth2/...`)
5. Cole no navegador e aperte Enter
6. Escolha **seu servidor** → **Continuar** → **Autorizar**
7. O bot deve aparecer na lista de membros do servidor (offline por enquanto — normal)

- [ ] Bot aparece no servidor Discord

---

# PARTE B — Colocar os arquivos no GitHub

O GitHub guarda seu projeto na nuvem. O Render e o site usam isso.

## Passo B1 — Criar conta no GitHub

1. Abra: https://github.com/signup
2. Crie conta (e-mail, senha, usuario)
3. Confirme o e-mail se pedirem

Anote seu **usuario GitHub** (ex: `joaosilva`).

## Passo B2 — Criar repositorio vazio

1. Logado no GitHub, clique **+** (canto superior direito) → **New repository**
2. **Repository name:** `nightcity-store` (pode ser outro nome)
3. Deixe **Public**
4. **NAO** marque "Add a README"
5. Clique **Create repository**

## Passo B3 — Enviar os arquivos (jeito facil pelo site)

1. Na pagina do repositorio novo, clique **uploading an existing file**
   (ou **Add file** → **Upload files**)
2. Abra no Windows a pasta: `Downloads\nightcity-store-completo`
3. **Selecione TUDO** dentro dela (Ctrl+A):
   - pastas `bot`, `site`, `.github`
   - arquivos `README.md`, `DEPLOY.md`, `render.yaml`, etc.
4. Arraste para a janela do GitHub
5. Espere o upload terminar
6. Embaixo: **Commit message** pode deixar como esta
7. Clique **Commit changes**

- [ ] Arquivos aparecem no GitHub (voce ve pastas `bot` e `site`)

> **Importante:** a branch deve se chamar `main`. Se o GitHub criou `master`, va em **Settings** do repo → renomeie para `main` ou avise no suporte.

---

# PARTE C — Bot online no Render

## Passo C1 — Conta no Render

1. Abra: https://render.com
2. **Get Started** → cadastre com **GitHub** (mais facil)
3. Autorize o Render a acessar seu GitHub

## Passo C2 — Criar o servico pelo Blueprint

1. No painel Render: **New +** → **Blueprint**
2. Conecte o repositorio `nightcity-store` (ou o nome que voce usou)
3. Render detecta o arquivo `render.yaml` → **Apply**
4. Pode pedir para criar o servico — confirme

## Passo C3 — Colocar o TOKEN do Discord

1. Clique no servico **nightcity-bot** (ou nome parecido)
2. Menu **Environment** (ou **Environment Variables**)
3. Clique **Add Environment Variable**
4. Adicione:

| Key | Value |
|-----|--------|
| `DISCORD_TOKEN` | Cole o token que voce guardou no Passo A2 |

5. **Save Changes** — o Render vai reiniciar (demora 2–5 min)

## Passo C4 — Copiar a URL do bot

1. No servico, no topo, ache **URL** (ex: `https://nightcity-bot-abc123.onrender.com`)
2. Clique para copiar
3. Cole no Bloco de Notas

- [ ] Abrir essa URL no navegador mostra algo como `{"ok":true,"service":"NightCity Bot",...}`

> Na primeira vez pode demorar 1–2 minutos (status **Building** / **Deploying**).

---

# PARTE D — Manter o bot acordado (UptimeRobot)

No plano gratis o Render "dorme" se ninguem acessar. Isso resolve.

## Passo D1

1. Abra: https://uptimerobot.com → **Register** (gratis)
2. Confirme e-mail se pedirem
3. **Add New Monitor**
4. Preencha:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** NightCity Bot
   - **URL:** cole a URL do Render (a mesma do Passo C4), com `/` no final ou sem — ambos funcionam
   - **Monitoring Interval:** 5 minutes
5. **Create Monitor**

- [ ] Status fica **Up** (verde) depois de alguns minutos

---

# PARTE E — Configurar a loja (site)

## Passo E1 — Editar config.js no GitHub

1. No seu repositorio GitHub, abra a pasta **site**
2. Clique no arquivo **config.js**
3. Clique no lapis **Edit** (ou botao de editar)
4. Troque a linha vazia por (use SUA URL do Render):

```javascript
window.NIGHTCITY_API = "https://nightcity-bot-abc123.onrender.com";
```

(substitua pelo endereco real, **sem** barra no final)

5. **Commit changes** → confirme

## Passo E2 — Ativar GitHub Pages

1. No repositorio: **Settings** (aba do repo)
2. Menu esquerdo: **Pages**
3. Em **Build and deployment** → **Source:** escolha **GitHub Actions**
4. Pronto — nao precisa mais nada aqui

## Passo E3 — Publicar o site (workflow)

1. Aba **Actions** no repositorio
2. Se aparecer workflow **Publicar site (GitHub Pages)**:
   - Clique nele → **Run workflow** → **Run workflow**
3. Espere 1–3 minutos ate ficar verde (check)
4. Volte em **Settings → Pages** — aparece o link da loja:
   - `https://SEU-USUARIO.github.io/nightcity-store/`

- [ ] O link abre a loja NightCity no navegador

> Se o workflow nao rodar sozinho: faca uma mudanca pequena (ex: espaco no README) e **Commit** de novo.

---

# PARTE F — Configurar canais e testar

## Passo F1 — IDs dos canais Discord (opcional mas recomendado)

1. No Discord (app ou site): **Configuracoes do usuario** (engrenagem) → **Avancado**
2. Ligue **Modo de desenvolvedor**
3. No seu servidor, **clique direito** no canal de compras → **Copiar ID do canal**
4. Guarde esse numero (so numeros, longo)

Repita para o canal de promocoes se quiser.

## Passo F2 — No painel da loja

1. Abra o link da loja (GitHub Pages)
2. Clique **Admin** (canto superior direito)
3. Aba **Bot Discord**
4. **URL da API:** deve ser a URL do Render (se editou `config.js`, ja pode estar certo)
5. Cole os IDs nos campos **Canal de Compras** e **Canal de Promocoes**
6. Clique **Salvar Canais**
7. Clique **Testar Conexao**

- [ ] Aparece **Bot Online** (bolinha verde)
- [ ] **Testar Compras** envia mensagem no Discord

## Passo F3 — Configurar servidor na loja

Aba **Config** no Admin:

- Nome do servidor
- Link do Discord (aparece no botao Discord do site)
- Chave PIX (se usar)

**Salvar**

---

# PRONTO — Checklist final

- [ ] Bot no servidor Discord
- [ ] Render com `DISCORD_TOKEN` configurado
- [ ] UptimeRobot monitorando a URL
- [ ] `site/config.js` com URL do Render
- [ ] GitHub Pages com link funcionando
- [ ] Admin mostra **Bot Online**
- [ ] Teste de mensagem no canal funcionou

---

# Problemas? Leia isto

### "Bot Offline" na loja
- Espere 2 min apos deploy no Render
- URL errada em config.js (tem que ser `https://...onrender.com`)
- Token errado no Render → gere novo token no Discord e atualize
- UptimeRobot nao configurado — bot dormindo

### GitHub Actions falhou (vermelho)
- Va em **Actions** → clique no erro → leia a mensagem
- Confira se a pasta `site` existe no repositorio
- Em **Settings → Pages**, source deve ser **GitHub Actions**

### Render nao acha o projeto
- O arquivo `render.yaml` precisa estar na **raiz** do repositorio (nao dentro de `bot` sozinho)
- Pasta `bot` com `package.json` e `bot.js` dentro

### Nao consigo subir arquivos no GitHub
- Use **GitHub Desktop**: https://desktop.github.com
  - File → Add local repository → escolha a pasta
  - Publish repository

### Pagina 404 no GitHub Pages
- URL correta: `https://USUARIO.github.io/NOME-DO-REPO/`
- Espere 5 min apos o Actions ficar verde

---

# Ordem resumida (cola na parede)

```
1. Discord → criar bot → copiar TOKEN → convidar pro servidor
2. GitHub → criar repo → upload da pasta
3. Render → Blueprint → colar DISCORD_TOKEN → copiar URL
4. UptimeRobot → monitorar URL do Render
5. GitHub → editar site/config.js com a URL
6. GitHub → Settings → Pages → GitHub Actions
7. GitHub → Actions → rodar deploy
8. Abrir loja → Admin → testar bot
```

Se travar em **um passo especifico**, anote o numero do passo (ex: C3) e a mensagem de erro que aparece na tela.
