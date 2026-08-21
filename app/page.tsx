'use client';

import { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  Shield, 
  Star, 
  Hammer, 
  Gift, 
  ArrowRight, 
  X, 
  Sparkles, 
  AlertTriangle, 
  Tag, 
  Smartphone, 
  Laptop, 
  Mail, 
  Phone, 
  HelpCircle, 
  ChevronDown,
  UserCheck,
  Award
} from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const offer = {
  productName: "+150 Moldes de Artesanato em Madeira",
  
  basic: {
    name: "Moldes Essenciais",
    oldPrice: "29,90",
    price: "14,97",
    checkoutUrl: "https://pay.cakto.com.br/v9pph7i"
  },

  complete: {
    name: "Pacote Completo + Bônus",
    totalBonusReference: "167,90",
    oldPrice: "197,80",
    price: "27,00",
    diffPrice: "12,03",
    checkoutUrl: "https://pay.cakto.com.br/cghwdxf_1048886"
  },

  completePromo: {
    price: "19,90",
    oldPrice: "27,00",
    diffPrice: "4,93",
    checkoutUrl: "https://pay.cakto.com.br/gs3jxgt"
  },

  bonuses: [
    {
      id: "01",
      name: "Projeto Armário de Banheiro",
      referencePrice: "27,00",
      todayPrice: "0,00",
      image: "https://i.imgur.com/oaRUiWW.jpeg",
      description: "Molde completo com cortes, medidas e lista de materiais para construir e lucrar."
    },
    {
      id: "02",
      name: "Casinha de Passarinho Lucrativo",
      referencePrice: "29,90",
      todayPrice: "0,00",
      image: "https://i.imgur.com/0Tkginf.jpeg",
      description: "Um dos modelos mais vendidos e rápidos para produzir com sobras de madeira."
    },
    {
      id: "03",
      name: "Móveis em Pallet",
      referencePrice: "37,00",
      todayPrice: "0,00",
      image: "https://i.imgur.com/gOUN89M.jpeg",
      description: "Guia prático para transformar madeira de pallet em peças de alto valor agregado."
    },
    {
      id: "04",
      name: "Aprenda a Vender seus Produtos",
      referencePrice: "47,00",
      todayPrice: "0,00",
      image: "https://i.imgur.com/bFg6qno.png",
      description: "Estratégias simples para divulgar, precificar e vender suas peças na internet."
    },
    {
      id: "05",
      name: "Ferramentas Úteis na Marcenaria",
      referencePrice: "27,00",
      todayPrice: "0,00",
      image: "https://i.imgur.com/KVH8no2.jpeg",
      description: "Guia com as ferramentas indispensáveis para gastar pouco e produzir como profissional."
    }
  ],

  guaranteeDays: 7
};

export default function LandingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToCompleteOffer = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    if (e) e.preventDefault();
    const target = document.getElementById('oferta-completa');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const playCelebrationSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Cheerful fanfare arpeggio notes: C5, E5, G5, C6
      const notes = [
        { freq: 523.25, time: 0, dur: 0.12 },
        { freq: 659.25, time: 0.09, dur: 0.12 },
        { freq: 783.99, time: 0.18, dur: 0.15 },
        { freq: 1046.50, time: 0.30, dur: 0.45 }
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + dur);
      });
    } catch {
      // Audio autoplay policy handled gracefully
    }
  };

  const triggerCelebration = () => {
    playCelebrationSound();

    // Center burst
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#FF8A00', '#16A34A', '#FFD166', '#3B82F6', '#EF4444'],
      zIndex: 9999
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#FF8A00', '#16A34A', '#FFD166'],
        zIndex: 9999
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#FF8A00', '#16A34A', '#FFD166'],
        zIndex: 9999
      });
    }, 150);
  };

  const handleOpenUpgradeModal = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowUpgradeModal(true);
    triggerCelebration();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Como recebo o acesso ao material?",
      a: "Assim que o seu pagamento for aprovado, você receberá instantaneamente um e-mail com os dados de acesso a todos os moldes em PDF e aos 5 bônus exclusivos."
    },
    {
      q: "Preciso ter máquinas pesadas ou oficina profissional?",
      a: "Não! Os projetos foram desenvolvidos exatamente para quem quer trabalhar com ferramentas manuais básicas e elétricas simples no quintal ou na garagem."
    },
    {
      q: "Os moldes já vêm com medidas e instruções de corte?",
      a: "Sim! Cada projeto acompanha o desenho detalhado, dimensões exatas e a lista de peças para você só imprimir, riscar na madeira e cortar sem complicação."
    },
    {
      q: "Por quanto tempo terei acesso?",
      a: "O acesso é vitalício! Você pode baixar todos os arquivos para o seu computador, celular ou tablet e consultar sempre que quiser."
    },
    {
      q: "Como funciona a garantia de 7 dias?",
      a: "Se por qualquer motivo dentro de 7 dias você achar que o material não é para você, basta nos enviar um e-mail ou mensagem e devolveremos 100% do seu dinheiro."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#1C1917] selection:bg-[#FF8A00]/30">
      
      {/* 0. TOP ANIMATED MARQUEE BANNER */}
      <div 
        id="top-marquee-banner"
        className="w-full bg-[#B65212] border-b border-[#9E440C] text-white py-2.5 sm:py-3 overflow-hidden select-none relative z-20 shadow-sm"
      >
        <div className="flex w-max animate-top-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 shrink-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                <span>
                  <span className="text-[#FFD166] font-black">1962</span> MARCENEIROS E ARTESÃOS JÁ APROVARAM OS MOLDES
                </span>
                <span className="text-[#FFD166] text-sm sm:text-base">⭐</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD166]/50 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <header className="relative overflow-hidden bg-[#FDFBF7] text-[#1C1917] pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://picsum.photos/seed/woodworking/1920/1080')] bg-cover bg-center mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          
          <h1 
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontStyle: 'normal' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 leading-tight text-[#1C1917]"
          >
            +de 150 Moldes de Madeira <span className="text-[#FF8A00]">Prontos &amp; Lucrativos</span> para fazer no quintal de casa
          </h1>

          <p 
            style={{ color: '#43434d' }}
            className="text-base sm:text-lg md:text-xl mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            São centenas de projetos prontos e fáceis de fazer para quem quer começar na marcenaria do zero sem perder tempo criando medidas e desenhos.
          </p>

          {/* Imagem do Mockup Oficial do Pacote */}
          <div className="relative w-full max-w-2xl mx-auto mb-8 flex items-center justify-center">
            <Image
              src="https://i.imgur.com/PnRrQ1p.png"
              alt="Prévia do Pacote +150 Moldes de Madeira com Bônus"
              width={1200}
              height={675}
              className="w-full h-auto max-h-[460px] object-contain drop-shadow-xl"
              priority
              unoptimized={true}
              referrerPolicy="no-referrer"
            />
          </div>

          <a 
            href="#oferta-completa" 
            onClick={scrollToCompleteOffer}
            className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#e67c00] text-white px-8 py-4 rounded-xl font-black text-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF8A00]/30 w-full sm:w-auto animate-pulse hover:animate-none"
          >
            QUERO OS +150 MOLDES
            <ChevronRight className="w-6 h-6" />
          </a>

          <p className="mt-3 text-xs sm:text-sm text-[#52525B] flex items-center justify-center gap-2 font-medium">
            <Shield className="w-4 h-4 text-[#16A34A]" /> Compra 100% Segura • Acesso Imediato • Garantia de 7 Dias
          </p>
        </div>
      </header>

      {/* 2. QUICK PRESENTATION SECTION */}
      <section className="py-8 bg-white border-b border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00]">
              <Hammer className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">+150 Projetos em PDF</p>
              <p className="text-xs text-[#52525B]">Prontos para imprimir e cortar</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">Celular, Tablet ou PC</p>
              <p className="text-xs text-[#52525B]">Acesse onde e quando quiser</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00]">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">Peças de Alta Venda</p>
              <p className="text-xs text-[#52525B]">Modelos lucrativos testados</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OFFERS SECTION (PROMOTED TO TOP) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative" id="ofertas">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 'bold' }} 
              className="text-[#1C1917]"
            >
              🔥 Garanta seu acesso agora
            </h2>
            <p className="text-base sm:text-lg text-[#52525B] mt-1 border-0">
              Escolha a melhor opção para você e comece hoje mesmo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            
            {/* BASIC PACKAGE CARD */}
            <div 
              style={{
                border: '2px solid #D8D0C5',
                borderRadius: '20px',
                background: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
              }}
              className="p-6 sm:p-8 flex flex-col h-full mt-2 md:mt-6 relative transition-all duration-300 hover:-translate-y-1 hover:border-[#B8A995]"
            >
              <div className="mb-4 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-1">{offer.basic.name}</h3>
                <p className="text-xs sm:text-sm text-[#52525B]">Apenas os moldes essenciais, sem bônus.</p>
              </div>

              {/* Price section - Centered */}
              <div className="mb-6 text-center">
                <p className="text-sm text-[#52525B]/70 line-through font-bold">De R$ {offer.basic.oldPrice}</p>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#df7827]">R$ {offer.basic.price}</span>
                </div>
                <p className="text-xs text-[#52525B] font-semibold">pagamento único</p>
              </div>

              {/* Clean Checklist */}
              <ul className="space-y-2.5 mb-8 flex-1 text-xs sm:text-sm text-[#1C1917]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span className="font-bold">+150 Moldes de Artesanato em Madeira</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesso imediato</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Abra pelo celular, tablet ou computador</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Material digital organizado</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Pagamento único</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Garantia incondicional de 7 dias</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleOpenUpgradeModal}
                className="w-full py-4 px-6 rounded-xl font-bold text-center border-2 border-[#D8D0C5] bg-stone-100 text-[#1C1917] hover:bg-stone-200 transition-all cursor-pointer text-sm sm:text-base"
              >
                QUERO O PACOTE BÁSICO
              </button>
            </div>

            {/* COMPLETE PACKAGE CARD (HIGH CONVERTING & ULTRA CLEAN) */}
            <div 
              id="oferta-completa"
              style={{
                border: '3px solid #D56816',
                borderRadius: '20px',
                background: '#FFFFFF',
                boxShadow: '0 12px 30px rgba(213, 104, 22, 0.15)',
                scrollMarginTop: '70px'
              }}
              className="p-6 sm:p-8 relative flex flex-col h-full transform md:-translate-y-3 transition-all duration-300 scroll-mt-20"
            >
              {/* Badge */}
              <div 
                style={{ backgroundColor: '#df7827' }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap z-10 text-white font-black px-4 py-1 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-md"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                MAIS POPULAR
              </div>

              <div className="mb-2 mt-3 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-[#1C1917]">{offer.complete.name}</h3>
              </div>

              {/* Price section - Centered and High Impact */}
              <div className="mb-4 text-center">
                <p className="text-xs sm:text-sm text-[#52525B]/70 line-through font-bold">De R$ {offer.complete.oldPrice}</p>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span 
                    style={{ 
                      color: '#df7827',
                      fontSize: 'clamp(44px, 6vw, 64px)',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      lineHeight: 1,
                      textDecoration: 'none'
                    }}
                    className="tracking-tight"
                  >
                    R$ {offer.complete.price}
                  </span>
                </div>
                <p className="text-xs text-[#52525B] font-semibold">pagamento único</p>
              </div>

              {/* Compact Green Card */}
              <div 
                style={{
                  background: '#EDF8EF',
                  border: '1px solid #A7D8AF',
                  color: '#176B37',
                  borderRadius: '14px'
                }}
                className="p-3 mb-5 text-center"
              >
                <p className="text-xs sm:text-sm font-black uppercase tracking-wide">
                  POR APENAS R$ {offer.complete.diffPrice} A MAIS QUE O BÁSICO
                </p>
                <p className="text-[11px] sm:text-xs text-[#176B37]/90 mt-0.5 font-medium">
                  Você desbloqueia os +150 moldes e todos os 5 bônus.
                </p>
              </div>

              {/* Clean Checklist without clutter */}
              <ul className="space-y-2 mb-6 flex-1 text-xs sm:text-sm text-[#1C1917]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span className="font-black text-[#1C1917]">+150 Moldes de Artesanato em Madeira</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎁</span>
                  <span className="font-semibold text-[#1C1917]">Projeto Armário de Banheiro</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎁</span>
                  <span className="font-semibold text-[#1C1917]">Casinha de Passarinho Lucrativo</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎁</span>
                  <span className="font-semibold text-[#1C1917]">Móveis em Pallet</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎁</span>
                  <span className="font-semibold text-[#1C1917]">Aprenda a Vender seus Produtos</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎁</span>
                  <span className="font-semibold text-[#1C1917]">Ferramentas Úteis na Marcenaria</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesso imediato após a confirmação do pagamento</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesse pelo celular</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Acesse pelo computador ou tablet</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Material digital organizado</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Consulte os projetos quando quiser</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Pagamento único</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5 font-bold" />
                  <span>Garantia de 7 dias</span>
                </li>
              </ul>

              {/* CTA Button */}
              <a
                href={offer.complete.checkoutUrl}
                className="w-full py-4 sm:py-5 px-6 rounded-xl font-black text-center bg-[#FF8A00] hover:bg-[#e67c00] text-white text-base sm:text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,138,0,0.3)] flex flex-col items-center justify-center gap-0.5 animate-pulse hover:animate-none"
              >
                QUERO O PACOTE COMPLETO
              </a>

              <p className="text-[11px] sm:text-xs text-center text-[#52525B] mt-2.5 font-medium">
                Acesso imediato • Pagamento único • Garantia de 7 dias
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BONUSES SECTION */}
      <section className="py-14 sm:py-16 bg-[#F4EFE6] border-y border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16A34A] text-white text-xs sm:text-sm font-black mb-3 shadow-md">
              <Star className="w-4 h-4 fill-white" />
              ⭐ R$ 167,90 EM BÔNUS INCLUSOS
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-2 text-[#1C1917]">
              Garantindo hoje, você leva <span className="text-[#16A34A]">5 Bônus Exclusivos</span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B]">
              Preparamos um material complementar exclusivo para acelerar seus resultados.
            </p>
          </div>

          <div className="space-y-6">
            {offer.bonuses.map((bonus, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E1D5] hover:border-[#16A34A]/50 shadow-sm hover:shadow-md transition-all gap-5 sm:gap-6"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 flex-1 text-center sm:text-left">
                  {/* Large Visible Bonus Image */}
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100/50 border border-[#E8E1D5] shrink-0 p-2 flex items-center justify-center shadow-inner">
                    <Image
                      src={bonus.image}
                      alt={bonus.name}
                      fill
                      unoptimized={true}
                      className="object-contain p-2 drop-shadow-md hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="text-xs font-black text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-md tracking-wider">
                        BÔNUS {bonus.id}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] leading-snug mb-1.5">
                      {bonus.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-stone-100 shrink-0 gap-2">
                  <span className="text-xs sm:text-sm text-[#52525B]/70 line-through font-medium">
                    Valor: R$ {bonus.referencePrice}
                  </span>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 tracking-wide">
                    NO COMPLETO: R$ {bonus.todayPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* BONUS SUMMARY BOX */}
          <div className="mt-8 bg-white border-2 border-[#16A34A] rounded-2xl p-6 text-center shadow-lg">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#52525B] font-bold mb-1">Se adquiridos separadamente:</p>
            <p className="text-2xl sm:text-3xl font-black text-[#52525B]/70 line-through mb-3">R$ {offer.complete.totalBonusReference}</p>
            
            <div className="bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl py-2.5 px-4 mb-3 inline-block w-full max-w-md">
              <p className="text-xs font-extrabold text-[#16A34A] uppercase tracking-wide">NO PACOTE COMPLETO:</p>
              <p className="text-2xl sm:text-3xl font-black text-[#16A34A]">R$ 0,00 ADICIONAIS</p>
            </div>
            
            <p className="text-[11px] sm:text-xs text-[#52525B] font-medium max-w-lg mx-auto">
              Ao escolher o Pacote Completo, você recebe <strong>R$ {offer.complete.totalBonusReference} em valor de referência dos bônus</strong> sem pagar nada a mais por eles.
            </p>
          </div>
          
          <div className="mt-8 text-center">
             <a 
              href="#oferta-completa" 
              onClick={scrollToCompleteOffer}
              className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#e67c00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF8A00]/30 w-full sm:w-auto animate-pulse hover:animate-none"
            >
              QUERO TER ACESSO AOS BÔNUS
              <ChevronRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS INFINITE CAROUSEL (RIGHT AFTER BONUSES) */}
      <TestimonialsCarousel />

      {/* 6. BENEFITS SECTION */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-[#1C1917]">Por que esse pacote é para você?</h2>
          <p className="text-[#52525B] text-base sm:text-lg">Seja você um iniciante do zero ou quem já gosta de mexer com madeira.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#FF8A00]/40 hover:border-[#FF8A00] transition-colors">
            <div className="w-12 h-12 bg-[#FF8A00]/10 rounded-xl flex items-center justify-center text-[#FF8A00] mb-4 border border-[#FF8A00]/20">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Projetos Prontos</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Chega de quebrar a cabeça calculando medidas. Imprima o molde, aplique na madeira e comece a cortar.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#16A34A]/40 hover:border-[#16A34A] transition-colors">
            <div className="w-12 h-12 bg-[#16A34A]/10 rounded-xl flex items-center justify-center text-[#16A34A] mb-4 border border-[#16A34A]/20">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Peças Altamente Lucrativas</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Selecionamos os modelos que mais vendem no mercado de artesanato e decoração para você faturar no seu tempo livre.</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#FF8A00]/40 hover:border-[#FF8A00] transition-colors">
            <div className="w-12 h-12 bg-[#FF8A00]/10 rounded-xl flex items-center justify-center text-[#FF8A00] mb-4 border border-[#FF8A00]/20">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Passo a Passo Simples</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Qualquer pessoa pode fazer. Projetos desenhados com clareza para não deixar dúvidas na hora da execução.</p>
          </div>
        </div>
      </section>

      {/* 7. EXPERT SECTION (NILTON LUIZ) */}
      <section className="py-14 sm:py-16 bg-[#F4EFE6] border-b border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden mb-5 shrink-0 bg-stone-200">
            <Image
              src="https://i.ibb.co/CZNfZ5Q/2804bc77-69d2-48f8-ac43-12a1ec4f167b.png"
              alt="Nilton Luiz - Especialista & Marceneiro"
              fill
              unoptimized={true}
              className="object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/30 text-[#D56816] text-xs font-black uppercase tracking-wider mb-3">
            ESPECIALISTA &amp; MARCENEIRO
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-[#1C1917] mb-3">Nilton Luiz</h3>
          
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-xl">
            Artesão e marceneiro apaixonado pela transformação da madeira. O pacote de moldes foi criado e organizado para que qualquer pessoa consiga executar peças bonitas, resistentes e altamente rentáveis, mesmo com poucas ferramentas e trabalhando no quintal de casa.
          </p>
        </div>
      </section>

      {/* 7. GUARANTEE SECTION */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E8E1D5] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center">
            <Image
              src="https://i.imgur.com/xBoJNw7.png"
              alt="Selo de Garantia Incondicional de 7 Dias"
              width={240}
              height={240}
              className="w-full h-auto object-contain drop-shadow-md"
              unoptimized={true}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-2 text-[#1C1917]">Risco Zero: Garantia de {offer.guaranteeDays} Dias</h2>
            <p className="text-[#52525B] text-xs sm:text-sm leading-relaxed mb-4">
              Temos tanta confiança na qualidade dos nossos moldes que oferecemos {offer.guaranteeDays} dias de garantia incondicional. Se por qualquer motivo você não gostar, devolvemos 100% do seu dinheiro. Sem burocracia.
            </p>
            <a
              href="#oferta-completa"
              onClick={scrollToCompleteOffer}
              className="inline-flex items-center gap-2 text-[#16A34A] font-bold text-sm hover:underline"
            >
              Começar com garantia de risco zero <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-12 sm:py-16 bg-[#F4EFE6] border-y border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917]">Perguntas Frequentes</h2>
            <p className="text-xs sm:text-sm text-[#52525B] mt-1">Tire todas as suas dúvidas antes de começar.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-[#E8E1D5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-[#1C1917] flex items-center justify-between gap-3 text-sm sm:text-base hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#FF8A00] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#52525B] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#52525B] border-t border-stone-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION (WITH REQUESTED STYLES) */}
      <section className="py-16 bg-[#FDFBF7] text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1917] mb-6 leading-tight">
            <span className="text-[#FF8A00]">MAIS DE 150 MOLDES</span> + 5 BÔNUS POR R$ 27,00
          </h2>
          <a
            href={offer.complete.checkoutUrl}
            className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#e67c00] text-white px-8 sm:px-12 py-5 rounded-2xl font-black text-lg sm:text-xl transition-all transform hover:scale-105 shadow-xl shadow-[#FF8A00]/25 mb-4 animate-pulse hover:animate-none"
          >
            🔥 SIM, QUERO O PACOTE COMPLETO
          </a>
          <div>
            <button 
              type="button"
              onClick={handleOpenUpgradeModal} 
              className="inline-block text-[#52525B] hover:text-[#1C1917] underline underline-offset-4 text-xs sm:text-sm transition-colors font-medium cursor-pointer"
            >
              Prefiro somente o Pacote Básico por R$ 14,97
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER WITH SUPPORT CONTACT INFO */}
      <footer className="py-10 bg-[#1C1917] text-stone-300 text-center px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-6 text-xs sm:text-sm">
            <a 
              href="mailto:niltonrusticos@gmail.com" 
              className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#FF8A00]" />
              <span>Email de suporte: <strong>niltonrusticos@gmail.com</strong></span>
            </a>
            <a 
              href="tel:34992378950" 
              className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#16A34A]" />
              <span>Telefone / WhatsApp: <strong>(34) 99237-8950</strong></span>
            </a>
          </div>

          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} +150 Moldes de Artesanato em Madeira. Todos os direitos reservados.
          </p>
          <p className="mt-1 text-[11px] text-stone-500">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Após sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
        </div>
      </footer>

      {/* 11. UPGRADE POPUP MODAL (CLEAN, GAMIFIED CELEBRATION & PROMINENT CENTERED PRICE) */}
      {showUpgradeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowUpgradeModal(false)}
        >
          <div 
            className="relative w-[calc(100%-24px)] sm:w-full max-w-[460px] bg-white border-2 border-[#16A34A] rounded-3xl shadow-2xl p-5 sm:p-7 my-auto text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-3.5 right-3.5 p-2 rounded-full text-[#52525B] hover:text-[#1C1917] hover:bg-stone-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gamified Celebration Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              🎉 PARABÉNS! PRESENTE DESBLOQUEADO
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl font-black text-[#1C1917] leading-tight mb-1">
              Leve o Pacote Completo
            </h3>
            
            <p className="text-xs sm:text-sm text-[#52525B]">
              Liberamos uma oportunidade única antes de você finalizar.
            </p>

            {/* Super Prominent Centered Pricing Box */}
            <div className="bg-[#F8F6F0] border-2 border-[#16A34A] rounded-2xl p-4 sm:p-5 my-4 text-center shadow-sm">
              <span className="inline-block text-xs sm:text-sm text-[#52525B]/70 font-semibold line-through">
                De R$ {offer.completePromo.oldPrice} por apenas:
              </span>
              
              <div className="my-1.5">
                <span 
                  style={{
                    color: '#16A34A',
                    fontSize: 'clamp(44px, 10vw, 60px)',
                    fontWeight: 900,
                    lineHeight: 1
                  }}
                  className="tracking-tight block font-sans"
                >
                  R$ {offer.completePromo.price}
                </span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-black mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                Apenas +R$ {offer.completePromo.diffPrice} a mais que o Básico!
              </div>
            </div>

            {/* Clean 3-Item List */}
            <div className="bg-stone-50 rounded-xl p-3.5 text-left mb-5 border border-stone-200">
              <ul className="space-y-2 text-xs sm:text-sm text-[#1C1917] font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 font-bold" />
                  <span>+150 Moldes de Artesanato em Madeira</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 font-bold" />
                  <span>Todos os 5 Bônus Exclusivos inclusos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 font-bold" />
                  <span>Acesso vitalício e imediato no celular ou PC</span>
                </li>
              </ul>
            </div>

            {/* Main Action Button */}
            <a
              href={offer.completePromo.checkoutUrl}
              className="w-full py-4 px-5 rounded-xl font-black text-center bg-[#16A34A] hover:bg-[#15803d] text-white text-base sm:text-lg transition-all transform hover:scale-102 shadow-lg shadow-[#16A34A]/30 flex items-center justify-center gap-2 mb-3 cursor-pointer"
            >
              SIM! QUERO O COMPLETO POR R$ {offer.completePromo.price}
              <ChevronRight className="w-5 h-5" />
            </a>

            {/* Secondary Link */}
            <a
              href={offer.basic.checkoutUrl}
              className="inline-block text-[#52525B] hover:text-[#1C1917] text-xs font-medium underline underline-offset-4 transition-colors"
            >
              Não, quero continuar com o Básico por R$ {offer.basic.price}
            </a>
          </div>
        </div>
      )}

      {/* Styles for top marquee animation */}
      <style jsx>{`
        @keyframes topMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-top-marquee {
          animation: topMarquee 26s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-top-marquee {
            animation-duration: 28s;
          }
        }
      `}</style>

    </div>
  );
}
