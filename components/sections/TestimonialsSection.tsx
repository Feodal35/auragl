import React from "react";
import { Star, Quote, CheckCircle2, HeartHandshake } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { DEFAULT_TESTIMONIALS } from "@/lib/defaultData";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials: initialTestimonials }: TestimonialsSectionProps) {
  const list = (initialTestimonials && initialTestimonials.length > 0
    ? initialTestimonials
    : DEFAULT_TESTIMONIALS
  ).filter((item) => item.is_active !== false);

  if (list.length === 0) {
    return null;
  }

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
              Echtes Kundenvertrauen &bull; Kundenstimmen
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
              &bull; über 120 verifizierte Bewertungen in Peine & Region
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((review) => (
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
