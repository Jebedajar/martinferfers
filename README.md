# martinferfers.de – zweisprachige Website + Payload CMS auf Cloudflare

Kopie von www.spark-innovation.de, umgebaut zur zweisprachigen persönlichen Seite **martinferfers.de**.
Next.js 16 + Payload CMS 3, läuft als Cloudflare Worker. Datenbank: Cloudflare D1, Bilder: R2.
Eigener Worker, eigene Datenbank, eigener Bildspeicher – spark-innovation.de bleibt davon unberührt.

## Sprachen

- **Deutsch ist Standard** (ohne Präfix): `/`, `/about`, `/newsletter`, `/blog`, `/projects`, `/contact`, `/impressum`
- **Englisch** unter `/en`: `/en`, `/en/about`, `/en/newsletter`, …
- Oben rechts im Menü schaltet `EN` / `DE` auf dieselbe Seite in der anderen Sprache um
- `/sparks` leitet auf `/projects` um (die Seite heißt jetzt „Projekte / Projects“)

## Newsletter (Kit)

Alle Anmeldeformulare (Startseite, Newsletter-Seite, Kontakt) schicken direkt an Kit (kit.com):

| Sprache | Kit-Formular | Form-ID |
| --- | --- | --- |
| Deutsch | Inspiration Newsletter DE | `10184779` |
| Englisch | Inspiration Newsletter EN | `10184776` |

Die IDs stehen in `src/content/site.ts` unter `KIT`. Kit verschickt die Bestätigungsmail (Double-Opt-in) und leitet nach der Bestätigung auf `/newsletter?confirmed=1` bzw. `/en/newsletter?confirmed=1` weiter.
In Kit erkennst du die Sprache eines Abonnenten am Formular, über das er sich angemeldet hat (z. B. beim Broadcast nach Formular filtern).
Das Aussehen der Formulare kommt von der Website; das Design im Kit-Editor spielt keine Rolle.

## Blog

- Jeder Beitrag hat im CMS das Feld **Sprache**. Deutsche Beiträge erscheinen unter `/blog/…`, englische unter `/en/blog/…`
- Über das Feld **Übersetzung** verknüpfst du zwei Fassungen desselben Beitrags. Dann zeigt der Beitrag einen Link zur anderen Sprache, und der Sprachumschalter springt direkt dorthin
- Die Blog-Übersicht zeigt zuerst die Beiträge der eigenen Sprache, darunter die Beiträge, die es nur in der anderen Sprache gibt
- Alle Beiträge von spark-innovation.de werden beim ersten Deploy importiert; der ChatGPT→Claude-Artikel ist schon mit seiner deutschen Fassung verknüpft

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| `src/content/site.ts` | **Alle Texte der festen Seiten in DE und EN**, Menü, Kit-Form-IDs |
| `src/views/` | Seitenaufbau (eine Datei pro Seite, für beide Sprachen) |
| `src/app/(de)/` und `src/app/(en)/en/` | Routen der beiden Sprachen (nur dünne Hüllen um `src/views`) |
| `src/styles/site.css` | Gestaltung (Farben ganz oben als Variablen) |
| `src/collections/` | CMS-Bereiche: Blogbeiträge, Medien, Nachrichten, Benutzer |
| `src/migrations/` | Datenbankschema + Import der Blogbeiträge |

Links in Texten von `site.ts` schreibst du als `[Text](/pfad)`. Interne Pfade bekommen auf englischen Seiten automatisch `/en` davor. Mit `de:/pfad` oder `en:/pfad` erzwingst du eine Sprache (z. B. für einen Beitrag, den es nur auf Deutsch gibt).

## Lokal starten

Voraussetzungen: Node 22.23+ oder 24.22+, pnpm (`corepack enable`).

```bash
pnpm install
cp .env.example .env              # PAYLOAD_SECRET setzen: openssl rand -hex 32
pnpm payload migrate              # lokale Datenbank anlegen + Blogbeiträge importieren (vor dem ersten pnpm dev!)
pnpm dev                          # http://localhost:3000, CMS unter /admin
```

## Einmalig: Cloudflare einrichten

**1. Ressourcen anlegen** (Workers Paid ist schon gebucht):

```bash
pnpm wrangler login
pnpm wrangler d1 create martinferfers-cms        # gibt eine database_id aus
pnpm wrangler r2 bucket create martinferfers-media
```

Die ausgegebene `database_id` in `wrangler.jsonc` bei `REPLACE_WITH_D1_DATABASE_ID` eintragen, committen, pushen.

**2. Worker mit GitHub verbinden:** Cloudflare-Dashboard → *Workers & Pages → Create → Import a repository* → dieses Repo wählen.
- Build command: `pnpm run deploy:database && pnpm exec opennextjs-cloudflare build`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy`
- Build-Variablen: `NEXT_PUBLIC_SITE_URL=https://martinferfers.de`, `PAYLOAD_SECRET=<openssl rand -hex 32>`, `CLOUDFLARE_ENV=` (leer)
- Unter *Settings → Variables and Secrets* denselben `PAYLOAD_SECRET` als **Secret** für den Worker hinterlegen

Alternativ per GitHub Actions (`.github/workflows/deploy.yml`, manuell startbar) mit den Secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `PAYLOAD_SECRET`.

**3. Admin anlegen:** Nach dem ersten Deploy sofort die `*.workers.dev`-Adresse öffnen, `/admin` aufrufen und den Admin-Benutzer anlegen (der erste Benutzer wird Admin).

**4. Domain:** `martinferfers.de` muss ihr DNS bei Cloudflare haben (Nameserver beim Registrar auf Cloudflare umstellen, bestehende MX-Einträge übernehmen). Danach legt der Deploy die Custom Domains `martinferfers.de` und `www.martinferfers.de` automatisch an (`routes` in `wrangler.jsonc`).

**E-Mails aus dem Kontaktformular** gehen wie bei spark-innovation.de über Cloudflare Email Service von `website@spark-innovation.de` an `mf@spark-innovation.de` (in `wrangler.jsonc` unter `vars` änderbar). Das funktioniert, sobald spark-innovation.de im selben Cloudflare-Konto für Email Sending freigeschaltet ist. Jede Nachricht steht zusätzlich im CMS unter *Kontakt → Nachrichten*.

## Im CMS arbeiten

- **Blogbeitrag:** `/admin` → *Blogbeiträge* → Sprache wählen, optional Übersetzung verknüpfen → **Änderungen veröffentlichen**
- **/now-Seite:** unter *Inhalte → /now-Seite* (eine Fassung für beide Sprachen, derzeit Englisch)
- **Texte der festen Seiten** stehen in `src/content/site.ts`. Ändern, committen, pushen

## Schemaänderungen

```bash
pnpm payload migrate:create <name>
pnpm generate:types
```

Die Migration committen. Der nächste Deploy wendet sie auf D1 an.
