export type Locale = "de" | "en";

export interface Translations {
  nav: {
    home: string;
    services: string;
    pricing: string;
    gallery: string;
    about: string;
    contact: string;
    bookAppointment: string;
    skipToContent: string;
    closeMenu: string;
    openMenu: string;
    language: string;
  };
  header: {
    topAnnouncement: string;
    topAnnouncementShort: string;
    topAnnouncementCta: string;
  };
  footer: {
    brandDescription: string;
    followInstagram: string;
    colTreatments: string;
    colHours: string;
    colContact: string;
    treatmentsFacials: string;
    pricingConditions: string;
    caseStudiesResults: string;
    galleryBeforeAfter: string;
    aboutPhilosophy: string;
    faq: string;
    bookOnline: string;
    byAppointmentOnly: string;
    vatNotice: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    copyright: string;
    impressum: string;
    privacy: string;
    agb: string;
    revocation: string;
    cookieSettings: string;
    admin: string;
    languageTitle: string;
    bookAppointmentBtn: string;
  };
  days: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    closed: string;
    oclock: string;
  };
  stickyMobile: {
    call: string;
    whatsapp: string;
    book: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    bodyText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollDown: string;
  };
  intro: {
    eyebrow: string;
    title: string;
  };
  signature: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    bookNow: string;
    durationMinutes: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewCategory: string;
    servicesCount: string;
  };
  caseStudies: {
    eyebrow: string;
    title: string;
    subtitle: string;
    before: string;
    after: string;
    treatmentLabel: string;
    durationLabel: string;
    resultLabel: string;
    bookSimilar: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    viewDetails: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pangv: string;
    onRequest: string;
    duration: string;
    book: string;
    viewFullPricing: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bookWithMurvet: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stillQuestions: string;
    contactCta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    openMaps: string;
    sendMessage: string;
    name: string;
    emailAddress: string;
    phoneOptional: string;
    subject: string;
    message: string;
    privacyConsent: string;
    sendBtn: string;
    sendingBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
  };
  appointment: {
    eyebrow: string;
    title: string;
    subtitle: string;
    infoConfirmTitle: string;
    infoConfirmDesc: string;
    infoArrivalTitle: string;
    infoArrivalDesc: string;
    infoPrivacyTitle: string;
    infoPrivacyDesc: string;
    step1: string;
    selectTreatment: string;
    step2: string;
    preferredDate: string;
    preferredTime: string;
    timeMorning: string;
    timeNoon: string;
    timeAfternoon: string;
    altDate: string;
    step3: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    notesPlaceholder: string;
    privacyConsent: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
  };
  thankYou: {
    eyebrow: string;
    titleTermin: string;
    titleContact: string;
    descTermin: string;
    descContact: string;
    nextStepsTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    urgencyNotice: string;
    whatsappDirect: string;
    callDirect: string;
    backHome: string;
    viewGallery: string;
  };
  cookie: {
    badge: string;
    title: string;
    desc: string;
    btnAcceptAll: string;
    btnEssentialOnly: string;
    btnCustomize: string;
    btnSave: string;
    btnBack: string;
    categoryNecessary: string;
    categoryNecessaryDesc: string;
    categoryAnalytics: string;
    categoryAnalyticsDesc: string;
    categoryMarketing: string;
    categoryMarketingDesc: string;
    categoryPreferences: string;
    categoryPreferencesDesc: string;
    alwaysActive: string;
    active: string;
    inactive: string;
    learnMorePrivacy: string;
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categoryLabel: string;
    durationPrefix: string;
    durationMinutes: string;
    bookService: string;
    compareTitle: string;
    compareDesc: string;
    toPricingBtn: string;
    bookAppointmentBtn: string;
  };
  pricingPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pangvBadge: string;
    categoryLabel: string;
    durationLabel: string;
    bookBtn: string;
    pangvLegal: string;
    agbLink: string;
    questionsTitle: string;
    questionsSubtitle: string;
    contactBtn: string;
    bookAppointmentBtn: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    studioTitle: string;
    addressLabel: string;
    openInMaps: string;
    phoneLabel: string;
    whatsappLabel: string;
    whatsappChat: string;
    emailLabel: string;
    instagramLabel: string;
    openingHoursTitle: string;
    closed: string;
    oclock: string;
    formEyebrow: string;
    formTitle: string;
    formSubtitle: string;
    mapEyebrow: string;
    mapTitle: string;
    planRoute: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    founderEyebrow: string;
    defaultHeadline: string;
    defaultBody1: string;
    defaultBody2: string;
    founderRole: string;
    valuesTitle: string;
    valuesSubtitle: string;
    val1Title: string;
    val1Desc: string;
    val2Title: string;
    val2Desc: string;
    val3Title: string;
    val3Desc: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaContact: string;
    ctaBook: string;
  };
  galleryPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categoryAll: string;
    categoryWimpern: string;
    categoryFacials: string;
    categoryPmu: string;
    openDetail: string;
    openLarge: string;
    closeEscape: string;
    bookTreatment: string;
  };
}

export const translations: Record<Locale, Translations> = {
  de: {
    nav: {
      home: "Startseite",
      services: "Behandlungen",
      pricing: "Preise",
      gallery: "Galerie",
      about: "Über uns",
      contact: "Kontakt",
      bookAppointment: "Termin anfragen",
      skipToContent: "Zum Hauptinhalt springen",
      closeMenu: "Menü schließen",
      openMenu: "Menü öffnen",
      language: "Sprache",
    },
    header: {
      topAnnouncement: "Ernst-Moritz-Arndt-Straße 13, Peine • Exklusive Beauty & Aesthetics",
      topAnnouncementShort: "Aura Glow Peine",
      topAnnouncementCta: "Termine nach Vereinbarung • Jetzt anfragen",
    },
    footer: {
      brandDescription:
        "Exklusives Beauty & Aesthetics Studio in Peine. Meisterhafte Behandlungen für natürliche Schönheit, strahlenden Glow und vollendete Symmetrie in der Ernst-Moritz-Arndt-Straße 13.",
      followInstagram: "Instagram folgen",
      colTreatments: "Behandlungen & Studio",
      colHours: "Öffnungszeiten",
      colContact: "Studio & Kontakt",
      treatmentsFacials: "Behandlungen & Facials",
      pricingConditions: "Preise & Konditionen",
      caseStudiesResults: "Fallstudien & Ergebnisse",
      galleryBeforeAfter: "Vorher-Nachher Galerie",
      aboutPhilosophy: "Über Mürvet & Philosophie",
      faq: "Häufige Fragen (FAQ)",
      bookOnline: "Termin online anfragen",
      byAppointmentOnly: "Termine ausschließlich nach vorheriger Vereinbarung.",
      vatNotice: "* Alle Preise verstehen sich in Euro (€) inklusive der gesetzlichen Mehrwertsteuer (Preisangabenverordnung).",
      addressLabel: "Adresse",
      phoneLabel: "Telefon",
      emailLabel: "E-Mail",
      copyright: "Alle Rechte vorbehalten.",
      impressum: "Impressum (§ 5 DDG)",
      privacy: "Datenschutz (DSGVO)",
      agb: "AGB & Stornierung",
      revocation: "Widerrufsbelehrung",
      cookieSettings: "Cookie-Einstellungen",
      admin: "Admin",
      languageTitle: "Sprache",
      bookAppointmentBtn: "Termin anfragen",
    },
    days: {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
      closed: "Geschlossen",
      oclock: "Uhr",
    },
    stickyMobile: {
      call: "Anrufen",
      whatsapp: "WhatsApp",
      book: "Termin",
    },
    hero: {
      eyebrow: "Beauty & Aesthetics by Mürvet",
      headline: "Deine Schönheit.\nUnser Anspruch.",
      bodyText: "Entdecke individuelle Beauty-Behandlungen für deine natürliche Schönheit und ein strahlendes Selbstbewusstsein.",
      ctaPrimary: "Termin anfragen",
      ctaSecondary: "Behandlungen entdecken",
      scrollDown: "Nach unten scrollen",
    },
    intro: {
      eyebrow: "Willkommen bei Aura Glow",
      title: "Wo Ästhetik auf Perfektion trifft.",
    },
    signature: {
      eyebrow: "Handverlesene Highlights",
      title: "Signature Behandlungen",
      subtitle: "Unsere beliebtesten Behandlungen für deinen vollendeten Glow.",
      viewAll: "Alle Behandlungen ansehen",
      bookNow: "Termin anfragen",
      durationMinutes: "Minuten",
    },
    categories: {
      eyebrow: "Vielfalt & Expertise",
      title: "Unsere Behandlungswelten",
      subtitle: "Von feinsten Wimpern bis zu ganzheitlichen Facials — wähle deinen Bereich.",
      viewCategory: "Bereich entdecken",
      servicesCount: "Behandlungen",
    },
    caseStudies: {
      eyebrow: "Verwandlungen & Präzision",
      title: "Vorher & Nachher Fallstudien",
      subtitle: "Echte Kundinnen, sichtbare Ergebnisse und meisterhaftes Handwerk.",
      before: "Vorher",
      after: "Nachher",
      treatmentLabel: "Behandlung",
      durationLabel: "Dauer",
      resultLabel: "Ergebnis",
      bookSimilar: "Ähnliche Behandlung anfragen",
    },
    gallery: {
      eyebrow: "Impressionen",
      title: "Galerie & Studioeinblicke",
      subtitle: "Echte Resultate, feinste Linien und die beruhigende Ästhetik unseres Studios in Peine.",
      all: "Alle",
      viewDetails: "Vergrößern",
    },
    pricing: {
      eyebrow: "Transparenz",
      title: "Preise & Konditionen",
      subtitle: "Exklusive Behandlungen, transparente Preise und meisterhafte Handwerkskunst ohne versteckte Kosten.",
      pangv: "✓ Alle angegebenen Preise verstehen sich in Euro (€) inklusive der gesetzlichen Mehrwertsteuer (gemäß PAngV).",
      onRequest: "Auf Anfrage",
      duration: "Dauer",
      book: "Buchen",
      viewFullPricing: "Vollständige Preisliste ansehen",
    },
    about: {
      eyebrow: "Aura Glow Philosophie",
      title: "Schönheit als Ausdruck deiner Persönlichkeit.",
      subtitle: "In einer schnelllebigen Welt schaffen wir einen Ort der Ruhe, an dem deine natürliche Ausstrahlung im Mittelpunkt steht.",
      bookWithMurvet: "Termin bei Mürvet buchen",
    },
    faq: {
      eyebrow: "Wissenswertes",
      title: "Häufig gestellte Fragen",
      subtitle: "Alles, was du vor deinem ersten Besuch wissen solltest.",
      stillQuestions: "Noch Fragen offen?",
      contactCta: "Kontaktiere uns direkt",
    },
    contact: {
      eyebrow: "Persönlich für dich da",
      title: "Kontakt & Standort",
      subtitle: "Hast du Fragen zu unseren Behandlungen oder möchtest du dich vorab beraten lassen? Schreib uns gerne eine Nachricht.",
      address: "Adresse:",
      phone: "Telefon:",
      email: "E-Mail:",
      openMaps: "In Google Maps öffnen",
      sendMessage: "Schreib uns eine Nachricht",
      name: "Dein Name",
      emailAddress: "Deine E-Mail-Adresse",
      phoneOptional: "Telefonnummer (optional)",
      subject: "Betreff",
      message: "Deine Nachricht",
      privacyConsent: "Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für eventuelle Rückfragen verarbeitet werden. (Datenschutzerklärung)",
      sendBtn: "Nachricht senden",
      sendingBtn: "Wird gesendet...",
      successTitle: "Vielen Dank für deine Nachricht.",
      successDesc: "Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich persönlich bei dir zurück.",
      sendAnother: "Weitere Nachricht senden",
    },
    appointment: {
      eyebrow: "Auszeit buchen",
      title: "Terminanfrage",
      subtitle: "Wähle deine bevorzugte Behandlung und teile uns deine Terminwünsche mit. Wir melden uns umgehend persönlich bei dir.",
      infoConfirmTitle: "Verbindliche Bestätigung",
      infoConfirmDesc: "Deine Online-Anfrage ist zunächst unverbindlich. Nach Eingang prüfen wir den Studio-Kalender und bestätigen dir den Termin persönlich per WhatsApp, SMS oder Telefon.",
      infoArrivalTitle: "Rechtzeitiges Erscheinen",
      infoArrivalDesc: "Um deine Behandlung voll auszukosten und eine entspannte Vorbereitung zu gewährleisten, bitten wir dich, etwa 5 Minuten vor deinem vereinbarten Termin da zu sein.",
      infoPrivacyTitle: "Datenschutz & Diskretion",
      infoPrivacyDesc: "Deine Kontaktdaten werden vertraulich behandelt und ausschließlich zur Terminabwicklung genutzt.",
      step1: "1. Behandlung wählen",
      selectTreatment: "Gewünschte Behandlung",
      step2: "2. Wunschtermin & Zeit",
      preferredDate: "Wunschdatum",
      preferredTime: "Bevorzugte Tageszeit",
      timeMorning: "Vormittags (09:00 - 13:00)",
      timeNoon: "Mittags (13:00 - 16:00)",
      timeAfternoon: "Nachmittags / Abends (16:00 - 19:00)",
      altDate: "Alternatives Datum (optional)",
      step3: "3. Deine Kontaktdaten",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      phone: "Telefon / Mobil (für Bestätigung)",
      notes: "Besondere Wünsche oder Anmerkungen (optional)",
      notesPlaceholder: "z.B. Allergien, Vorerfahrungen oder bestimmte Fragen...",
      privacyConsent: "Ich habe die Datenschutzerklärung zur Kenntnis genommen und willige in die Verarbeitung meiner Daten zur Terminabstimmung ein.",
      submitBtn: "Terminanfrage unverbindlich senden",
      submittingBtn: "Wird übermittelt...",
      successTitle: "Vielen Dank für deine Anfrage.",
      successDesc: "Wir haben deine Terminanfrage erfolgreich erhalten. Wir prüfen die Studioverfügbarkeit und melden uns schnellstmöglich persönlich bei dir zur Bestätigung.",
    },
    thankYou: {
      eyebrow: "Erfolgreich übermittelt",
      titleTermin: "Vielen Dank für deine Terminanfrage!",
      titleContact: "Vielen Dank für deine Nachricht!",
      descTermin: "Wir haben deine Terminanfrage erhalten. Mürvet prüft den Studio-Kalender und meldet sich schnellstmöglich persönlich zur verbindlichen Abstimmung bei dir.",
      descContact: "Deine Nachricht ist sicher bei uns eingegangen. Wir werden uns innerhalb kurzer Zeit persönlich mit dir in Verbindung setzen.",
      nextStepsTitle: "So geht es jetzt weiter:",
      step1Title: "Anfrage geprüft",
      step1Desc: "Deine Daten und Terminwünsche liegen direkt in unserem Studio-System vor.",
      step2Title: "Persönliche Rückmeldung",
      step2Desc: "Wir kontaktieren dich per WhatsApp, SMS oder Telefon mit einer verbindlichen Terminbestätigung.",
      step3Title: "Deine Wohlfühlzeit",
      step3Desc: "Freue dich auf eine exklusive, individuelle Behandlung in unserem Studio in Peine.",
      urgencyNotice: "Eilige Anfrage oder Fragen vorab?",
      whatsappDirect: "Per WhatsApp schreiben",
      callDirect: "Direkt anrufen",
      backHome: "Zurück zur Startseite",
      viewGallery: "Vorher-Nachher Galerie ansehen",
    },
    cookie: {
      badge: "Datenschutz & Cookies",
      title: "Wir respektieren deine Privatsphäre",
      desc: "Wir verwenden Cookies und moderne Technologien, um dir ein optimales und sicheres Website-Erlebnis zu bieten. Mit Klick auf 'Alle akzeptieren' stimmst du der Verwendung aller Dienste (wie Google Analytics, Google Tag Manager & Google Ads Conversion Tracking) zu. Du kannst deine Einstellungen jederzeit anpassen oder widerrufen.",
      btnAcceptAll: "Alle akzeptieren",
      btnEssentialOnly: "Nur essenzielle",
      btnCustomize: "Einstellungen",
      btnSave: "Auswahl speichern",
      btnBack: "Zurück zur Übersicht",
      categoryNecessary: "Technisch notwendig (Essenziell)",
      categoryNecessaryDesc: "Diese Cookies sind für die Kernfunktionen der Website (wie Seitennavigation, Formularsicherheit und Consent-Speicherung) zwingend erforderlich und können nicht deaktiviert werden.",
      categoryAnalytics: "Analyse & Performance",
      categoryAnalyticsDesc: "Ermöglicht uns, die Nutzung der Website anonymisiert zu messen (Google Analytics 4), um Ladezeiten und Inhalte kontinuierlich für dich zu optimieren.",
      categoryMarketing: "Marketing & Conversions",
      categoryMarketingDesc: "Hilft uns, den Erfolg unserer Werbekampagnen (Google Ads & Conversion-Messung) zu erfassen und dir relevante Angebote anzuzeigen.",
      categoryPreferences: "Personalisierung & Komfort",
      categoryPreferencesDesc: "Speichert deine gewählten Spracheinstellungen und individuellen Präferenzen für ein nahtloses Surferlebnis.",
      alwaysActive: "Immer aktiv",
      active: "Aktiv",
      inactive: "Inaktiv",
      learnMorePrivacy: "Mehr Details findest du in unserer Datenschutzerklärung.",
    },
    servicesPage: {
      eyebrow: "Aura Glow Portfolio",
      title: "Behandlungen & Ästhetik",
      subtitle: "Jede Behandlung wird mit meisterhafter Präzision, hochwertigsten Produkten und persönlicher Hingabe auf deine individuellen Gesichtszüge abgestimmt.",
      categoryLabel: "Kategorie",
      durationPrefix: "ca.",
      durationMinutes: "Min.",
      bookService: "Termin für diese Behandlung anfragen",
      compareTitle: "Möchtest du alle Preise auf einen Blick vergleichen?",
      compareDesc: "Unsere transparente Preisübersicht enthält alle Optionen für Neuanlagen, regelmäßige Refills und Kur-Pakete.",
      toPricingBtn: "Zur Preisliste wechseln",
      bookAppointmentBtn: "Wunschtermin anfragen",
    },
    pricingPage: {
      eyebrow: "Transparenz",
      title: "Preise & Konditionen",
      subtitle: "Exklusive Behandlungen, transparente Preise und meisterhafte Handwerkskunst ohne versteckte Kosten.",
      pangvBadge: "✓ Alle angegebenen Preise verstehen sich in Euro (€) inklusive der gesetzlichen Mehrwertsteuer (gemäß PAngV).",
      categoryLabel: "Kategorie",
      durationLabel: "Dauer",
      bookBtn: "Termin",
      pangvLegal: "* Alle ausgewiesenen Preise verstehen sich in Euro (€) inklusive der gesetzlichen Mehrwertsteuer gemäß § 1 Preisangabenverordnung (PAngV). Terminabsagen sind bis zu 24 Stunden vor dem vereinbarten Behandlungsbeginn kostenfrei möglich (Details siehe unsere",
      agbLink: "AGB",
      questionsTitle: "Hast du Fragen zu einer Behandlung?",
      questionsSubtitle: "Gerne beraten wir dich persönlich und unverbindlich vor deiner Behandlung.",
      contactBtn: "Kontakt aufnehmen",
      bookAppointmentBtn: "Wunschtermin anfragen",
    },
    contactPage: {
      eyebrow: "Persönlich für dich da",
      title: "Kontakt & Standort",
      subtitle: "Hast du Fragen zu unseren Behandlungen oder möchtest du dich vorab beraten lassen? Schreib uns gerne eine Nachricht.",
      studioTitle: "Aura Glow Studio",
      addressLabel: "Adresse:",
      openInMaps: "In Google Maps öffnen",
      phoneLabel: "Telefon:",
      whatsappLabel: "WhatsApp:",
      whatsappChat: "Direkt per WhatsApp schreiben →",
      emailLabel: "E-Mail:",
      instagramLabel: "Instagram:",
      openingHoursTitle: "Öffnungszeiten",
      closed: "Geschlossen",
      oclock: "Uhr",
      formEyebrow: "Nachricht schreiben",
      formTitle: "Kontaktiere uns",
      formSubtitle: "Fülle das untenstehende Formular aus. Wir melden uns zeitnah bei dir.",
      mapEyebrow: "Standort & Route",
      mapTitle: "Aura Glow in der Ernst-Moritz-Arndt-Straße 13, Peine",
      planRoute: "Route in Google Maps planen",
    },
    aboutPage: {
      eyebrow: "Aura Glow Philosophie",
      title: "Schönheit als Ausdruck deiner Persönlichkeit.",
      subtitle: "In einer schnelllebigen Welt schaffen wir einen Ort der Ruhe, an dem deine natürliche Ausstrahlung im Mittelpunkt steht.",
      founderEyebrow: "Die Gründerin",
      defaultHeadline: "Leidenschaft für feine Ästhetik und perfekte Linien.",
      defaultBody1: "Mit geschultem Blick für Symmetrie und natürlicher Harmonie widmet sich Mürvet der individuellen Schönheit jeder Kundin. Jede Behandlung wird mit Geduld, meisterhafter Präzision und höchsten Hygienestandards ausgeführt.",
      defaultBody2: "Bei Aura Glow by Mürvet steht nicht der künstliche Trend im Vordergrund, sondern das feinfühlige Hervorheben deiner Vorzüge. Ob ein zarter Mascara-Look durch die 1:1 Wimpernmethode oder ein sanfter Puderverlauf bei den Augenbrauen: Das Ziel ist immer ein frisches, harmonisches Gesamtbild, mit dem du dich jeden Tag selbstsicher fühlst.",
      founderRole: "Gründerin & Master Stylistin",
      valuesTitle: "Unsere Leitwerte",
      valuesSubtitle: "Drei unverrückbare Prinzipien leiten jede einzelne Behandlung.",
      val1Title: "Kompromisslose Hygiene",
      val1Desc: "Sterile Einwegmaterialien, kontinuierliche Desinfektion und höchste Sicherheitsstandards nach deutschen Hygienerichtlinien.",
      val2Title: "Natürliche Harmonie",
      val2Desc: "Keine standardisierten Schablonen. Jedes Wimpern- und Brauen-Styling wird individuell auf deine Gesichtsarchitektur abgestimmt.",
      val3Title: "Ungestörte Auszeit",
      val3Desc: "Keine Parallelbehandlungen oder Hektik. Deine Behandlungszeit gehört ganz dir und deiner Regeneration.",
      ctaTitle: "Möchtest du uns kennenlernen?",
      ctaSubtitle: "Vereinbare deinen ersten Termin oder schreibe uns eine Nachricht.",
      ctaContact: "Kontakt aufnehmen",
      ctaBook: "Termin online anfragen",
    },
    galleryPage: {
      eyebrow: "Impressionen",
      title: "Galerie & Studioeinblicke",
      subtitle: "Echte Resultate, feinste Linien und die beruhigende Ästhetik unseres Studios in Peine.",
      categoryAll: "Alle",
      categoryWimpern: "Wimpern",
      categoryFacials: "Gesichtsreinigung & Pflege",
      categoryPmu: "Permanent Make-up",
      openDetail: "Detailansicht öffnen",
      openLarge: "Grossansicht öffnen",
      closeEscape: "Schließen (Escape)",
      bookTreatment: "Termin für diese Behandlung anfragen",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Treatments",
      pricing: "Pricing",
      gallery: "Gallery",
      about: "About Us",
      contact: "Contact",
      bookAppointment: "Book Appointment",
      skipToContent: "Skip to main content",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      language: "Language",
    },
    header: {
      topAnnouncement: "Ernst-Moritz-Arndt-Straße 13, Peine • Exclusive Beauty & Aesthetics",
      topAnnouncementShort: "Aura Glow Peine",
      topAnnouncementCta: "Appointments by reservation • Inquire now",
    },
    footer: {
      brandDescription:
        "Exclusive Beauty & Aesthetics Studio in Peine. Masterful treatments for natural beauty, radiant glow, and perfect symmetry at Ernst-Moritz-Arndt-Straße 13.",
      followInstagram: "Follow on Instagram",
      colTreatments: "Treatments & Studio",
      colHours: "Opening Hours",
      colContact: "Studio & Contact",
      treatmentsFacials: "Treatments & Facials",
      pricingConditions: "Prices & Conditions",
      caseStudiesResults: "Case Studies & Results",
      galleryBeforeAfter: "Before & After Gallery",
      aboutPhilosophy: "About Mürvet & Philosophy",
      faq: "Frequently Asked Questions (FAQ)",
      bookOnline: "Book appointment online",
      byAppointmentOnly: "Appointments exclusively by prior arrangement.",
      vatNotice: "* All prices in Euro (€) including statutory VAT (Price Indication Ordinance).",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      copyright: "All rights reserved.",
      impressum: "Legal Notice (§ 5 DDG)",
      privacy: "Privacy Policy (GDPR)",
      agb: "Terms & Cancellation",
      revocation: "Right of Revocation",
      cookieSettings: "Cookie Settings",
      admin: "Admin",
      languageTitle: "Language",
      bookAppointmentBtn: "Book Appointment",
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      oclock: "hrs",
    },
    stickyMobile: {
      call: "Call",
      whatsapp: "WhatsApp",
      book: "Book",
    },
    hero: {
      eyebrow: "Beauty & Aesthetics by Mürvet",
      headline: "Your Beauty.\nOur Passion.",
      bodyText: "Discover bespoke beauty treatments tailored to accentuate your natural beauty and boost radiant self-confidence.",
      ctaPrimary: "Book Appointment",
      ctaSecondary: "Explore Treatments",
      scrollDown: "Scroll down",
    },
    intro: {
      eyebrow: "Welcome to Aura Glow",
      title: "Where Aesthetics Meets Perfection.",
    },
    signature: {
      eyebrow: "Handpicked Highlights",
      title: "Signature Treatments",
      subtitle: "Our most coveted treatments for your ultimate radiant glow.",
      viewAll: "View All Treatments",
      bookNow: "Book Appointment",
      durationMinutes: "Minutes",
    },
    categories: {
      eyebrow: "Diversity & Expertise",
      title: "Our Treatment Worlds",
      subtitle: "From precision lash extensions to rejuvenating facials — choose your experience.",
      viewCategory: "Explore Category",
      servicesCount: "Treatments",
    },
    caseStudies: {
      eyebrow: "Transformations & Precision",
      title: "Before & After Case Studies",
      subtitle: "Real clients, visible results, and immaculate craftsmanship.",
      before: "Before",
      after: "After",
      treatmentLabel: "Treatment",
      durationLabel: "Duration",
      resultLabel: "Result",
      bookSimilar: "Inquire Similar Treatment",
    },
    gallery: {
      eyebrow: "Impressions",
      title: "Gallery & Studio Insights",
      subtitle: "Authentic results, delicate precision, and the tranquil ambience of our Peine studio.",
      all: "All",
      viewDetails: "Enlarge",
    },
    pricing: {
      eyebrow: "Transparency",
      title: "Prices & Conditions",
      subtitle: "Exclusive treatments, transparent pricing, and refined artistry with no hidden fees.",
      pangv: "✓ All prices are listed in Euro (€) including statutory VAT (pursuant to German PAngV).",
      onRequest: "Upon Request",
      duration: "Duration",
      book: "Book",
      viewFullPricing: "View Full Price List",
    },
    about: {
      eyebrow: "Aura Glow Philosophy",
      title: "Beauty as an Expression of Your Personality.",
      subtitle: "In a fast-paced world, we provide a serene sanctuary where your natural radiance takes center stage.",
      bookWithMurvet: "Book with Mürvet",
    },
    faq: {
      eyebrow: "Good to Know",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before your appointment.",
      stillQuestions: "Still have questions?",
      contactCta: "Contact Us Directly",
    },
    contact: {
      eyebrow: "Personally Here for You",
      title: "Contact & Location",
      subtitle: "Have questions about our treatments or wish a personal consultation? Send us a message anytime.",
      address: "Address:",
      phone: "Phone:",
      email: "Email:",
      openMaps: "Open in Google Maps",
      sendMessage: "Send us a Message",
      name: "Your Name",
      emailAddress: "Your Email Address",
      phoneOptional: "Phone Number (optional)",
      subject: "Subject",
      message: "Your Message",
      privacyConsent: "I agree that my details may be processed for inquiry and follow-up purposes. (Privacy Policy)",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successTitle: "Thank you for your message.",
      successDesc: "We have received your message and will get back to you personally as soon as possible.",
      sendAnother: "Send another message",
    },
    appointment: {
      eyebrow: "Reserve Your Experience",
      title: "Appointment Inquiry",
      subtitle: "Select your preferred treatment and let us know your preferred dates. We will reach out promptly to confirm.",
      infoConfirmTitle: "Personal Confirmation",
      infoConfirmDesc: "Your online inquiry is initially non-binding. We review our studio schedule and confirm your appointment personally via WhatsApp, SMS, or phone.",
      infoArrivalTitle: "Punctual Arrival",
      infoArrivalDesc: "To ensure a relaxed experience and thorough consultation, please arrive approximately 5 minutes before your scheduled appointment time.",
      infoPrivacyTitle: "Privacy & Discretion",
      infoPrivacyDesc: "Your personal information is handled with strict confidentiality and used exclusively for your appointment coordination.",
      step1: "1. Select Treatment",
      selectTreatment: "Desired Treatment",
      step2: "2. Preferred Date & Time",
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time of Day",
      timeMorning: "Morning (09:00 - 13:00)",
      timeNoon: "Midday (13:00 - 16:00)",
      timeAfternoon: "Afternoon / Evening (16:00 - 19:00)",
      altDate: "Alternative Date (optional)",
      step3: "3. Your Contact Details",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone / Mobile (for confirmation)",
      notes: "Special requests or notes (optional)",
      notesPlaceholder: "e.g. allergies, previous experience, or specific questions...",
      privacyConsent: "I have read the Privacy Policy and consent to the processing of my information for appointment scheduling.",
      submitBtn: "Submit Non-Binding Inquiry",
      submittingBtn: "Submitting...",
      successTitle: "Thank you for your inquiry.",
      successDesc: "We have received your appointment request. We will check studio availability and contact you promptly with confirmation.",
    },
    thankYou: {
      eyebrow: "Successfully Transmitted",
      titleTermin: "Thank you for your appointment inquiry!",
      titleContact: "Thank you for your message!",
      descTermin: "We have received your request. Mürvet is reviewing the studio schedule and will contact you personally for confirmation.",
      descContact: "Your message has been received safely. We will get in touch with you shortly.",
      nextStepsTitle: "What happens next:",
      step1Title: "Inquiry Logged",
      step1Desc: "Your details and desired schedule are directly recorded in our studio management system.",
      step2Title: "Personal Confirmation",
      step2Desc: "We will contact you via WhatsApp, SMS, or phone to finalize and confirm your appointment.",
      step3Title: "Your Glow Session",
      step3Desc: "Look forward to an exclusive, bespoke treatment in our luxury salon in Peine.",
      urgencyNotice: "Urgent question or short-term booking?",
      whatsappDirect: "Message via WhatsApp",
      callDirect: "Call Us Directly",
      backHome: "Back to Homepage",
      viewGallery: "View Before & After Gallery",
    },
    cookie: {
      badge: "Privacy & Cookies",
      title: "We respect your privacy",
      desc: "We use cookies and modern technologies to provide you with an optimal and secure experience. By clicking 'Accept All', you consent to the use of services such as Google Analytics, Google Tag Manager, and Google Ads Conversion Tracking. You can modify or withdraw your consent at any time.",
      btnAcceptAll: "Accept All",
      btnEssentialOnly: "Essential Only",
      btnCustomize: "Preferences",
      btnSave: "Save Preferences",
      btnBack: "Back to Overview",
      categoryNecessary: "Technically Necessary (Essential)",
      categoryNecessaryDesc: "These cookies are strictly required for essential site functions (such as navigation, form security, and consent management) and cannot be deactivated.",
      categoryAnalytics: "Analytics & Performance",
      categoryAnalyticsDesc: "Enables anonymous usage analysis (Google Analytics 4) to continuously optimize site speed and content for you.",
      categoryMarketing: "Marketing & Conversions",
      categoryMarketingDesc: "Helps us assess the performance of our advertising campaigns (Google Ads & conversion tracking) and present relevant offers.",
      categoryPreferences: "Personalization & Comfort",
      categoryPreferencesDesc: "Remembers your language choice and preferences for a tailored, seamless browsing experience.",
      alwaysActive: "Always active",
      active: "Active",
      inactive: "Inactive",
      learnMorePrivacy: "For detailed information, please refer to our Privacy Policy.",
    },
    servicesPage: {
      eyebrow: "Aura Glow Portfolio",
      title: "Treatments & Aesthetics",
      subtitle: "Each treatment is tailored to your unique facial features with masterful precision, premium products, and heartfelt dedication.",
      categoryLabel: "Category",
      durationPrefix: "approx.",
      durationMinutes: "min.",
      bookService: "Request appointment for this treatment",
      compareTitle: "Would you like to compare all prices at a glance?",
      compareDesc: "Our transparent price guide features all options for full sets, regular refills, and multi-session cure packages.",
      toPricingBtn: "Switch to Price List",
      bookAppointmentBtn: "Request Desired Appointment",
    },
    pricingPage: {
      eyebrow: "Transparency",
      title: "Prices & Conditions",
      subtitle: "Exclusive treatments, transparent pricing, and refined artistry without hidden costs.",
      pangvBadge: "✓ All prices are listed in Euro (€) inclusive of statutory VAT (pursuant to German PAngV).",
      categoryLabel: "Category",
      durationLabel: "Duration",
      bookBtn: "Book",
      pangvLegal: "* All stated prices are in Euro (€) including statutory VAT according to § 1 German Price Indication Ordinance (PAngV). Appointments may be cancelled free of charge up to 24 hours prior to treatment start (for details see our",
      agbLink: "Terms & Conditions",
      questionsTitle: "Have questions about a treatment?",
      questionsSubtitle: "We are delighted to provide personal, no-obligation advice before your appointment.",
      contactBtn: "Get in Touch",
      bookAppointmentBtn: "Request Appointment",
    },
    contactPage: {
      eyebrow: "Personally Here for You",
      title: "Contact & Location",
      subtitle: "Do you have questions about our treatments or wish a personal consultation? Feel free to write to us anytime.",
      studioTitle: "Aura Glow Studio",
      addressLabel: "Address:",
      openInMaps: "Open in Google Maps",
      phoneLabel: "Phone:",
      whatsappLabel: "WhatsApp:",
      whatsappChat: "Chat directly on WhatsApp →",
      emailLabel: "Email:",
      instagramLabel: "Instagram:",
      openingHoursTitle: "Opening Hours",
      closed: "Closed",
      oclock: "hrs",
      formEyebrow: "Send a Message",
      formTitle: "Contact Us",
      formSubtitle: "Complete the form below. We will respond to your inquiry promptly.",
      mapEyebrow: "Location & Directions",
      mapTitle: "Aura Glow at Ernst-Moritz-Arndt-Straße 13, Peine",
      planRoute: "Plan route in Google Maps",
    },
    aboutPage: {
      eyebrow: "Aura Glow Philosophy",
      title: "Beauty as an Expression of Your Personality.",
      subtitle: "In a fast-paced world, we create a sanctuary of tranquility where your natural radiance takes center stage.",
      founderEyebrow: "The Founder",
      defaultHeadline: "Passion for refined aesthetics and flawless precision.",
      defaultBody1: "With a cultivated eye for symmetry and natural harmony, Mürvet is dedicated to the individual beauty of each client. Every treatment is performed with patience, master craftsmanship, and the highest hygiene standards.",
      defaultBody2: "At Aura Glow by Mürvet, artificial trends take a back seat to subtly highlighting your natural strengths. Whether a delicate mascara look with the 1:1 lash technique or a soft powder ombre for brows: the goal is always a fresh, harmonious look that gives you confidence every single day.",
      founderRole: "Founder & Master Stylist",
      valuesTitle: "Our Core Values",
      valuesSubtitle: "Three steadfast principles guide each and every treatment.",
      val1Title: "Uncompromising Hygiene",
      val1Desc: "Sterile single-use tools, continuous sanitization, and the highest safety standards meeting German health directives.",
      val2Title: "Natural Harmony",
      val2Desc: "No rigid templates. Every lash styling and brow design is individually harmonized with your unique facial geometry.",
      val3Title: "Undisturbed Sanctuary",
      val3Desc: "No simultaneous appointments or rush. Your treatment time is entirely devoted to you and your serene rejuvenation.",
      ctaTitle: "Would you like to get to know us?",
      ctaSubtitle: "Book your first appointment or send us a message.",
      ctaContact: "Get in Touch",
      ctaBook: "Inquire Appointment Online",
    },
    galleryPage: {
      eyebrow: "Impressions",
      title: "Gallery & Studio Insights",
      subtitle: "Authentic results, fine lines, and the serene ambience of our studio in Peine.",
      categoryAll: "All",
      categoryWimpern: "Lashes",
      categoryFacials: "Facials & Skincare",
      categoryPmu: "Permanent Make-up",
      openDetail: "Open detailed view",
      openLarge: "Open full view",
      closeEscape: "Close (Escape)",
      bookTreatment: "Request appointment for this treatment",
    },
  },
};
