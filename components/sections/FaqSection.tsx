"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Wie lange hält eine professionelle Wimpernverlängerung und wann sollte sie aufgefüllt werden?",
    answer:
      "Eine professionell applizierte Wimpernverlängerung hält in der Regel 4 bis 6 Wochen, abhängig von deinem natürlichen Wimpernwechselzyklus. Da Naturwimpern kontinuierlich ausfallen und nachwachsen, empfehlen wir ein regelmäßiges Auffüllen (Refill) alle 3 bis 4 Wochen. So bleibt dein Wimpernkranz dauerhaft voll, symmetrisch und gepflegt.",
  },
  {
    question: "Sind Behandlungen wie Microneedling oder Permanent Make-up schmerzhaft?",
    answer:
      "Nein, dein Wohlbefinden steht an erster Stelle. Beim Microneedling und Permanent Make-up (wie Powder Brows) arbeiten wir mit hochmodernen Präzisionsgeräten und feinsten Nadelmodulen. Die meisten Kundinnen beschreiben das Gefühl lediglich als leichtes Kribbeln oder sanftes Zupfen. Vor jeder Behandlung stimmen wir die Intensität individuell auf deine Schmerzempfindlichkeit ab.",
  },
  {
    question: "Was muss ich vor und nach meinem Behandlungstermin beachten?",
    answer:
      "Vor Wimpernbehandlungen: Bitte erscheine nach Möglichkeit ohne Augen-Make-up und nimm Kontaktlinsen vorab heraus. Vor Permanent Make-up: Bitte 24 Stunden vorher keinen Alkohol, Kaffee oder blutverdünnende Medikamente einnehmen. Nach der Behandlung: Verzichte in den ersten 24 bis 48 Stunden auf Sauna, Solarium, starkes Schwitzen und direkten Wasserkontakt im behandelten Areal. Detaillierte Pflegehinweise erhältst du von uns nach jedem Termin persönlich.",
  },
  {
    question: "Welche Produkte und Hygienestandards kommen bei Aura Glow zum Einsatz?",
    answer:
      "Wir arbeiten nach strengsten deutschen Kosmetik- und Hygienevorschriften. Für alle invasiven Behandlungen werden ausschließlich sterile Einwegnadeln und hochwertige, REACH-konforme Pigmente verwendet. Unsere Pflege- und Behandlungsprodukte sind dermatologisch getestet, hypoallergen und frei von bedenklichen Zusatzstoffen.",
  },
  {
    question: "Wie läuft die Terminanfrage ab und wie kann ich einen Termin absagen?",
    answer:
      "Du kannst deinen Wunschtermin bequem online über unser Terminformular, telefonisch oder per WhatsApp anfragen. Wir prüfen die Studioverfügbarkeit und bestätigen deinen Termin verbindlich. Solltest du einen Termin einmal nicht wahrnehmen können, bitten wir dich um eine Absage mindestens 24 Stunden im Voraus, damit wir den Zeitslot für andere Kundinnen freigeben können.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-28 bg-[#F7F3EE] border-t border-[#E8D6C5]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-[#A26D57]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#A26D57] font-medium">
              Häufige Fragen &amp; Antworten
            </span>
          </div>
          <h2
            id="faq-heading"
            className="font-editorial text-3xl sm:text-5xl text-[#392D29] font-light mb-4"
          >
            Wissenswertes zu deinen Behandlungen
          </h2>
          <p className="text-base text-[#756A63] font-light max-w-xl mx-auto leading-relaxed">
            Transparenz und Vertrauen sind das Fundament von Aura Glow. Hier findest du Antworten auf
            die wichtigsten Fragen rund um Behandlungsablauf, Vorbereitung und Nachsorge.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "bg-white border rounded-[1px] transition-all duration-200 overflow-hidden",
                  isOpen ? "border-[#A26D57] shadow-luxury-sm" : "border-[#E8D6C5] hover:border-[#B88770]/60"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A26D57]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-editorial text-lg sm:text-xl text-[#392D29] font-normal leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border border-[#E8D6C5] flex items-center justify-center shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180 bg-[#FAF6F1] border-[#A26D57]" : "bg-white"
                    )}
                  >
                    <ChevronDown className="w-4 h-4 text-[#A26D57]" aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-sm sm:text-base text-[#756A63] font-light leading-relaxed border-t border-[#E8D6C5]/40 mt-1 animate-in fade-in duration-200"
                  >
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA in FAQ */}
        <div className="mt-12 text-center bg-[#FAF6F1] border border-[#E8D6C5] p-6 sm:p-8 rounded-[1px]">
          <p className="text-sm text-[#756A63] font-light mb-4">
            Ist deine persönliche Frage noch nicht dabei? Kontaktiere uns direkt &ndash; wir beraten dich gerne unverbindlich.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kontakt"
              className="btn-primary text-xs inline-flex items-center gap-2"
            >
              <span>Kontakt aufnehmen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/4917612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Frage per WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
