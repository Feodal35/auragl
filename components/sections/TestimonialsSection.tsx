import React from "react";
import { Star, Quote, CheckCircle2, HeartHandshake } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  text: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "rev-1",
    name: "Laura S.",
    location: "Düsseldorf-Stadtmitte",
    treatment: "Wimpern-Neumodellage (1:1 Methode)",
    text: "Mürvet ist eine absolute Koryphäe auf ihrem Gebiet. Meine Wimpernverlängerung hält bombenfest und sieht selbst nach 4 Wochen noch unfassbar edel und natürlich aus. Kein Verkleben, kein Piksen. Die Ruhe im Studio auf der Königsallee ist für mich wie ein Kurzurlaub.",
    rating: 5,
    date: "Vor 2 Wochen",
  },
  {
    id: "rev-2",
    name: "Elena M.",
    location: "Meerbusch",
    treatment: "Hollywood Glow Deluxe Facial",
    text: "Das Hollywood Glow Facial hat mein Hautbild nachhaltig verwandelt. Feine Linien wirken wie aufgepolstert und der Glow hält tagelang an – ich wurde im Büro direkt darauf angesprochen. Mürvets Fachwissen und sanfte Berührung sind unübertroffen.",
    rating: 5,
    date: "Vor 3 Wochen",
  },
  {
    id: "rev-3",
    name: "Sabrina K.",
    location: "Neuss",
    treatment: "Powder Brows Neuanlage",
    text: "Nach langem Überlegen habe ich mich für Powder Brows bei Aura Glow entschieden. Mürvet hat sich über 30 Minuten Zeit allein für das typgerechte Vorzeichnen genommen. Das Ergebnis ist perfekt symmetrisch und super zart geschattiert. Jeden Morgen spare ich 15 Minuten Zeit!",
    rating: 5,
    date: "Vor 1 Monat",
  },
  {
    id: "rev-4",
    name: "Vanessa T.",
    location: "Ratingen",
    treatment: "Lash Lifting & Brow Lamination",
    text: "Vom ersten Moment an habe ich mich wohlgefühlt. Höchste Sauberkeit, sterile Instrumente und ein erstklassiger Service. Das Lash Lifting hält bei mir volle 6 Wochen. Eine absolute Herzensempfehlung in Düsseldorf!",
    rating: 5,
    date: "Vor 1 Monat",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="kundenstimmen"
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-28 bg-[#F7F3EE] border-t border-[#E8D6C5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <HeartHandshake className="w-4 h-4 text-[#844C36]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#844C36] font-semibold">
              Echtes Kundenvertrauen &bull; Müşteri Yorumları
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#392D29] font-light mb-5"
          >
            Was unsere Kundinnen schätzen
          </h2>
          <p className="text-base sm:text-lg text-[#756A63] font-light leading-relaxed">
            Ihre Zufriedenheit und natürliche Ausstrahlung sind unser größtes Lob.
            Lies echte Erfahrungen aus unserem Studioalltag.
          </p>

          {/* Aggregate Rating Badge */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-[#E8D6C5] px-6 py-3 rounded-full shadow-luxury-sm">
            <div className="flex items-center gap-1 text-[#844C36]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#844C36] text-[#844C36]" aria-hidden="true" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#392D29]">
              4.9 / 5.0
            </span>
            <span className="text-xs text-[#756A63] font-light">
              &bull; über 120 verifizierte Bewertungen in Düsseldorf
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-[#E8D6C5] rounded-[1px] p-8 sm:p-10 shadow-luxury-sm flex flex-col justify-between hover:border-[#844C36]/60 transition-all duration-300"
            >
              <div>
                {/* Header row with rating stars and quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#844C36]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#844C36] text-[#844C36]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E8D6C5]" aria-hidden="true" />
                </div>

                {/* Quote Text */}
                <p className="font-editorial text-lg sm:text-xl text-[#392D29] font-normal leading-relaxed italic mb-6">
                  &bdquo;{review.text}&ldquo;
                </p>
              </div>

              {/* Author & Treatment Footer */}
              <div className="pt-6 border-t border-[#E8D6C5]/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm text-[#392D29]">
                      {review.name}
                    </span>
                    <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                      Verifizierter Besuch
                    </span>
                  </div>
                  <span className="text-xs text-[#756A63] font-light block mt-0.5">
                    {review.location} &bull; {review.date}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#844C36] font-semibold block">
                    {review.treatment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
