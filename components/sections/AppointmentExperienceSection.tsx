import React from "react";
import { CalendarDays, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default function AppointmentExperienceSection() {
  const steps = [
    {
      num: "01",
      icon: CalendarDays,
      title: "Wunschtermin anfragen",
      desc: "Wähle deine bevorzugte Behandlung und dein Wunschdatum bequem über unser Online-Formular oder per WhatsApp aus.",
    },
    {
      num: "02",
      icon: MessageCircle,
      title: "Persönliche Bestätigung",
      desc: "Wir prüfen die Studio-Verfügbarkeit und melden uns zeitnah mit einer verbindlichen Terminbestätigung bei dir.",
    },
    {
      num: "03",
      icon: Sparkles,
      title: "Deine persönliche Auszeit",
      desc: "Genieße deine exklusive Behandlung in entspannter Atmosphäre und freue dich auf ein makelloses, strahlendes Ergebnis.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#B88770]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#B88770] font-medium">
              Der Ablauf
            </span>
            <span className="w-6 h-[1px] bg-[#B88770]" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#392D29] mb-4">
            Dein Weg zum perfekten Glow
          </h2>
          <p className="text-sm sm:text-base text-[#756A63] font-light leading-relaxed">
            Einfach, transparent und persönlich – so läuft deine Terminvereinbarung ab.
          </p>
        </div>

        {/* 3 Step Cards in Soft Luxury Border Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-8 sm:p-10 border border-[#E8D6C5]/70 rounded-[1px] shadow-luxury-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs tracking-widest text-[#B88770]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF6F1] border border-[#E8D6C5] flex items-center justify-center text-[#B88770]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#392D29] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#756A63] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
