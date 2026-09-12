export type Language = "cs" | "en";

export const LANGUAGES: Language[] = ["cs", "en"];

type Dict = Record<string, Record<Language, string>>;

/**
 * Every visible string lives here. Use `t("key")` or `t("key", { var })`.
 * `{var}` placeholders are replaced at runtime.
 */
export const translations: Dict = {
  /* ---------- meta ---------- */
  "brand.studio": { cs: "prostě Veronika", en: "just Veronika" },
  "meta.title.studio": {
    cs: "prostě Veronika — weby, portfolia, záchrana CMS",
    en: "just Veronika — websites, portfolios, CMS rescue",
  },
  "meta.title.dev": {
    cs: "Veronika Gabrielová — frontend / product developer",
    en: "Veronika Gabrielová — frontend / product developer",
  },

  /* ---------- header ---------- */
  "nav.services": { cs: "Služby", en: "Services" },
  "nav.work": { cs: "Ukázky", en: "Work" },
  "nav.process": { cs: "Jak to probíhá", en: "Process" },
  "nav.pricing": { cs: "Cena", en: "Pricing" },
  "nav.contact": { cs: "Kontakt", en: "Contact" },
  "nav.experience": { cs: "Zkušenosti", en: "Experience" },
  "nav.stack": { cs: "Skills", en: "Skills" },
  "nav.culture": { cs: "Kultura", en: "Culture" },
  "nav.hire": { cs: "Spolupráce", en: "Hire" },
  "nav.menu": { cs: "Menu", en: "Menu" },
  "nav.close": { cs: "Zavřít", en: "Close" },
  "language.cs": { cs: "Čeština", en: "Czech" },
  "language.en": { cs: "Angličtina", en: "English" },
  "language.switch": { cs: "Přepnout jazyk", en: "Switch language" },
  "mode.toDev": { cs: "Zapnout DEV mód", en: "Enable DEV mode" },
  "mode.toStudio": { cs: "Vypnout DEV mód", en: "Disable DEV mode" },
  "mode.devHint": {
    cs: "Pro firmy a tech týmy: hard skills, zkušenosti ze SaaS, kultura.",
    en: "For companies & tech teams: hard skills, SaaS track record, culture.",
  },
  "mode.studioHint": {
    cs: "Pro lidi a značky: weby, portfolia, záchrana CMS.",
    en: "For people & brands: websites, portfolios, CMS rescue.",
  },
  "dev.loading.eyebrow": { cs: "SYSTEM BOOT · v0.9", en: "SYSTEM BOOT · v0.9" },
  "dev.loading.title": { cs: "NAČÍTÁM DEV MÓD", en: "LOADING DEV MODE" },
  "dev.loading.progress": { cs: "PRŮBĚH", en: "PROGRESS" },
  "dev.loading.hint": {
    cs: "STISKNI ESC… ehm, vlastně nic. Jen čekej.",
    en: "PRESS ESC… actually never mind. Just wait.",
  },
  "dev.loading.step.1": { cs: "Inicializace terminálu", en: "Init terminal" },
  "dev.loading.step.2": { cs: "Mount /saas/experience", en: "Mount /saas/experience" },
  "dev.loading.step.3": { cs: "Načítám stack a slackmoji", en: "Loading stack & slackmoji" },
  "dev.loading.step.4": { cs: "Zapínám neon a hvězdy", en: "Enabling neon & stars" },
  "studio.loading.eyebrow": { cs: "Přepínám", en: "Switching" },
  "studio.loading.title": { cs: "Zpátky do studia.", en: "Back to the studio." },
  "studio.loading.step.1": { cs: "Ukládám konzoli…", en: "Putting the console away…" },
  "studio.loading.step.2": { cs: "Vracím teplé barvy…", en: "Restoring warm colours…" },
  "studio.loading.step.3": { cs: "Připravuji portfolio…", en: "Preparing the portfolio…" },
  "studio.loading.step.4": { cs: "Hotovo.", en: "Ready." },

  /* ---------- studio: hero ---------- */
  "studio.hero.eyebrow": {
    cs: "Vývojářka · Praha / remote",
    en: "Developer · Prague / remote",
  },
  "studio.hero.title.1": { cs: "Weby, které vypadají jako vy.", en: "Websites that look like you." },
  "studio.hero.title.2": { cs: "— a fungují.", en: "— and they work." },
  "studio.hero.lead": {
    cs: "Jsem Veronika. Přes {years} let stavím rozhraní pro SaaS firmy — a stejnou péči dávám webům pro lidi, kteří chtějí mít online něco, za co se nemusí stydět. Nový web, portfolio, záchrana rozbitého CMS nebo převod vašeho Lovable prototypu do reality.",
    en: "I'm Veronika. I've spent {years}-plus years building interfaces for SaaS companies — and I bring the same care to websites for people who want something online they're proud of. A new site, a portfolio, a rescue of a broken CMS, or turning your Lovable prototype into the real thing.",
  },
  "studio.hero.cta.primary": { cs: "Napište mi", en: "Get in touch" },
  "studio.hero.cta.secondary": { cs: "Podívat se na ukázky", en: "See the work" },
  "studio.hero.fact.years": { cs: "{years}+ let ve frontendu", en: "{years}+ years in frontend" },
  "studio.hero.fact.saas": { cs: "Productboard · Aimful · BACKBONE", en: "Productboard · Aimful · BACKBONE" },
  "studio.hero.fact.lang": { cs: "Česky i anglicky", en: "Czech & English" },
  "studio.hero.card.label": { cs: "Právě teď", en: "Right now" },
  "studio.hero.card.status": { cs: "Volná kapacita na 1–2 weby měsíčně", en: "Room for 1–2 websites a month" },

  /* ---------- studio: services ---------- */
  "services.eyebrow": { cs: "Co pro vás udělám", en: "What I do" },
  "services.title": { cs: "Od nápadu po funkční web.", en: "From idea to a working website." },
  "services.lead": {
    cs: "Nepotřebujete agenturu. Potřebujete někoho, kdo to prostě udělá — pořádně, rychle a tak, aby vám to pak sloužilo.",
    en: "You don't need an agency. You need someone who just gets it done — properly, quickly, and in a way that keeps serving you.",
  },
  "services.new.title": { cs: "Nový web nebo portfolio", en: "New website or portfolio" },
  "services.new.desc": {
    cs: "Vizitka, portfolio, prezentace služeb nebo menší e-shop. Návrh, kód, texty i nasazení. Rychlý web, který se dobře čte na mobilu i vyhledávačům.",
    en: "A business card site, a portfolio, a services page or a small shop. Design, code, copy and deployment. Fast, readable on mobile and by search engines.",
  },
  "services.cms.title": { cs: "Záchrana existujícího CMS", en: "Rescue for your existing CMS" },
  "services.cms.desc": {
    cs: "Máte web na WordPressu, Webflow, Wixu, Shopify nebo Squarespace a nevíte si s ním rady? Opravím, přestavím, zrychlím, naučím vás ho ovládat — nebo ho přesunu tam, kde vám nebude překážet.",
    en: "Got a site on WordPress, Webflow, Wix, Shopify or Squarespace that fights you back? I fix, rebuild, speed up, teach you to run it — or move it somewhere that gets out of your way.",
  },
  "services.lovable.title": { cs: "Lovable dreams → realita", en: "Lovable dreams → reality" },
  "services.lovable.desc": {
    cs: "Naklikali jste prototyp v Lovable, v0, Boltu nebo Figmě a teď to nejde dotáhnout? Převezmu ho, uklidím kód, přidám doménu, formuláře, analytiku a hosting. Z prototypu bude produkt.",
    en: "You've clicked together a prototype in Lovable, v0, Bolt or Figma and now it won't cross the finish line? I take it over, clean up the code, add a domain, forms, analytics and hosting. Prototype becomes product.",
  },
  "services.care.title": { cs: "Dlouhodobá péče", en: "Ongoing care" },
  "services.care.desc": {
    cs: "Drobné úpravy, nové sekce, sezónní změny, konzultace. Účtuji po hodinách, žádné paušály, které nevyužijete.",
    en: "Small tweaks, new sections, seasonal changes, consulting. Billed hourly — no retainers you won't use.",
  },
  "services.badge.popular": { cs: "Nejčastější", en: "Most popular" },
  "services.new.from": { cs: "Nápad v hlavě", en: "An idea in your head" },
  "services.new.to": { cs: "web, který žije", en: "a website that's live" },
  "services.cms.from": { cs: "CMS, které vás štve", en: "A CMS that fights you" },
  "services.cms.to": { cs: "web, se kterým si víte rady", en: "a site you can actually run" },
  "services.lovable.from": { cs: "Prototyp v Lovable", en: "A Lovable prototype" },
  "services.lovable.to": { cs: "produkt s doménou", en: "a product with a domain" },
  "services.care.from": { cs: "Jednorázová oprava", en: "A one-off fix" },
  "services.care.to": { cs: "někdo, kdo to hlídá", en: "someone who keeps watch" },

  /* ---------- work ---------- */
  "work.eyebrow": { cs: "Ukázky", en: "Selected work" },
  "work.title": { cs: "Weby, které už žijí.", en: "Websites already out there." },
  "work.lead": {
    cs: "Každý web je jiný, protože každý člověk je jiný. Společné mají jen to, že fungují.",
    en: "Every site is different, because every person is. The only thing they share: they work.",
  },
  "work.visit": { cs: "Otevřít web", en: "Open site" },
  "work.saltedsoul.title": { cs: "Salted Soul", en: "Salted Soul" },
  "work.saltedsoul.desc": {
    cs: "Svatby a boho pikniky na Fuerteventuře. Vícejazyčný web s balíčky, poptávkovým formulářem a SEO pro destinační svatby.",
    en: "Intimate weddings and boho picnics on Fuerteventura. Multilingual site with packages, an enquiry form and SEO for destination weddings.",
  },
  "work.casalapaz.title": { cs: "Casa la Paz", en: "Casa la Paz" },
  "work.casalapaz.desc": {
    cs: "Eko-farma a retreaty v Tindaye. Klidný web, který prodává atmosféru místa a vede k rezervaci.",
    en: "Eco-farm stays and retreats in Tindaya. A calm site that sells the feeling of the place and leads to a booking.",
  },
  "work.vladokniz.title": { cs: "Vlado Kníž", en: "Vlado Kníž" },
  "work.vladokniz.desc": {
    cs: "Fotografické portfolio se skrytým mini-CMS: fotograf si sám spravuje sekce, texty i fotky bez WordPressu.",
    en: "A photography portfolio with a hidden mini-CMS: the photographer manages sections, copy and photos himself — no WordPress.",
  },
  "work.barborasika.title": { cs: "Bára Sika", en: "Bára Sika" },
  "work.barborasika.desc": {
    cs: "Teaser stránka během rekonstrukce webu — video, kontakt a dvojjazyčný přepínač. Malá věc udělaná pořádně.",
    en: "A teaser page while the full site is being rebuilt — video, contact and a bilingual switch. A small thing done properly.",
  },
  "work.tag.business": { cs: "Firemní web", en: "Business site" },
  "work.tag.portfolio": { cs: "Portfolio", en: "Portfolio" },
  "work.tag.multilang": { cs: "Vícejazyčný", en: "Multilingual" },
  "work.tag.seo": { cs: "SEO", en: "SEO" },
  "work.tag.booking": { cs: "Rezervace", en: "Booking" },
  "work.tag.cms": { cs: "Vlastní CMS", en: "Custom CMS" },
  "work.tag.teaser": { cs: "Teaser", en: "Teaser" },

  /* ---------- process ---------- */
  "process.eyebrow": { cs: "Jak to probíhá", en: "How it works" },
  "process.title": { cs: "Čtyři kroky. Žádné překvapení.", en: "Four steps. No surprises." },
  "process.1.title": { cs: "Zavoláme si", en: "We talk" },
  "process.1.desc": {
    cs: "30 minut zdarma. Co potřebujete, co už máte, kolik to má stát. Řeknu vám rovnou, jestli dává smysl to dělat se mnou.",
    en: "30 minutes, free. What you need, what you already have, what it should cost. I'll tell you straight if it makes sense to do it with me.",
  },
  "process.2.title": { cs: "Návrh", en: "Design" },
  "process.2.desc": {
    cs: "Struktura, texty, vzhled. Ukážu vám klikací návrh, ne PDF. Upravujeme, dokud to není vaše.",
    en: "Structure, copy, look. You get a clickable draft, not a PDF. We iterate until it feels like yours.",
  },
  "process.3.title": { cs: "Vývoj", en: "Build" },
  "process.3.desc": {
    cs: "Kóduju, průběžně sdílím náhled. Rychlost, přístupnost, SEO a mobil jsou samozřejmost, ne příplatek.",
    en: "I code and share previews as I go. Speed, accessibility, SEO and mobile are the baseline, not an upsell.",
  },
  "process.4.title": { cs: "Předání", en: "Handover" },
  "process.4.desc": {
    cs: "Doména, hosting, analytika, návod. Web je váš — včetně kódu. A když budete chtít, zůstanu po ruce.",
    en: "Domain, hosting, analytics, a how-to. The site is yours — code included. And if you want, I stay around.",
  },

  /* ---------- pricing ---------- */
  "pricing.eyebrow": { cs: "Cena", en: "Pricing" },
  "pricing.title": { cs: "Transparentně. Po hodinách.", en: "Transparent. Billed hourly." },
  "pricing.lead": {
    cs: "Úpravy, weby, konzultace i dlouhodobou spolupráci účtuji hodinovou sazbou. Po úvodní schůzce vám řeknu odhad rozsahu.",
    en: "Tweaks, websites, consulting and long-term work are billed hourly. After the intro call I'll give you a scope estimate.",
  },
  "pricing.rate.label": { cs: "Hodinová sazba", en: "Hourly rate" },
  "pricing.rate.value": { cs: "{rate} Kč", en: "CZK {rate}" },
  "pricing.rate.unit": { cs: "/ hod bez DPH", en: "/ hour excl. VAT" },
  "pricing.rate.withVat": {
    cs: "{rateWithVat} Kč / hod s DPH {vat} %",
    en: "CZK {rateWithVat} / hour incl. {vat}% VAT",
  },
  "pricing.vat.title": { cs: "Jsem dobrovolný plátce DPH", en: "I'm a voluntary VAT payer" },
  "pricing.vat.desc": {
    cs: "Fakturuji s DPH {vat} %. Pokud jste plátce, DPH si odečtete a cena pro vás je sazba bez DPH. Pokud nejste, počítejte s cenou včetně DPH.",
    en: "I invoice with {vat}% VAT. If you're VAT-registered, you reclaim it and effectively pay the ex-VAT rate. If you're not, count on the price incl. VAT.",
  },
  "pricing.invoice.title": { cs: "Fakturuji na IČO", en: "I invoice as a sole trader" },
  "pricing.invoice.desc": {
    cs: "Podnikám jako OSVČ zapsaná v živnostenském rejstříku. Žádná smlouva na zkoušku, žádné zaměstnání — dostanete fakturu s náležitostmi podle českého zákona o DPH.",
    en: "I operate as a registered Czech sole trader. No trial contracts, no employment — you get a proper invoice compliant with Czech VAT law.",
  },
  "pricing.invoice.ico": { cs: "IČO", en: "Company ID (IČO)" },
  "pricing.invoice.dic": { cs: "DIČ", en: "VAT ID (DIČ)" },
  "pricing.invoice.registry": { cs: "Ověřit v ARES", en: "Verify in ARES" },
  "pricing.cta": { cs: "Chci nezávaznou nabídku", en: "Get a no-strings quote" },

  /* ---------- contact ---------- */
  "contact.eyebrow": { cs: "Kontakt", en: "Contact" },
  "contact.title": { cs: "Napište mi, co potřebujete.", en: "Tell me what you need." },
  "contact.lead": {
    cs: "Odpovídám do dvou pracovních dnů. Klidně jen v bodech — zbytek doladíme na hovoru.",
    en: "I reply within two working days. Bullet points are fine — we'll sort the rest on a call.",
  },
  "contact.cta": { cs: "Napište mi", en: "Get in touch" },
  "contact.linkedin": { cs: "LinkedIn", en: "LinkedIn" },
  "contact.github": { cs: "GitHub", en: "GitHub" },

  /* ---------- contact form sheet ---------- */
  "form.eyebrow": { cs: "Zpráva", en: "Message" },
  "form.title": { cs: "Napište mi", en: "Get in touch" },
  "form.name": { cs: "Jméno", en: "Name" },
  "form.email": { cs: "Váš e-mail", en: "Your email" },
  "form.message": { cs: "Zpráva", en: "Message" },
  "form.submit": { cs: "Odeslat", en: "Send" },
  "form.sending": { cs: "Odesílám…", en: "Sending…" },
  "form.close": { cs: "Zavřít", en: "Close" },
  "form.error": {
    cs: "Nepodařilo se odeslat. Zkuste to prosím znovu.",
    en: "Couldn't send. Please try again.",
  },
  "form.success.title": { cs: "Díky, mám to.", en: "Thanks — got it." },
  "form.success.lead": {
    cs: "Ozvu se do dvou pracovních dnů.",
    en: "I'll get back to you within two working days.",
  },

  /* ---------- footer ---------- */
  "footer.made": { cs: "Ručně kódováno v Praze.", en: "Hand-coded in Prague." },
  "footer.stack": { cs: "React · TypeScript · Netlify", en: "React · TypeScript · Netlify" },
  "footer.rights": { cs: "© {year} Veronika Gabrielová", en: "© {year} Veronika Gabrielová" },
  "footer.source": { cs: "Zdrojový kód", en: "Source code" },

  /* ---------- dev: hero ---------- */
  "dev.hero.prompt": { cs: "whoami", en: "whoami" },
  "dev.hero.name": { cs: "Veronika Gabrielová", en: "Veronika Gabrielová" },
  "dev.hero.role": {
    cs: "frontend / product developer · 🐝 🍯",
    en: "frontend / product developer · 🐝 🍯",
  },
  "dev.hero.title": {
    cs: "Stavím SaaS rozhraní, na kterých se lidem nechce klikat jinam.",
    en: "I build SaaS interfaces people don't want to click away from.",
  },
  "dev.hero.lead": {
    cs: "{years}+ let v produktových týmech — od pre-seed startupu, kde jsem byla jediný frontend, po scale-up s tisíci zákazníky. React, TypeScript, design systémy, rozšíření do Chromu a MS Teams. A vedle toho člověk, díky kterému má váš Slack víc než čtyři emoji.",
    en: "{years}+ years in product teams — from a pre-seed startup where I was the entire frontend, to a scale-up with thousands of customers. React, TypeScript, design systems, Chrome and MS Teams extensions. Also the person who makes sure your Slack has more than four emoji.",
  },
  "dev.hero.cta.primary": { cs: "Pojďme si zavolat", en: "Let's talk" },
  "dev.hero.cta.secondary": { cs: "LinkedIn", en: "LinkedIn" },
  "dev.hero.stat.years": { cs: "let v SaaS", en: "years in SaaS" },
  "dev.hero.stat.products": { cs: "produkty od nuly", en: "products from zero" },
  "dev.hero.stat.mentees": { cs: "mentees & juniorů", en: "mentees & juniors" },
  "dev.hero.stat.emoji": { cs: "vlastních slackmoji", en: "custom slackmoji" },
  "dev.hero.available": { cs: "otevřená spolupráci", en: "open to work" },

  /* ---------- dev: easter-egg game ---------- */
  "dev.game.open": {
    cs: "Psst… klikni na mě a zahraj si",
    en: "Psst… click me to play",
  },
  "dev.game.eyebrow": { cs: "easter egg · level 1", en: "easter egg · level 1" },
  "dev.game.eyebrow.over": { cs: "game over", en: "game over" },
  "dev.game.title": { cs: "Vyhni se legacy HTML", en: "Dodge the legacy HTML" },
  "dev.game.hint": {
    cs: "Letíš na duze skrz cizí codebase a proti tobě letí tagy, které se v roce 2026 psát nemají.",
    en: "You're riding a rainbow through someone else's codebase, and the tags nobody should be writing in 2026 are flying at you.",
  },
  "dev.game.how.title": { cs: "Jak na to", en: "How to play" },
  "dev.game.how.up.touch": {
    cs: "Ťukni kamkoli na obrazovku a vyletíš nahoru.",
    en: "Tap anywhere on the screen to fly up.",
  },
  "dev.game.how.up.desktop": {
    cs: "Zmáčkni mezerník, šipku nahoru nebo klikni a vyletíš nahoru.",
    en: "Press Space, the up arrow, or click to fly up.",
  },
  "dev.game.how.hold.touch": {
    cs: "Krátký ťuk = malý skok. Podrž prst déle = vyletíš výš. Pusť a začneš padat.",
    en: "Quick tap = small hop. Hold your finger longer = climb higher. Let go and you start falling.",
  },
  "dev.game.how.hold.desktop": {
    cs: "Krátký stisk = malý skok. Podrž klávesu déle = vyletíš výš. Pusť a začneš padat.",
    en: "Quick press = small hop. Hold the key longer = climb higher. Let go and you start falling.",
  },
  "dev.game.how.avoid": {
    cs: "Nesmíš se dotknout žádného tagu ani spadnout na zem.",
    en: "Don't touch any tag and don't hit the ground.",
  },
  "dev.game.how.score": {
    cs: "Každý minutý tag = 1 bod. Čím víc bodů, tím rychleji to letí.",
    en: "Every tag you pass = 1 point. The more points, the faster it gets.",
  },
  "dev.game.controls.touch": {
    cs: "Ťuk = nahoru · podržet = výš · ✕ = zavřít",
    en: "Tap = up · hold = higher · ✕ = close",
  },
  "dev.game.controls.desktop": {
    cs: "Mezerník / ↑ / klik = nahoru · podržet = výš · Esc = zavřít",
    en: "Space / ↑ / click = up · hold = higher · Esc = close",
  },
  "dev.game.start": { cs: "Start", en: "Start" },
  "dev.game.again": { cs: "Ještě jednou", en: "Play again" },
  "dev.game.close": { cs: "Zavřít hru", en: "Close game" },
  "dev.game.mute": { cs: "Ztlumit zvuk", en: "Mute sound" },
  "dev.game.unmute": { cs: "Zapnout zvuk", en: "Unmute sound" },
  "dev.game.score": { cs: "Skóre", en: "Score" },
  "dev.game.now": { cs: "Teď", en: "Now" },
  "dev.game.last": { cs: "Minule", en: "Last time" },
  "dev.game.best": { cs: "Rekord", en: "Best" },
  "dev.game.newBest": { cs: "Nový rekord!", en: "New high score!" },
  "dev.game.over.tag": {
    cs: "Bum. Dostal tě {tag}.",
    en: "Boom. {tag} got you.",
  },
  "dev.game.over.floor": {
    cs: "Bum. Přistání přímo do produkční databáze.",
    en: "Boom. Landed straight in the production database.",
  },

  /* ---------- dev: experience ---------- */
  "exp.eyebrow": { cs: "git log --oneline", en: "git log --oneline" },
  "exp.title": { cs: "Zkušenosti ze SaaS.", en: "SaaS track record." },
  "exp.lead": {
    cs: "Ne jen „frontend“. Produktová vývojářka, která rozumí, proč se feature dělá, a umí říct, když se dělat nemá.",
    en: "Not just “frontend”. A product developer who understands why a feature exists — and says so when it shouldn't.",
  },
  "exp.backbone.role": { cs: "Product Developer", en: "Product Developer" },
  "exp.backbone.desc": {
    cs: "SaaS pro vizualizace nemovitostí. Frontend produktu, design systém, feature flagy, spolupráce s designem a backendem na celém životním cyklu featury.",
    en: "SaaS for real-estate visuals. Product frontend, design system, feature flags, working with design and backend across the whole feature lifecycle.",
  },
  "exp.aimful.role": { cs: "Product Developer · jediný frontend", en: "Product Developer · sole frontend" },
  "exp.aimful.desc": {
    cs: "Pre-seed startup pro lepší meetingy nad Google Kalendářem. Celý frontend webové appky, MS Teams aplikace a rozšíření do Chromu — včetně schvalovacích procesů pro Chrome Store a Teams katalog. Design, product discovery, marketing, několik pivotů.",
    en: "Pre-seed startup for better meetings on top of Google Calendar. Entire frontend of the web app, MS Teams app and Chrome extension — including the Chrome Store and Teams catalogue approval processes. Design, product discovery, marketing, several pivots.",
  },
  "exp.productboardEm.role": { cs: "Engineering Manager", en: "Engineering Manager" },
  "exp.productboardEm.desc": {
    cs: "Vedení týmu, nábor, onboarding, zlepšování zákaznické podpory. Naučila jsem se, že kultura se nedělá na all-hands, ale v denních drobnostech.",
    en: "Team leadership, hiring, onboarding, improving customer support. Learned that culture isn't made at all-hands — it's made in daily small things.",
  },
  "exp.productboardDev.role": { cs: "Product Developer", en: "Product Developer" },
  "exp.productboardDev.desc": {
    cs: "Core UI featury napříč týmy v produktové platformě, kterou používají Microsoft, Zoom a tisíce dalších. Škálování z ~60 na 300+ lidí.",
    en: "Core UI features across teams in a product-management platform used by Microsoft, Zoom and thousands more. Scaled from ~60 to 300+ people.",
  },
  "exp.kiwi.role": { cs: "Front-end Developer", en: "Front-end Developer" },
  "exp.kiwi.desc": {
    cs: "Krátká, ale intenzivní zastávka: Next.js, GraphQL, Flow a frontend, který denně vidí miliony lidí.",
    en: "Short but intense: Next.js, GraphQL, Flow and a frontend seen by millions every day.",
  },
  "exp.msd.role": { cs: "Front-end Developer", en: "Front-end Developer" },
  "exp.msd.desc": {
    cs: "Firemní intranet v Reactu a TypeScriptu — první full-time frontend role a skok z nemocnice do IT.",
    en: "Company-wide intranet in React and TypeScript — first full-time frontend role and the leap from nursing into IT.",
  },

  /* ---------- volunteering ---------- */
  "vol.eyebrow": { cs: "git log --grep=volunteer", en: "git log --grep=volunteer" },
  "vol.title": { cs: "Dobrovolnictví & mentoring.", en: "Volunteering & mentoring." },
  "vol.lead": {
    cs: "Učím lidi kódovat od roku 2016 — ženy vstupující do techu, kolegy v MSD i děti ve Scratchi. Komunita je můj způsob, jak dělat tech.",
    en: "I've been teaching people to code since 2016 — women entering tech, colleagues at MSD, and kids in Scratch. Community is my way of doing tech.",
  },
  "vol.reactgirls.role": { cs: "Mentorka", en: "Mentor" },
  "vol.reactgirls.desc": {
    cs: "6+ týdenní mentoringy pro ženy vstupující do techu: React, TypeScript, DX, procesy, týmová práce a kariérní směr.",
    en: "6+ week mentorships for women entering tech: React, TypeScript, DX, processes, teamwork and career direction.",
  },
  "vol.jsAcademy.role": { cs: "Lead coach & organizátorka JS Academy", en: "Lead coach & organizer, JS Academy" },
  "vol.jsAcademy.desc": {
    cs: "Vedla a organizovala interní JavaScript code academy v MSD IT — kurikulum, koučování kolegů a celý běh kurzu. Tam jsem zjistila, že učit lidi je moje superschopnost.",
    en: "Led and organized the internal JavaScript code academy at MSD IT — curriculum, coaching colleagues and running the whole course. This is where I found out teaching people is my superpower.",
  },
  "vol.scratch.role": { cs: "Lektorka — kódování pro děti", en: "Instructor — coding for kids" },
  "vol.scratch.desc": {
    cs: "Učila jsem děti programovat ve Scratchi v rámci MSD — první smyčky, podmínky a kreativita místo strachu z „kódu“.",
    en: "Taught kids to code in Scratch at MSD — first loops, conditionals and creativity instead of fear of “code”.",
  },
  "vol.pyladies.role": { cs: "Mentorka & organizátorka", en: "Mentor & organizer" },
  "vol.pyladies.desc": {
    cs: "Komunita, která učí ženy programovat v Pythonu. Mentorovala jsem na kurzech a pomáhala organizovat srazy a workshopy — tady jsem zjistila, že komunita je můj způsob, jak dělat tech.",
    en: "A community teaching women to code in Python. I mentored on courses and helped organize meetups and workshops — this is where I learned that community is my way of doing tech.",
  },
  "exp.origin": {
    cs: "Z nemocnice do globálního SaaS. Ano, ta zdravotní sestra z článku na CzechCrunch.",
    en: "From a hospital to a global SaaS. Yes, the nurse from the CzechCrunch article.",
  },
  "exp.origin.link": { cs: "Přečíst článek", en: "Read the article" },

  /* ---------- dev: stack ---------- */
  "stack.eyebrow": { cs: "cat character-sheet.json", en: "cat character-sheet.json" },
  "stack.title": {
    cs: "Soft skills jsou hlavní stat. Tech je inventář.",
    en: "Soft skills are the main stat. Tech is the inventory.",
  },
  "stack.lead": {
    cs: "Frameworky se dají doučit za víkend. To, jak se s vámi pracuje, ne. Tak nejdřív to, na čem záleží.",
    en: "Frameworks can be picked up over a weekend. How it feels to work with you can't. So first, the stuff that matters.",
  },
  "stack.stats.title": { cs: "Character stats", en: "Character stats" },
  "stack.stats.hint": { cs: "max 100 · sebehodnocení, ale férové", en: "max 100 · self-assessed, but fair" },
  "stack.inventory.title": { cs: "Inventář", en: "Inventory" },
  "stack.inventory.hint": {
    cs: "Věci, které umím vzít do ruky a hned s nimi něco udělat.",
    en: "Things I can pick up and do something useful with right away.",
  },
  "stack.frontend": { cs: "Frontend", en: "Frontend" },
  "stack.product": { cs: "Produkt & design", en: "Product & design" },
  "stack.platforms": { cs: "Platformy, data & infra", en: "Platforms, data & infra" },

  "soft.vibe.name": { cs: "Team vibe engineering", en: "Team vibe engineering" },
  "soft.vibe.desc": {
    cs: "Slackmoji, #kudos, výlety, onboarding buddy. Kultura je feature a já ji shipuju.",
    en: "Slackmoji, #kudos, field trips, onboarding buddies. Culture is a feature and I ship it.",
  },
  "soft.translate.name": { cs: "Překlad produkt ⇄ dev", en: "Product ⇄ dev translation" },
  "soft.translate.desc": {
    cs: "Stejnou feature vysvětlím designérovi, backendu i CEO — každému v jeho jazyce.",
    en: "I explain the same feature to design, backend and the CEO — each in their own language.",
  },
  "soft.learn.name": { cs: "Učení za pochodu", en: "Learning on the fly" },
  "soft.learn.desc": {
    cs: "Nová doména, nový store approval proces, nový framework. Do týdne se v tom orientuju.",
    en: "New domain, new store approval process, new framework. Within a week I know my way around.",
  },
  "soft.mentor.name": { cs: "Mentoring & onboarding", en: "Mentoring & onboarding" },
  "soft.mentor.desc": {
    cs: "Nováček má první PR v produkci do týdne a ví, koho se zeptat. ReactGirls, PyLadies, JS Academy i Scratch v MSD.",
    en: "New hires ship their first PR within a week and know who to ask. ReactGirls, PyLadies, JS Academy and Scratch at MSD.",
  },
  "soft.product.name": { cs: "Product thinking", en: "Product thinking" },
  "soft.product.desc": {
    cs: "Ptám se „proč“ dřív než „jak“. Několik pivotů v pre-seed startupu mě to naučilo rychle.",
    en: "I ask “why” before “how”. A few pivots in a pre-seed startup taught me that fast.",
  },
  "soft.no.name": { cs: "Říkání „ne“ s úsměvem", en: "Saying “no” with a smile" },
  "soft.no.desc": {
    cs: "Když se feature dělat nemá, řeknu to. Slušně, s daty a s alternativou.",
    en: "When a feature shouldn't be built, I say so. Politely, with data, and with an alternative.",
  },
  "soft.async.name": { cs: "Async komunikace", en: "Async communication" },
  "soft.async.desc": {
    cs: "PR popisy, které se dají číst. Loom místo meetingu. Dokumentace, kterou někdo najde.",
    en: "PR descriptions people actually read. A Loom instead of a meeting. Docs someone can find.",
  },
  "soft.calm.name": { cs: "Klid při incidentu", en: "Calm during incidents" },
  "soft.calm.desc": {
    cs: "Bývalá zdravotní sestra. Spadlý deploy není krvácení — dá se to vyřešit v klidu a popořadě.",
    en: "Former nurse. A broken deploy isn't a haemorrhage — it can be fixed calmly, one step at a time.",
  },

  /* ---------- dev: culture ---------- */
  "culture.eyebrow": { cs: "#random", en: "#random" },
  "culture.title": { cs: "Firemní kultura je taky feature.", en: "Company culture is a feature too." },
  "culture.lead": {
    cs: "Dobrý tým pozná se podle toho, jak vypadá jeho Slack. Já jsem ta, co přidá 200 vlastních emoji, rozjede #pets a #kudos, udělá onboarding buddy program a vezme nováčky na výlet po Praze.",
    en: "You can tell a good team by what its Slack looks like. I'm the one who adds 200 custom emoji, starts #pets and #kudos, sets up an onboarding buddy program and takes new hires on a Prague walk.",
  },
  "culture.point.1.title": { cs: "Slackmoji & GIFy na míru", en: "Custom slackmoji & GIFs" },
  "culture.point.1.desc": {
    cs: "Každý tým si zaslouží vlastní :ship-it:. Dělám je z fotek kolegů, produktu i interních memů.",
    en: "Every team deserves its own :ship-it:. I make them from teammates, the product and internal memes.",
  },
  "culture.point.2.title": { cs: "Onboarding, který neodradí", en: "Onboarding that doesn't scare people" },
  "culture.point.2.desc": {
    cs: "Jako EM jsem postavila onboarding od nuly. Nováček má první PR v produkci do týdne — a ví, koho se zeptat.",
    en: "As an EM I built onboarding from scratch. New hires ship their first PR within a week — and know who to ask.",
  },
  "culture.point.3.title": { cs: "Komunita & mentoring", en: "Community & mentoring" },
  "culture.point.3.desc": {
    cs: "PyLadies, ReactGirls, JS Academy a Scratch v MSD. Učím lidi kódovat od roku 2016 a nepřestala jsem.",
    en: "PyLadies, ReactGirls, JS Academy and Scratch at MSD. I've been teaching people to code since 2016 and haven't stopped.",
  },
  "culture.point.4.title": { cs: "Expati & výlety", en: "Expats & field trips" },
  "culture.point.4.desc": {
    cs: "Provádím zahraniční kolegy Prahou, aby tu zakotvili. Retention začíná mimo kancelář.",
    en: "I show international colleagues around Prague so they actually stay. Retention starts outside the office.",
  },
  "culture.wall.title": { cs: "Reakce, které v týmu zavedu do týdne:", en: "Reactions I'll get your team using within a week:" },
  "culture.wall.hint": { cs: "Klikněte a přidejte reakci", en: "Click to react" },

  /* ---------- dev: hire ---------- */
  "hire.eyebrow": { cs: "./hire.sh", en: "./hire.sh" },
  "hire.title": { cs: "Jak se dá se mnou pracovat.", en: "Ways to work with me." },
  "hire.contract.title": { cs: "Kontrakt / part-time", en: "Contract / part-time" },
  "hire.contract.desc": {
    cs: "Zapojím se do vašeho produktového týmu na 2–5 dní v týdnu. Fakturuji na IČO, jsem plátce DPH.",
    en: "I join your product team for 2–5 days a week. Invoiced as a sole trader, VAT-registered.",
  },
  "hire.project.title": { cs: "Projekt s koncem", en: "Scoped project" },
  "hire.project.desc": {
    cs: "Rozšíření do Chromu, Teams appka, design systém, migrace z Flow na TypeScript. Definujeme, odhadnu, dodám.",
    en: "A Chrome extension, a Teams app, a design system, a Flow → TypeScript migration. We scope it, I estimate, I deliver.",
  },
  "hire.culture.title": { cs: "Culture boost", en: "Culture boost" },
  "hire.culture.desc": {
    cs: "Onboarding program, mentoring juniorů, interní code academy, nebo jen 200 slackmoji za odpoledne. Vážně.",
    en: "Onboarding program, junior mentoring, internal code academy — or just 200 slackmoji in an afternoon. Seriously.",
  },
  "hire.rate": { cs: "Sazba: {rate} Kč / hod bez DPH", en: "Rate: CZK {rate} / hour excl. VAT" },
  "hire.rate.note": { cs: "Dlouhodobé kontrakty individuálně.", en: "Long-term contracts priced individually." },
  "hire.cta": { cs: "Napište mi", en: "Get in touch" },

  /* ---------- misc ---------- */
  "misc.new": { cs: "Nové", en: "New" },
  "misc.current": { cs: "Nyní", en: "Now" },
  "misc.readMore": { cs: "Více", en: "More" },
  "misc.backToTop": { cs: "Nahoru", en: "Back to top" },
};
