// All texts of the fixed pages, in German (default) and English.
// Links inside texts: [label](url). Internal links like /projects get the /en prefix automatically on English pages.
// Prefix a path with de: or en: to always link to that language (e.g. de:/blog/... for a German-only post).
// Original texts and images taken from www.spark-innovation.de.
import type { L, Lang } from '@/lib/i18n'

// encodeURIComponent leaves ( ) alone; they would break the [label](url) syntax
const enc = (v: string) => encodeURIComponent(v).replace(/\(/g, '%28').replace(/\)/g, '%29')
const auditMail = (subject: string, body: string) =>
  `mailto:ai@spark-innovation.de?subject=${enc(subject)}&body=${enc(body)}`

const AUDIT = {
  de: auditMail(
    'KI-Audit',
    'Hallo, ich interessiere mich für ein KI-Audit für mich und mein Unternehmen.\n\n(Informationen für Sie als Unternehmer: Wir vereinbaren ein einstündiges Telefonat, in dem wir Ihr Unternehmen unter die Lupe nehmen und gemeinsam schauen, wo und wie KI Ihnen helfen könnte. Anschließend erhalten Sie innerhalb einer Woche einen fünfseitigen „Quick-Win“-Report sowie einen ausführlichen Leitfaden zur Umsetzung der Empfehlungen.)',
  ),
  en: auditMail(
    'AI audit',
    'Hi there, I am interested in an AI audit for me & my business.\n\n(Info for you as the business owner: We set up a 1-hour call and go through your business and where and how AI could help you. Within a week, you will then receive a 5-page quick-win report and an in-depth playbook on how to implement the recommendations.)',
  ),
} as L


/** Kit (kit.com) forms – one per language, so you can tell in Kit which language a subscriber wants. */
export const KIT = {
  forms: { de: '10184779', en: '10184776' } as L,
}

export const SITE = {
  name: 'Martin Ferfers',
  title: 'Martin Ferfers',
  description: {
    de: 'Meine Mission: Ideen zum Leben erwecken, die diese Welt zu einem besseren oder zumindest lustigeren Ort machen. – Martin Ferfers',
    en: 'This is my mission: Bring ideas to life that make this world a better or at least more fun place to live in. – Martin Ferfers',
  } as L,
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://martinferfers.de',
  logo: { src: '/images/martin-ferfers-logo.gif', width: 325, height: 44, alt: 'Martin Ferfers' },
  nav: [
    { label: { de: 'Über mich', en: 'About' }, href: '/about' },
    { label: { de: 'Newsletter', en: 'Newsletter' }, href: '/newsletter' },
    { label: { de: 'Blog', en: 'Blog' }, href: '/blog' },
    { label: { de: 'Projekte', en: 'Projects' }, href: '/projects' },
    { label: { de: 'Kontakt', en: 'Contact' }, href: '/contact' },
  ] as { label: L; href: string }[],
  footer: {
    // Same English text in both languages
    mission: [
      'This is my mission: Bring ideas to life that make this world a better or at least more fun place to live in.',
      'I live to create, inspire & entertain.',
      'Let´s rock this world together:',
    ],
    cta: { de: 'Schreib mir →', en: 'Get in touch →' } as L,
    copyright: '© Martin Ferfers',
    twitter: 'https://twitter.com/FerfersMartin',
    columns: [
      {
        heading: { de: 'Projekte', en: 'Projects' } as L,
        links: [
          { label: { de: 'Kostenlose KI-Beratung', en: 'Free AI Consulting' } as L, href: AUDIT },
          { label: { de: 'Wertstapel', en: 'Wertstapel' } as L, href: 'https://www.wertstapel.de' },
          { label: { de: 'Siggi Sternenschläfer', en: 'Siggi Sternenschläfer' } as L, href: 'http://www.siggi-sternenschlaefer.de' },
          { label: { de: 'Alle Projekte', en: 'All projects' } as L, href: '/projects' },
        ],
      },
      {
        heading: { de: 'Blogartikel', en: 'Blog Articles' } as L,
        links: [
          { label: { de: 'Komplettlösung Geldanlage', en: 'Komplettlösung Geldanlage' } as L, href: 'de:/blog/2023/7/13/komplettloesung-geldanlage' },
          { label: { de: 'Peter Attias Buch Outlive', en: 'Peter Attias Buch Outlive' } as L, href: 'de:/blog/2023/8/16/peter-attias-buch-outlive-alle-tests-amp-blutmarker' },
          { label: { de: 'Biggest weakness or biggest strength?', en: 'Biggest weakness or biggest strength?' } as L, href: 'en:/blog/weak-strength' },
        ],
      },
    ],
  },
}

/** Small interface texts */
export const UI = {
  de: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Schließen',
    home: 'Martin Ferfers – Startseite',
    switchTo: 'English',
    switchShort: 'EN',
    switchLabel: 'Diese Seite auf Englisch',
    backToTop: 'Nach oben',
    impressum: 'Impressum',
    readMore: 'Weiterlesen',
    backToBlog: '← Zurück zum Blog',
    noPosts: 'Noch keine Beiträge auf Deutsch.',
    otherLangPosts: 'Beiträge auf Englisch',
    inOtherLang: 'auf Englisch',
    translationAvailable: 'Diesen Beitrag gibt es auch auf Englisch',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundText: 'Diese Seite gibt es nicht (mehr).',
    notFoundCta: 'Zur Startseite',
    form: {
      name: 'Name',
      firstName: 'Vorname (optional)',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'deine@email.de',
      message: 'Nachricht',
      send: 'Senden',
      sending: 'Wird gesendet …',
      subscribe: 'Anmelden',
      subscribing: 'Einen Moment …',
      subscribed: 'Fast geschafft! Bitte bestätige Deine Anmeldung über den Link in der E-Mail, die ich Dir gerade geschickt habe.',
      subscribeError: 'Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal.',
      note: 'Kostenlos, einmal im Monat, von einem Menschen aka mir geschrieben :)',
    },
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    home: 'Martin Ferfers – Home',
    switchTo: 'Deutsch',
    switchShort: 'DE',
    switchLabel: 'This page in German',
    backToTop: 'Back to Top',
    impressum: 'Imprint',
    readMore: 'Read More',
    backToBlog: '← Back to Blog',
    noPosts: 'No posts in English yet.',
    otherLangPosts: 'Posts in German',
    inOtherLang: 'in German',
    translationAvailable: 'This post is also available in German',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page does not exist (anymore).',
    notFoundCta: 'Go to the homepage',
    form: {
      name: 'Name',
      firstName: 'First name (optional)',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      send: 'Send',
      sending: 'Sending…',
      subscribe: 'Sign Up',
      subscribing: 'One moment…',
      subscribed: 'Almost there! Please confirm your subscription via the link in the email I just sent you.',
      subscribeError: 'That did not work. Please try again in a moment.',
      note: 'Free, once a month, written by a real person – aka me :)',
    },
  },
} satisfies L<unknown>

export type UIText = (typeof UI)['de']

export const HOME: L<{
  hero: { lines: string[] }
  blocks: { text: string; form?: boolean }[]
}> = {
  de: {
    hero: { lines: ['Hi, ich bin Martin Ferfers.', 'Schön, dass Du da bist.'] },
    blocks: [
      {
        text: `Ich habe [mehrere Internet-Start-ups gegründet](/projects) und bei unterschiedlichen Innovationsberatungen gearbeitet. Derzeit helfe ich Unternehmern, die Potenziale von KI besser zu nutzen. [An einem kostenlosen KI-Audit interessiert?](${AUDIT.de})`,
      },
      {
        text: 'Noch bevor meine zwei Kinder geboren wurden, habe ich ein Kinderbuch geschrieben, illustriert und veröffentlicht. [Träum schön, Siggi Sternenschläfer](http://www.siggi-sternenschlaefer.de) heißt es.',
      },
      {
        text: 'Ich schreibe, zeichne, filme Comedy. Mein Kindheitstraum war, der Nachfolger von Loriot zu werden. Vielleicht werde ich aber auch einfach [DerMartin.de](https://www.dermartin.de) :)',
      },
      {
        text: 'Ich begeistere mich für viele Dinge und teile inspirierende und praktische Gedanken in meinem [Blog](/blog) und einem monatlichen [Newsletter](/newsletter).',
      },
      {
        text: 'Was erwartet Dich im Newsletter? „Random good stuff to excite, inspire, and entertain you.“ Genauer: Praktische Tipps zum Umgang mit KI, Leben, Business, Gesundheit und Geldanlagen; die interessantesten Bücher, Videos, Artikel und Produkte; Updates zu meinen Projekten und was mich sonst gerade fasziniert. Hier kannst Du Dich für meinen „Inspiration Newsletter“ anmelden:',
        form: true,
      },
    ],
  },
  en: {
    hero: { lines: ['Hi, I’m Martin Ferfers.', 'Great to have you here!'] },
    blocks: [
      {
        text: `I’ve [founded several internet startups](/projects) and worked at various innovation consulting firms. Currently, I help entrepreneurs make better use of AI’s potential. [Interested in a free AI audit?](${AUDIT.en})`,
      },
      {
        text: 'Even before my two kids were born, I wrote, illustrated, and published a children’s book. It’s called [“Träum schön, Siggi Sternenschläfer”](http://www.siggi-sternenschlaefer.de) (I printed some English versions too: Sweet Dreams, Ziggy Starsleeper).',
      },
      {
        text: 'I write, draw, and film comedy. My childhood dream was to become Loriot’s successor. But maybe I’ll just become [DerMartin.de](https://www.dermartin.de) :)',
      },
      {
        text: 'I’m passionate about many things and share inspiring and practical thoughts on my [blog](/blog) and in a monthly [newsletter](/newsletter).',
      },
      {
        text: 'What can you expect from the newsletter? “Random good stuff to excite, inspire, and entertain you.” More specifically: practical tips on AI, life, business, health and investing; the most interesting books, videos, articles and products; updates on my projects and whatever else fascinates me at the moment. You can sign up for my “Inspiration Newsletter” here:',
        form: true,
      },
    ],
  },
}

/** Fixed parts of the newsletter page. The running text and the "about me" paragraph are edited in the CMS (Newsletter-Seite). */
export const NEWSLETTER: L<{ title: string; subline: string; joinHeading: string; confirmed: { heading: string; text: string } }> = {
  de: {
    title: 'Inspiration Newsletter',
    subline: 'Random good stuff to excite, inspire, and entertain you.',
    joinHeading: 'Melde Dich jetzt für meinen Inspiration Newsletter an:',
    confirmed: { heading: 'Danke, Du bist dabei!', text: 'Deine Anmeldung ist bestätigt. Die nächste Ausgabe landet in Deinem Postfach.' },
  },
  en: {
    title: 'Inspiration Newsletter',
    subline: 'Random good stuff to excite, inspire, and entertain you.',
    joinHeading: 'Join my Inspiration Newsletter now:',
    confirmed: { heading: 'Thanks, you’re in!', text: 'Your subscription is confirmed. The next issue will land in your inbox.' },
  },
}

export const ABOUT: L<{
  mission: string[]
  twoWays: { intro: string; ways: string[] }
  projectsLink: string
  remember: { heading: string }
  contactLink: string
  bio: { heading: string[]; items: string[]; now: string }
}> = {
  de: {
    mission: ['Das ist meine Mission:', 'Ideen zum Leben erwecken, die diese Welt', 'zu einem besseren oder zumindest lustigeren Ort machen.'],
    twoWays: { intro: 'Meine Mission lebe ich auf zwei Wegen:', ways: ['Eigene Ideen umsetzen', 'Andere beraten'] },
    projectsLink: 'Meine bisherigen Projekte',
    remember: { heading: 'Und denk dran:' },
    contactLink: 'Schreib mir',
    bio: {
      heading: [
        'Übrigens: Das bin ich – Martin Ferfers.',
        'Ideen-Architekt, Firestarter, Rocketlauncher, Erfinder, INVESTOR, versucht zu inspirieren',
      ],
      items: [
        'Habe noch zu Schulzeiten eine kleine Webdesign-Agentur gegründet.',
        'Habe Kunst/Film/Literatur und European Business studiert – und immer gedacht, ich müsste mich zwischen Entertainment und Unternehmertum entscheiden. Mal sehen …',
        'Nach der Uni und dem Abwägen vieler Ideen habe ich mit einem meiner besten Kumpel, Sebastian Kotzwander, [Grünspar](http://www.gruenspar.de) gegründet und … einen papiersparenden Papierkorb erfunden (steht vermutlich auf den meisten Bucket Lists).',
        'Mein Wunsch, an mehr Ideen zu arbeiten, führte mich zu drei inspirierenden Unternehmen: [Sturm und Drang](http://sturmunddrang.de) (Insight-basierte Innovationen), [Zukunftsinstitut](http://www.zukunftsinstitut.de) (Trend- und Zukunftsforschung) und [supersieben](http://www.supersieben.de) (Unternehmensberatung) – Letztere mit dem Fokus, Marken aufzubauen und Unternehmen auf die durchdachteste Art, die ich mir vorstellen kann, zu mehr Umsatz zu verhelfen.',
        'Danach habe ich mehrere Unternehmen (mit-)gegründet oder von Anfang an begleitet, z. B. [Lykon](https://www.lykon.de), [Thiocyn](https://www.thiocyn.com), [Wowlabs](https://www.wowlabs.de), [#GEILEHAARE](https://www.geile-haare.de).',
        'Heute biete ich mit [Spark Innovation](https://www.spark-innovation.de) KI-Beratung an und mache nebenbei [Comedy](https://www.dermartin.de).',
        'Nebenbei wurde das Investieren in innovative, disruptive neue Bereiche – über Fonds oder direkt – zu etwas zwischen Beruf und Hobby. Besonders bullish bin ich bei Krypto, Gene Editing und Climate Tech.',
        'Ich liebe Ehrlichkeit bei Essen und Menschen. Beide sind meistens großartig. Knapp dahinter auf meiner privaten Leidenschafts-Hitliste: Reisen, Humor, elektronische Musik.',
        'Geboren in Neuss – und stolz drauf.',
      ],
      now: 'Was ich gerade mache (auf Englisch)',
    },
  },
  en: {
    mission: ['This is my mission:', 'Bring ideas to life that make this world', 'a better or at least more fun place to live in.'],
    twoWays: { intro: 'Living up to my mission two ways:', ways: ['Realizing own ideas', 'Consulting others'] },
    projectsLink: 'My projects so far',
    remember: { heading: 'And Remember:' },
    contactLink: 'Get in touch',
    bio: {
      heading: ['Btw: This is me – Martin Ferfers.', 'architect of ideas, Firestarter, Rocketlauncher, inventor, INVESTOR, trying to inspire'],
      items: [
        'Founded a small webdesign agency while still being in school.',
        'Studied arts/film/literature and European Business – and always thought I had to decide between entertainment and entrepreneurship. We´ll see…',
        'After finishing uni and weighing lots of ideas, I co-founded [Grünspar](http://www.gruenspar.de) with one of my best pals Sebastian Kotzwander and… I invented a paper-saving paper bin (probably on most peoples bucket list).',
        'My wish to work on more ideas led me to three inspiring companies: [Sturm und Drang](http://sturmunddrang.de) (insight based innovations) [Zukunftsinstitut](http://www.zukunftsinstitut.de) (trend and future studies) and [supersieben](http://www.supersieben.de) (business consulting) – the latter focusing on building brands and helping companies to sell more in the most thought through way I can think of.',
        'I went on to co-/self-found or support several ventures from their early beginnings, i.e. [Lykon](https://www.lykon.de), [Thiocyn](https://www.thiocyn.com), [Wowlabs](https://www.wowlabs.de), [#GEILEHAARE](https://www.geile-haare.de)',
        'Today I offer AI consulting with [Spark Innovation](https://www.spark-innovation.de) and do [comedy](https://www.dermartin.de) on the side.',
        'Along the way investing in innovative, disruptive new areas via funds or as direct investments became something between occupation and hobby. I am particularly bullish on Crypto, Gene Editing and Climate Tech.',
        'I love honesty in food and people. Both are mostly great. Close runner-ups on my private passion hitlist: travelling, humor, electronic music.',
        'Proud Kraut: I was born in Neuss, Germany.',
      ],
      now: 'This is what I am doing now',
    },
  },
}

export type Spark = { title: L; role?: L; logo: string; alt: string; href?: string }
export type SparkGroup = { name: L; era: L; items: Spark[] }

const r = (de: string, en: string): L => ({ de, en })

export const SPARKS: SparkGroup[] = [
  {
    name: r('Problemlösungen', 'Problem Solutions'),
    era: r('seit 2026', 'since 2026'),
    items: [
      { title: r('AUTOMATISIERTE WERTPAPIERBUCHHALTUNG', 'AUTOMATED SECURITIES BOOKKEEPING'), role: r('Eigene Idee . Gründer', 'Own Idea . Founder'), logo: 'wertstapel.svg', alt: 'Wertstapel', href: 'https://www.wertstapel.de' },
    ],
  },
  {
    name: r('Zwischenmenschliches', 'Human Connection'),
    era: r('seit 2015', 'since 2015'),
    items: [
      { title: r('GLITZER-POSTSERVICE', 'GLITTER POST SERVICE'), role: r('Gründer . 2015 verkauft', 'Founder . Sold 2015'), logo: 'nervmitglitzer', alt: 'nervmitglitzer.de', href: 'http://www.nervmitglitzer.de' },
      { title: r('kommt irgendwann', 'coming sometime'), logo: 'coming-sometime-heart', alt: 'Coming sometime' },
      { title: r('SIGGI STERNENSCHLÄFER', 'SIGGI STERNENSCHLÄFER'), role: r('Kinderbuch . Autor, Illustrator', 'Children´s book . Author, Illustrator'), logo: 'siggi-sternenschlaefer', alt: 'Siggi Sternenschläfer', href: 'http://www.siggi-sternenschlaefer.de' },
      { title: r('TELEDRINKINGBAR.COM', 'TELEDRINKINGBAR.COM'), role: r('Gründer', 'Founder'), logo: 'teledrinkingbar', alt: 'teledrinkingbar.com', href: 'https://www.teledrinkingbar.com' },
      { title: r('kommt irgendwann', 'coming sometime'), logo: 'urock', alt: 'UROCK' },
      { title: r('FRUCHTAUFSTRICH FÜR DEN GUTEN ZWECK', 'FRUIT SPREAD FOR A CAUSE'), role: r('Eigene Idee . Gründer . 2021 eingestellt', 'Own Idea . Founder . Stopped 2021'), logo: 'spread-love', alt: 'Spread Love' },
    ],
  },
  {
    name: r('Gesundheit & Pflege', 'Health & Care'),
    era: r('seit 2012', 'since 2012'),
    items: [
      { title: r('SELBSTBESTIMMTE GESUNDHEIT', 'SELF-DETERMINED HEALTH'), role: r('Beratung / Gesellschafter', 'Consulting / Shareholder'), logo: 'lykon', alt: 'Lykon', href: 'http://www.lykon.de' },
      { title: r('HAUTKREBS-PRÄVENTION', 'SKIN CANCER PREVENTION'), role: r('Ideenentwicklung . Beratung', 'Idea Creation . Consulting'), logo: 'schatten-shirt-sonnencreme', alt: 'Schatten, Shirt & Sonnencreme', href: 'http://www.schatten-shirt-sonnencreme.de' },
      { title: r('MITTEL GEGEN HAARAUSFALL', 'ANTI-HAIRLOSS REMEDY'), role: r('Mitgründer . 2024 verkauft', 'Co-Founder . Sold 2024'), logo: 'thiocyn', alt: 'Thiocyn Haar Serum', href: 'http://www.thiocyn-haarserum.de' },
      { title: r('REVOLUTION DER WUNDHEILUNG', 'WOUND-HEALING REVOLUTION'), role: r('Beratung / Gesellschafter', 'Consulting / Shareholder'), logo: 'granulox', alt: 'Granulox', href: 'http://www.granulox.de' },
      { title: r('INNOVATIVES MITTEL GEGEN EKZEME & JUCKREIZ', 'INNOVATIVE ECZEMA & ITCHING REMEDY'), role: r('Mitgründer . 2024 verkauft', 'Co-Founder . Sold 2024'), logo: 'noreiz', alt: 'noreiz', href: 'http://www.noreiz.de' },
      { title: r('LÖSUNGEN FÜR PROBLEMHAAR', 'SOLUTIONS FOR PROBLEMATIC HAIR'), role: r('Eigene Idee . Gründer', 'Own-Idea . Founder'), logo: 'geilehaare', alt: '#GEILEHAARE' },
      { title: r('LUXUS-HAUTPFLEGE', 'LUXURY SKINCARE'), role: r('Mitgründer . Management-Buy-out 2022', 'Co-Founder . Management Buyout 2022'), logo: 'wowlabs', alt: 'Wowlabs', href: 'https://www.wowlabs.de' },
      { title: r('HEALTHTECH-VC', 'HEALTHTECH VC'), role: r('Co-Investor', 'Co-Investor'), logo: 'heartbeat-labs', alt: 'HeartBeat Labs', href: 'https://www.heartbeatlabs.com' },
    ],
  },
  {
    name: r('Nachhaltigkeit', 'Sustainability'),
    era: r('2008–2015', '2008-2015'),
    items: [
      { title: r('GRÜNE SMARTE LÖSUNGEN', 'GREEN SMART SOLUTIONS'), role: r('Eigene Idee . Mitgründer . 2015 verkauft', 'Own Idea . Co-Founder . Sold 2015'), logo: 'gruenspar', alt: 'Grünspar' },
      { title: r('PAPIERSPARENDER PAPIERKORB', 'PAPER-SAVING PAPER BIN'), role: r('Eigene Idee . Erfinder', 'Own Idea . Inventor'), logo: 'gruenspar-pak', alt: 'Grünspar PAK' },
    ],
  },
  {
    name: r('Weitere Investments', 'Other investments'),
    era: r('seit 2015', 'since 2015'),
    items: [
      { title: r('FINTECH-COMPANY-BUILDER', 'FINTECH COMPANY BUILDER'), role: r('Co-Investor', 'Co-Investor'), logo: 'finleap', alt: 'finleap' },
      { title: r('IMMOBILIEN-PROJEKTENTWICKLUNG', 'REAL ESTATE DEVELOPMENT'), role: r('Mitgründer . Co-Investor', 'Co-Founder . Co-Investor'), logo: 'menge', alt: 'Menge Baumanagement Projektentwicklung', href: 'https://www.menge-bm.de/menge-bau-development' },
      { title: r('DIGITAL-ASSETS-FONDS', 'DIGITAL ASSETS FUND'), role: r('Investor', 'Investor'), logo: 'q21-capital', alt: 'Q21 Capital', href: 'https://q21.capital' },
      { title: r('DIGITAL-ASSETS-FONDS', 'DIGITAL ASSET FUND'), role: r('Investor', 'Investor'), logo: 'sigil-fund', alt: 'sigil.fund', href: 'https://www.sigilfund.com' },
    ],
  },
]

export const PROJECTS_PAGE: L<{ title: string }> = { de: { title: 'Projekte' }, en: { title: 'Projects' } }

export const BLOG: { image: string; lines: L<string[]> } = {
  image: '/images/photos/girl-with-icecream.webp',
  lines: { de: ['Denkfutter', 'zu Leben & Business'], en: ['Food for Thought', 'on life & Business'] },
}

export const CONTACT: { image: string } & L<{
  title: string
  greeting: string
  list: { heading: string; text: string }
  message: { heading: string; text: string }
}> = {
  image: '/images/photos/funkenflug.webp',
  de: {
    title: 'Kontakt',
    greeting: 'Hallo!',
    list: { heading: 'Bleib in Kontakt', text: 'Mein Inspiration Newsletter: „Random good stuff to excite, inspire, and entertain you.“' },
    message: {
      heading: 'Schreib mir',
      text: 'Ich komme immer gern mit interessanten, inspirierenden Menschen in Kontakt. Schick mir einfach eine Nachricht.',
    },
  },
  en: {
    title: 'Contact',
    greeting: 'Hi there!',
    list: { heading: 'Stay in Touch', text: 'My Inspiration Newsletter: “Random good stuff to excite, inspire, and entertain you.”' },
    message: {
      heading: 'Drop me a line',
      text: 'I always like to get in touch with thoughtful, interesting, inspiring people. Just send me a message.',
    },
  },
}

export const IMPRESSUM = {
  heading: 'Herausgeber und Verantwortlicher für den Inhalt des Online-Angebotes:',
  address: ['Martin Ferfers', 'Spark Ventures GmbH', 'Prof. Schwippert Str. 15', '40591 Düsseldorf'],
  credits: 'Image credits: Balloon-Image@Home - Naoya Fuji • Spark-Image@Contacts - [Daniel Dionne](https://www.flickr.com/photos/mrzeon/4457645467/)',
}

export const t = <T,>(value: L<T>, lang: Lang): T => value[lang]
