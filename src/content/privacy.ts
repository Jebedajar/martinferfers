import type { L } from '@/lib/i18n'

/**
 * Datenschutzerklärung / Privacy Policy (DE + EN).
 * Paragraphs may contain [label](url) links; "\n" starts a new line.
 * Keep in sync with the services the site actually uses (Cloudflare, Kit, dogado forwarding).
 */
export type PrivacySection = { heading: string; paragraphs: string[] }

export const PRIVACY: L<{ title: string; intro: string; updated: string; sections: PrivacySection[] }> = {
  de: {
    title: 'Datenschutzerklärung',
    intro:
      'Diese Erklärung informiert darüber, welche personenbezogenen Daten beim Besuch von martinferfers.de verarbeitet werden, wofür und auf welcher Rechtsgrundlage.',
    updated: 'Stand: November 2026',
    sections: [
      {
        heading: '1. Verantwortlicher',
        paragraphs: [
          'Martin Ferfers\nLenneper Str. 32\n40591 Düsseldorf, Deutschland\nE-Mail: [martin@martinferfers.de](mailto:martin@martinferfers.de)',
          'Einen Datenschutzbeauftragten gibt es nicht; eine Pflicht zur Benennung besteht nicht.',
        ],
      },
      {
        heading: '2. Hosting und Auslieferung der Website',
        paragraphs: [
          'Die Website läuft bei Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA („Cloudflare“). Cloudflare stellt die Server (Cloudflare Workers), die Datenbank für Inhalte und Formulareingaben (D1), den Speicher für Bilder (R2) sowie DNS und Netzwerk bereit. Beim Aufruf jeder Seite verarbeitet Cloudflare technisch notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite, Referrer, Browser und Betriebssystem. Diese Daten dienen dazu, die Website auszuliefern, stabil zu betreiben und vor Angriffen zu schützen.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt in einer sicheren und schnellen Bereitstellung der Website. Mit Cloudflare besteht ein Auftragsverarbeitungsvertrag. Daten können in die USA übermittelt werden; Cloudflare ist unter dem EU-U.S. Data Privacy Framework zertifiziert (Art. 45 DSGVO).',
        ],
      },
      {
        heading: '3. Cookies und Reichweitenmessung',
        paragraphs: [
          'Die Website setzt für Besucher keine Cookies und nutzt kein Tracking und keine Reichweitenmessung. Schriftarten werden vom eigenen Server geladen, nicht von Drittanbietern. Nur beim Login in den Redaktionsbereich (/admin) wird ein technisch notwendiges Sitzungs-Cookie gesetzt (§ 25 Abs. 2 TDDDG); das betrifft ausschließlich mich als Betreiber. Einzige Ausnahme ist die Danke-Seite nach der Newsletter-Anmeldung mit einem eingebetteten YouTube-Video (siehe Abschnitt 6).',
        ],
      },
      {
        heading: '4. Kontaktformular und E-Mail',
        paragraphs: [
          'Wenn Sie das Kontaktformular nutzen, verarbeite ich Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht, um Ihre Anfrage zu beantworten. Die Eingaben werden in der Datenbank der Website (Cloudflare D1) gespeichert. Zusätzlich schickt die Website mir eine Benachrichtigung per E-Mail über den Cloudflare Email Service. Zum Schutz vor Spam enthält das Formular ein verstecktes Feld; dabei werden keine weiteren Daten erhoben.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage auf einen Vertrag zielt, sonst Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Beantwortung von Anfragen). Ich lösche Ihre Nachricht, wenn die Anfrage erledigt ist und keine Aufbewahrungspflichten entgegenstehen.',
          'Sie können mir auch direkt an [martin@martinferfers.de](mailto:martin@martinferfers.de) schreiben. Diese Adresse ist eine Weiterleitung beim Anbieter dogado GmbH, Deutschland; die Mail wird an mein Postfach dort weitergeleitet.',
        ],
      },
      {
        heading: '5. Newsletter mit Kit',
        paragraphs: [
          'Für den „Inspiration Newsletter“ nutze ich Kit, Inc., USA („Kit“). Wenn Sie sich anmelden, übermittelt Ihr Browser Ihre E-Mail-Adresse, optional Ihren Vornamen, Ihre IP-Adresse und den Anmeldezeitpunkt direkt an Kit. Sie erhalten danach eine Bestätigungsmail; erst mit dem Klick auf den Link sind Sie eingetragen (Double-Opt-in). Kit speichert den Zeitpunkt der Anmeldung und Bestätigung, damit ich Ihre Einwilligung nachweisen kann.',
          'Kit misst, ob ein Newsletter geöffnet und welche Links angeklickt werden. Das hilft mir zu sehen, welche Inhalte interessieren. Rechtsgrundlage für Versand und Auswertung ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können sie jederzeit widerrufen, etwa über den Abmeldelink in jeder Ausgabe oder per E-Mail an mich. Nach der Abmeldung lösche ich Ihre Daten bzw. sperre sie, soweit ich die frühere Einwilligung nachweisen muss.',
          'Mit Kit besteht ein Auftragsverarbeitungsvertrag. Kit verarbeitet Daten in den USA. Die Übermittlung stützt sich auf das EU-U.S. Data Privacy Framework (Art. 45 DSGVO) bzw. auf die Standardvertragsklauseln der EU-Kommission, die Teil dieses Vertrags sind (Art. 46 DSGVO).',
        ],
      },
      {
        heading: '6. YouTube-Video auf der Danke-Seite',
        paragraphs: [
          'Nach der Bestätigung der Newsletter-Anmeldung landen Sie auf einer Danke-Seite (/awesome). Sie bettet ein YouTube-Video im erweiterten Datenschutzmodus (youtube-nocookie.com) ein, das automatisch und stumm startet. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Aufruf dieser Seite werden Ihre IP-Adresse und technische Daten Ihres Browsers an Google übermittelt; Google kann zudem Informationen auf Ihrem Gerät speichern. Eine Übermittlung in die USA ist möglich; Google ist nach dem EU-US Data Privacy Framework zertifiziert.',
          'Rechtsgrundlage ist mein berechtigtes Interesse, mich bei neuen Abonnentinnen und Abonnenten auf unterhaltsame Weise zu bedanken (Art. 6 Abs. 1 lit. f DSGVO). Die Seite ist nicht über die Navigation erreichbar und wird von Suchmaschinen nicht indexiert. Weitere Informationen: Datenschutzerklärung von Google (policies.google.com/privacy).',
        ],
      },
      {
        heading: '7. Links zu anderen Websites',
        paragraphs: [
          'Die Website enthält Links zu anderen Websites, etwa zu meinen Projekten. Daten werden erst übermittelt, wenn Sie einen Link anklicken; für diese Seiten ist der jeweilige Anbieter verantwortlich.',
        ],
      },
      {
        heading: '8. Speicherdauer',
        paragraphs: [
          'Ich speichere personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck nötig ist oder gesetzliche Aufbewahrungspflichten es verlangen. Technische Zugriffsdaten speichert Cloudflare nur kurzfristig zum sicheren Betrieb.',
        ],
      },
      {
        heading: '9. Ihre Rechte',
        paragraphs: [
          'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3). Schreiben Sie dazu einfach an [martin@martinferfers.de](mailto:martin@martinferfers.de).',
          'Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).',
        ],
      },
      {
        heading: '10. Änderungen',
        paragraphs: ['Ich passe diese Erklärung an, wenn sich die Website oder die genutzten Dienste ändern.'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    intro:
      'This policy explains which personal data is processed when you visit martinferfers.de, for what purpose and on what legal basis.',
    updated: 'Last updated: November 2026',
    sections: [
      {
        heading: '1. Controller',
        paragraphs: [
          'Martin Ferfers\nLenneper Str. 32\n40591 Düsseldorf, Germany\nEmail: [martin@martinferfers.de](mailto:martin@martinferfers.de)',
          'There is no data protection officer, as none is legally required.',
        ],
      },
      {
        heading: '2. Hosting and delivery of the website',
        paragraphs: [
          'The website runs on Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA (“Cloudflare”). Cloudflare provides the servers (Cloudflare Workers), the database for content and form entries (D1), image storage (R2), DNS and network. Each page request makes Cloudflare process technically necessary data, in particular your IP address, date and time, the page requested, referrer, browser and operating system. This data is used to deliver the website, keep it running and protect it against attacks.',
          'The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is a secure and fast website. A data processing agreement is in place with Cloudflare. Data may be transferred to the USA; Cloudflare is certified under the EU-U.S. Data Privacy Framework (Art. 45 GDPR).',
        ],
      },
      {
        heading: '3. Cookies and analytics',
        paragraphs: [
          'The website sets no cookies for visitors and uses no tracking or analytics. Fonts are served from the site’s own server, not from third parties. Only logging in to the editorial area (/admin) sets a strictly necessary session cookie (Section 25(2) TDDDG); this concerns only me as the operator. The only exception is the thank-you page after the newsletter sign-up, which embeds a YouTube video (see section 6).',
        ],
      },
      {
        heading: '4. Contact form and email',
        paragraphs: [
          'If you use the contact form, I process your name, email address and message in order to reply. The entries are stored in the website’s database (Cloudflare D1). The website also sends me a notification email via Cloudflare Email Service. A hidden field protects the form against spam; no further data is collected for this.',
          'The legal basis is Art. 6(1)(b) GDPR where your request relates to a contract, otherwise Art. 6(1)(f) GDPR (interest in answering enquiries). I delete your message once the request is settled, unless retention obligations apply.',
          'You can also write to [martin@martinferfers.de](mailto:martin@martinferfers.de) directly. This address is a forwarding set up with dogado GmbH, Germany, which forwards mail to my mailbox there.',
        ],
      },
      {
        heading: '5. Newsletter via Kit',
        paragraphs: [
          'The “Inspiration Newsletter” is sent with Kit, Inc., USA (“Kit”). When you sign up, your browser sends your email address, optionally your first name, your IP address and the time of sign-up directly to Kit. You then receive a confirmation email; you are only subscribed once you click its link (double opt-in). Kit stores the time of sign-up and confirmation so that I can prove your consent.',
          'Kit measures whether a newsletter is opened and which links are clicked. This shows me which content readers find interesting. The legal basis for sending and measurement is your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time, for example via the unsubscribe link in every issue or by emailing me. After you unsubscribe I delete your data, or block it where I need to prove your earlier consent.',
          'A data processing agreement is in place with Kit. Kit processes data in the USA. The transfer is based on the EU-U.S. Data Privacy Framework (Art. 45 GDPR) or on the European Commission’s standard contractual clauses included in that agreement (Art. 46 GDPR).',
        ],
      },
      {
        heading: '6. YouTube video on the thank-you page',
        paragraphs: [
          'After confirming your newsletter subscription, you land on a thank-you page (/awesome). It embeds a YouTube video in privacy-enhanced mode (youtube-nocookie.com) that starts automatically and muted. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When this page loads, your IP address and technical browser data are transferred to Google; Google may also store information on your device. A transfer to the USA is possible; Google is certified under the EU-US Data Privacy Framework.',
          'The legal basis is my legitimate interest in thanking new subscribers in an entertaining way (Art. 6(1)(f) GDPR). The page is not linked in the navigation and is not indexed by search engines. More information: Google’s privacy policy (policies.google.com/privacy).',
        ],
      },
      {
        heading: '7. Links to other websites',
        paragraphs: [
          'The website links to other websites, for example my projects. No data is transferred until you click a link; the respective provider is responsible for those sites.',
        ],
      },
      {
        heading: '8. Retention',
        paragraphs: [
          'I keep personal data only as long as needed for the purpose or as required by statutory retention periods. Cloudflare keeps technical access data only briefly for secure operation.',
        ],
      },
      {
        heading: '9. Your rights',
        paragraphs: [
          'You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21). You can withdraw consent at any time with effect for the future (Art. 7(3)). Just write to [martin@martinferfers.de](mailto:martin@martinferfers.de).',
          'You may also lodge a complaint with a data protection supervisory authority, for example the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (LDI NRW).',
        ],
      },
      {
        heading: '10. Changes',
        paragraphs: ['I update this policy when the website or the services it uses change.'],
      },
    ],
  },
}
