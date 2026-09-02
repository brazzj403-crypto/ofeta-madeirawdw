'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronDown, CheckCircle2 } from 'lucide-react';

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-7 sm:mb-9">
        {/* 1. Badge Superior Moderno & Contrastante */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-extrabold">Depoimentos Reais & Verificados</span>
        </div>

        {/* 2. Novo Título Principal (H2) */}
        <h2 
          style={{ fontFamily: 'Poppins, sans-serif' }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] tracking-tight leading-tight"
        >
          Veja quem já colocou em prática e <span className="text-[#FF8A00] font-black underline decoration-[#FF8A00]/40 decoration-4 underline-offset-4">faturou</span>
        </h2>

        {/* 3. Subtítulo Convincente com Foco em Resultado Financeiro */}
        <p className="text-xs sm:text-base text-[#52525B] mt-2 max-w-xl mx-auto leading-relaxed">
          Pessoas comuns que começaram do zero no quintal de casa e já estão vendendo suas primeiras peças de madeira com lucro rápido.
        </p>

        {/* 4. Seta Harmônica com Micro-Animação Flutuante */}
        <div className="mt-3.5 flex flex-col items-center justify-center gap-1">
          <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200/90 flex items-center justify-center text-[#FF8A00] shadow-sm animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#FF8A00] stroke-[2.5]" />
          </div>
          {/* Mobile Swipe Hint */}
          <p className="text-[11px] sm:text-xs text-[#52525B]/80 font-medium sm:hidden">
            Arraste para o lado para ver todos os prints
          </p>
        </div>
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
