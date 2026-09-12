export type Language = "cs" | "en";

export const LANGUAGES: Language[] = ["cs", "en"];

type Dict = Record<string, Record<Language, string>>;

/**
 * Every visible string lives here. Use `t("key")` or `t("key", { var })`.
 * `{var}` placeholders are replaced at runtime.
 */
export const translations: Dict = {
  /* ---------- meta ---------- */
  "meta.title.studio": {
    cs: "Veronika Gabrielová — weby, portfolia, záchrana CMS",
    en: "Veronika Gabrielová — websites, portfolios, CMS rescue",
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
  "nav.stack": { cs: "Stack", en: "Stack" },
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

  /* ---------- studio: hero ---------- */
  "studio.hero.eyebrow": {
    cs: "Vývojářka · Praha / remote",
    en: "Developer · Prague / remote",
  },
  "studio.hero.title.1": { cs: "Weby, které vypadají jako vy.", en: "Websites that look like you." },
  "studio.hero.title.2": { cs: "A fungují.", en: "And actually work." },
  "studio.hero.lead": {
    cs: "Jsem Veronika. Přes osm let stavím rozhraní pro SaaS firmy — a stejnou péči dávám webům pro lidi, kteří chtějí mít online něco, za co se nemusí stydět. Nový web, portfolio, záchrana rozbitého CMS nebo převod vašeho Lovable prototypu do reality.",
    en: "I'm Veronika. I've spent eight-plus years building interfaces for SaaS companies — and I bring the same care to websites for people who want something online they're proud of. A new site, a portfolio, a rescue of a broken CMS, or turning your Lovable prototype into the real thing.",
  },
  "studio.hero.cta.primary": { cs: "Napište mi", en: "Get in touch" },
  "studio.hero.cta.secondary": { cs: "Podívat se na ukázky", en: "See the work" },
  "studio.hero.fact.years": { cs: "8+ let ve frontendu", en: "8+ years in frontend" },
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
  "pricing.title": { cs: "Transparentně. Po hodinách, nebo fixně.", en: "Transparent. Hourly, or fixed." },
  "pricing.lead": {
    cs: "Menší weby nabízím za fixní cenu po úvodní schůzce. Úpravy, konzultace a dlouhodobou spolupráci účtuji hodinovou sazbou.",
    en: "Smaller sites come at a fixed price after the intro call. Tweaks, consulting and long-term work are billed hourly.",
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
  "pricing.invoice.address": { cs: "Sídlo", en: "Registered address" },
  "pricing.invoice.registry": { cs: "Ověřit v ARES", en: "Verify in ARES" },
  "pricing.fixed.title": { cs: "Fixní cena za web", en: "Fixed price per site" },
  "pricing.fixed.desc": {
    cs: "Jednostránkový web nebo portfolio typicky v rozmezí 25–60 hodin práce. Přesnou cenu dostanete písemně po úvodní schůzce — a platí.",
    en: "A one-page site or portfolio typically lands between 25–60 hours of work. You get the exact price in writing after the intro call — and it holds.",
  },
  "pricing.cta": { cs: "Chci nezávaznou nabídku", en: "Get a no-strings quote" },

  /* ---------- contact ---------- */
  "contact.eyebrow": { cs: "Kontakt", en: "Contact" },
  "contact.title": { cs: "Napište mi, co potřebujete.", en: "Tell me what you need." },
  "contact.lead": {
    cs: "Odpovídám do dvou pracovních dnů. Klidně jen v bodech — zbytek doladíme na hovoru.",
    en: "I reply within two working days. Bullet points are fine — we'll sort the rest on a call.",
  },
  "contact.email": { cs: "E-mail", en: "Email" },
  "contact.linkedin": { cs: "LinkedIn", en: "LinkedIn" },
  "contact.github": { cs: "GitHub", en: "GitHub" },
  "contact.copy": { cs: "Kopírovat", en: "Copy" },
  "contact.copied": { cs: "Zkopírováno", en: "Copied" },
  "contact.subject.studio": { cs: "Web — poptávka", en: "Website enquiry" },
  "contact.subject.dev": { cs: "Spolupráce — frontend", en: "Frontend collaboration" },

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
    cs: "Osm let v produktových týmech — od pre-seed startupu, kde jsem byla jediný frontend, po scale-up s tisíci zákazníky. React, TypeScript, design systémy, rozšíření do Chromu a MS Teams. A vedle toho člověk, díky kterému má váš Slack víc než čtyři emoji.",
    en: "Eight years in product teams — from a pre-seed startup where I was the entire frontend, to a scale-up with thousands of customers. React, TypeScript, design systems, Chrome and MS Teams extensions. Also the person who makes sure your Slack has more than four emoji.",
  },
  "dev.hero.cta.primary": { cs: "Pojďme si zavolat", en: "Let's talk" },
  "dev.hero.cta.secondary": { cs: "LinkedIn", en: "LinkedIn" },
  "dev.hero.stat.years": { cs: "let v SaaS", en: "years in SaaS" },
  "dev.hero.stat.products": { cs: "produkty od nuly", en: "products from zero" },
  "dev.hero.stat.mentees": { cs: "mentees & juniorů", en: "mentees & juniors" },
  "dev.hero.stat.emoji": { cs: "vlastních slackmoji", en: "custom slackmoji" },
  "dev.hero.available": { cs: "otevřená spolupráci", en: "open to work" },

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
  "exp.msd.role": { cs: "Front-end Developer · Lead coach JS academy", en: "Front-end Developer · Lead coach JS academy" },
  "exp.msd.desc": {
    cs: "Firemní intranet v Reactu a TypeScriptu. Zároveň jsem vedla a organizovala interní JavaScript code academy — tam jsem zjistila, že učit lidi je moje superschopnost.",
    en: "Company-wide intranet in React and TypeScript. I also led and organized the internal JavaScript code academy — where I found out teaching people is my superpower.",
  },
  "exp.reactgirls.role": { cs: "Mentorka", en: "Mentor" },
  "exp.reactgirls.desc": {
    cs: "6+ týdenní mentoringy pro ženy vstupující do techu: React, TypeScript, DX, procesy, týmová práce a kariérní směr.",
    en: "6+ week mentorships for women entering tech: React, TypeScript, DX, processes, teamwork and career direction.",
  },
  "exp.origin": {
    cs: "Začátek: Czechitas & PyLadies. Předtím zdravotní sestra. Ano, ta z článku na CzechCrunch.",
    en: "Origin story: Czechitas & PyLadies. Nurse before that. Yes, the one from the CzechCrunch article.",
  },
  "exp.origin.link": { cs: "Přečíst článek", en: "Read the article" },

  /* ---------- dev: stack ---------- */
  "stack.eyebrow": { cs: "cat skills.json", en: "cat skills.json" },
  "stack.title": { cs: "Hard skills. Bez buzzwordů, které neumím.", en: "Hard skills. No buzzwords I can't back up." },
  "stack.frontend": { cs: "Frontend", en: "Frontend" },
  "stack.product": { cs: "Produkt & design", en: "Product & design" },
  "stack.platforms": { cs: "Platformy & infra", en: "Platforms & infra" },
  "stack.people": { cs: "Lidi & týmy", en: "People & teams" },

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
    cs: "ReactGirls, Czechitas, JS academy v MSD. Učím lidi kódovat od roku 2017 a nepřestala jsem.",
    en: "ReactGirls, Czechitas, JS academy at MSD. I've been teaching people to code since 2017 and haven't stopped.",
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
  "hire.cta": { cs: "Napsat e-mail", en: "Send an email" },

  /* ---------- misc ---------- */
  "misc.new": { cs: "Nové", en: "New" },
  "misc.current": { cs: "Nyní", en: "Now" },
  "misc.readMore": { cs: "Více", en: "More" },
  "misc.backToTop": { cs: "Nahoru", en: "Back to top" },
};
