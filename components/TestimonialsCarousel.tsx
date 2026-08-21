'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface TestimonialItem {
  image: string;
  alt: string;
}

// URLs diretas dos links ibb.co fornecidos:
// 1. https://ibb.co/zVH4py5Q -> https://i.ibb.co/m5FckLBb/Captura-de-tela-2026-08-18-151422.png
// 2. https://ibb.co/6cTjhFQ1 -> https://i.ibb.co/7xZscKhR/fcb7cef4-cf77-4847-9c9e-ffe7b659cd9b.png
// 3. https://ibb.co/xKDKjt3M -> https://i.ibb.co/cK1KFSxN/Captura-de-tela-2026-08-18-151403.png
// 4. https://ibb.co/6cTjhFQ1 -> https://i.ibb.co/7xZscKhR/fcb7cef4-cf77-4847-9c9e-ffe7b659cd9b.png
const testimonials: TestimonialItem[] = [
  {
    image: "https://i.ibb.co/m5FckLBb/Captura-de-tela-2026-08-18-151422.png",
    alt: "Depoimento 1 - Resultado com os moldes de artesanato em madeira"
  },
  {
    image: "https://i.ibb.co/7xZscKhR/fcb7cef4-cf77-4847-9c9e-ffe7b659cd9b.png",
    alt: "Depoimento 2 - Mensagem de quem teve acesso aos moldes"
  },
  {
    image: "https://i.ibb.co/cK1KFSxN/Captura-de-tela-2026-08-18-151403.png",
    alt: "Depoimento 3 - Peça construída com os moldes e projetos"
  },
  {
    image: "https://i.ibb.co/7xZscKhR/fcb7cef4-cf77-4847-9c9e-ffe7b659cd9b.png",
    alt: "Depoimento 4 - Avaliação e satisfação com o pacote completo"
  }
];

export default function TestimonialsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicated list for seamless infinite marquee loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-14 sm:py-18 bg-[#FDFBF7] border-y border-[#E8E1D5] overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-black uppercase tracking-wider mb-2.5">
          ⭐ DEPOIMENTOS REAIS
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] tracking-tight">
          Veja quem já colocou a mão na madeira 🪵
        </h2>
        <p className="text-sm sm:text-base text-[#52525B] mt-1.5 max-w-xl mx-auto">
          Resultados e mensagens de quem já teve acesso aos moldes.
        </p>

        {/* Mobile Swipe Hint */}
        <p className="text-xs text-[#52525B]/80 font-semibold mt-3 flex items-center justify-center gap-1 sm:hidden">
          <span>←</span> Arraste para ver mais <span>→</span>
        </p>
      </div>

      {/* Carousel Container with Side Gradient Masks */}
      <div 
        className="relative w-full overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Gradient Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10" />

        {/* Right Gradient Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10" />

        {/* Continuous Track */}
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 py-2 px-4 w-max animate-marquee"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedTestimonials.map((item, index) => (
            <div
              key={index}
              className="w-[78vw] max-w-[310px] sm:w-[280px] shrink-0 bg-white rounded-2xl border border-[#E8E1D5] shadow-sm hover:shadow-md transition-shadow duration-300 p-2 sm:p-2.5 flex flex-col justify-center"
            >
              <div className="relative w-full rounded-xl overflow-hidden bg-stone-50">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={320}
                  height={600}
                  unoptimized={true}
                  className="w-full h-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for keyframe animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 22s;
          }
        }
      `}</style>
    </section>
  );
}
