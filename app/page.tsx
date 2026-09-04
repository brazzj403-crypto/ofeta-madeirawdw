'use client';

import { useState, useEffect } from 'react';
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
  Award,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import RecentPurchasesToast from '@/components/RecentPurchasesToast';

const offer = {
  productName: "+150 Moldes de Artesanato em Madeira",
  
  basic: {
    name: "Moldes Essenciais",
    oldPrice: "29,90",
    price: "14,97",
    checkoutUrl: "https://pay.cakto.com.br/v9pph7i_1049777?src=basico1497"
  },

  complete: {
    name: "Pacote Completo + Bônus",
    totalBonusReference: "167,90",
    oldPrice: "197,80",
    price: "27,00",
    diffPrice: "12,03",
    checkoutUrl: "https://pay.cakto.com.br/cghwdxf_1048886?src=completo27"
  },

  completePromo: {
    price: "17,90",
    oldPrice: "27,00",
    diffPrice: "2,93",
    checkoutUrl: "https://pay.cakto.com.br/gs3jxgt_1049778?src=popup1790"
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
  const [showStickyCard, setShowStickyCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setShowStickyCard(true);
      } else {
        setShowStickyCard(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToOffersSection = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    if (e) e.preventDefault();
    const target = document.getElementById('ofertas');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

      {/* 1. HERO SECTION (HARMONIOUS, HIGH-CONVERTING & PROPORTIONAL) */}
      <header className="relative overflow-hidden bg-[#FDFBF7] text-[#1C1917] pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://picsum.photos/seed/woodworking/1920/1080')] bg-cover bg-center mix-blend-multiply pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10 px-2 sm:px-4">
          
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontStyle: 'normal' }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight mb-3 sm:mb-4 leading-tight text-[#1C1917]"
          >
            Transforme <span className="text-[#78350F] font-black">sobras de madeira</span> em{' '}
            <span className="relative inline-block text-[#D96B00] font-black">
              dinheiro todo mês no seu bolso
              {/* Traço sutil estilo hand-drawn underline */}
              <svg 
                className="absolute -bottom-1 left-0 w-full h-2 text-[#FF8A00] opacity-80 overflow-visible pointer-events-none" 
                viewBox="0 0 100 8" 
                preserveAspectRatio="none"
              >
                <path d="M1 5.5 Q 35 1.5, 70 6 T 99 3.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            style={{ color: '#43434d' }}
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            +150 projetos prontos e fáceis de seguir. O passo a passo ideal para iniciantes criarem peças lucrativas com pouco espaço e materiais simples.
          </motion.p>

          {/* Imagem do Mockup Oficial do Pacote com Efeito Suave e Bordas Arredondadas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-auto mb-6 sm:mb-8 flex items-center justify-center"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-white/50 p-1 sm:p-2 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,138,0,0.2)]">
              <Image
                src="https://i.imgur.com/PmB7xRO.png"
                alt="Prévia do Pacote +150 Moldes de Madeira com Bônus"
                width={1200}
                height={675}
                className="w-full h-auto max-h-[280px] sm:max-h-[380px] md:max-h-[460px] object-cover rounded-xl sm:rounded-2xl"
                priority
                unoptimized={true}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            <a 
              href="#oferta-completa" 
              onClick={scrollToCompleteOffer}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF8A00] via-[#FFA033] to-[#E65100] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-[0_8px_24px_rgba(255,138,0,0.38)] hover:shadow-[0_12px_32px_rgba(255,138,0,0.52)] w-full sm:w-auto cursor-pointer ring-1 ring-white/30 ring-inset"
            >
              <span className="relative z-10 font-black">QUERO OS +150 MOLDES</span>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              {/* Feixe de luz contínuo sem piscar nem alterar a opacidade */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-btn-sheen pointer-events-none" />
            </a>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#52525B] flex items-center justify-center gap-1.5 sm:gap-2 font-medium">
              <Shield className="w-4 h-4 text-[#16A34A] shrink-0" /> 
              <span>Compra 100% Segura • Acesso Imediato • Garantia de 7 Dias</span>
            </p>
          </motion.div>
        </div>
      </header>

      {/* 2. QUICK PRESENTATION SECTION */}
      <section className="py-8 bg-white border-b border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00]">
              <Hammer className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">+150 Projetos em PDF</p>
              <p className="text-xs text-[#52525B]">Prontos para imprimir e cortar</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">Celular, Tablet ou PC</p>
              <p className="text-xs text-[#52525B]">Acesse onde e quando quiser</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF8A00]/10 flex items-center justify-center text-[#FF8A00]">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1C1917] text-sm sm:text-base">Peças de Alta Venda</p>
              <p className="text-xs text-[#52525B]">Modelos lucrativos testados</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. TESTIMONIALS INFINITE CAROUSEL */}
      <TestimonialsCarousel />

      {/* 4. OFFERS SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative" id="ofertas">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-9 sm:mb-12"
          >
            {/* 1. Badge Superior Moderno com Ponto Pulsante de Urgência */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <Zap className="w-3.5 h-3.5 fill-amber-600 text-amber-600 shrink-0" />
              <span>Oferta Especial Por Tempo Limitado</span>
            </div>

            {/* 2. Título da Seção (H2) Alinhado com Destaque em 'Agora' */}
            <h2 
              style={{ fontFamily: 'Poppins, sans-serif' }} 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight flex items-center justify-center gap-2 flex-wrap"
            >
              <span>🔥 Garanta seu acesso</span>{' '}
              <span className="text-[#FF8A00] font-black underline decoration-[#FF8A00]/30 decoration-4 underline-offset-4">
                agora
              </span>
            </h2>

            {/* 3. Subtítulo Limpo e Equilibrado */}
            <p className="text-neutral-600 text-sm md:text-base max-w-md mx-auto mt-2 leading-relaxed">
              Escolha a melhor opção para você e comece hoje mesmo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            
            {/* BASIC PACKAGE CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
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

              {/* Price section - Centered with Pop-in */}
              <div className="mb-6 text-center">
                <p className="text-sm text-[#52525B]/70 line-through font-bold">De R$ {offer.basic.oldPrice}</p>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                  className="flex items-baseline justify-center gap-1 my-1"
                >
                  <span className="text-3xl sm:text-4xl font-black text-[#df7827]">R$ {offer.basic.price}</span>
                </motion.div>
                <p className="text-xs md:text-sm text-neutral-600 font-medium mt-0.5">
                  ou até 3x de R$ 5,81 no cartão
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  pagamento único à vista • acesso vitalício
                </p>
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
            </motion.div>

            {/* COMPLETE PACKAGE CARD (CLEAN, MODERN & MINIMALIST HIGH CONVERTING) */}
            <motion.div 
              id="oferta-completa"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                borderRadius: '24px',
                background: '#FFFFFF',
                boxShadow: '0 10px 30px rgba(213, 104, 22, 0.12)',
                scrollMarginTop: '70px'
              }}
              className="p-6 sm:p-8 relative flex flex-col h-full border-2 border-[#FF8A00] transform md:-translate-y-3 transition-all duration-300 scroll-mt-20"
            >
              {/* 1. Top Badge de Destaque */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap z-20 text-white font-extrabold px-4 sm:px-5 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-md bg-gradient-to-r from-[#FF8A00] to-[#E65100] border-2 border-white"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                MAIS POPULAR E RECOMENDADO
              </div>

              <div className="mb-1 mt-3 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-[#1C1917]">{offer.complete.name}</h3>
              </div>

              {/* 2. Hierarquia de Preço (Clean, Minimalista e Respirável) */}
              <div className="mb-4 text-center relative pt-2">
                {/* Linha de Ancoragem + Tag de Desconto Sutil */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs sm:text-sm text-stone-500 font-medium">
                    De <span className="line-through text-stone-400">R$ {offer.complete.oldPrice}</span> por apenas
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-[11px] font-bold uppercase px-2 py-0.5 rounded-full tracking-tight">
                    86% OFF
                  </span>
                </div>

                {/* Preço em Destaque Respirando no Fundo Claro */}
                <div className="my-0.5">
                  <span 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    className="text-5xl sm:text-6xl font-black tracking-tight text-[#D56816] inline-block"
                  >
                    R$ {offer.complete.price}
                  </span>
                </div>

                {/* Linha 1: Parcelamento no Cartão */}
                <div>
                  <span className="text-xs md:text-sm font-semibold text-amber-700 bg-amber-50 inline-block px-2.5 py-0.5 rounded-full border border-amber-200/60 my-1">
                    ou apenas 6x de R$ 5,34 no cartão
                  </span>
                </div>

                {/* Linha 2: Subtexto Discreto */}
                <p className="text-[11px] text-neutral-400">
                  pagamento único à vista • acesso vitalício
                </p>
              </div>

              {/* 3. Callout Moderno e Sutil de Comparação (Upgrade de R$ 12,03) */}
              <div className="p-3 mb-5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-stone-700 text-xs sm:text-sm leading-relaxed flex items-center justify-center gap-2 text-center">
                <span>💡</span>
                <span>
                  Por apenas <strong className="text-stone-900 font-bold">R$ {offer.complete.diffPrice} a mais</strong> que o plano básico, você leva o acesso completo + todos os 5 bônus.
                </span>
              </div>

              {/* Clean Checklist without clutter */}
              <ul className="space-y-2.5 mb-6 flex-1 text-xs sm:text-sm text-[#1C1917]">
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
                className="group relative overflow-hidden w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-center bg-gradient-to-r from-[#FF8A00] via-[#FFA033] to-[#E65100] text-white text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_28px_rgba(255,138,0,0.42)] hover:shadow-[0_14px_34px_rgba(255,138,0,0.55)] flex items-center justify-center gap-2 cursor-pointer ring-1 ring-white/30 ring-inset"
              >
                <span className="relative z-10 font-black tracking-wide">
                  QUERO O PACOTE COMPLETO
                </span>
                <ChevronRight className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                {/* Feixe de luz reflexivo elegante sem piscar nem alterar a opacidade do botão */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-btn-sheen pointer-events-none" />
              </a>

              <p className="text-[11px] sm:text-xs text-center text-[#52525B] mt-2.5 font-medium">
                Acesso imediato • Pagamento único • Garantia de 7 dias
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. BONUSES SECTION */}
      <section className="py-14 sm:py-16 bg-[#F4EFE6] border-y border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
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
          </motion.div>

          <div className="space-y-6">
            {offer.bonuses.map((bonus, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E1D5] hover:border-[#16A34A]/50 shadow-sm hover:shadow-md transition-all gap-5 sm:gap-6"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 flex-1 text-center sm:text-left">
                  {/* Large Visible Bonus Image */}
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100/50 border border-[#E8E1D5] shrink-0 p-2 flex items-center justify-center shadow-inner">
                    <Image
                      src={bonus.image}
                      alt={bonus.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 144px, 176px"
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
              </motion.div>
            ))}
          </div>

          {/* BONUS SUMMARY BOX */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white border-2 border-[#16A34A] rounded-2xl p-6 text-center shadow-lg"
          >
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#52525B] font-bold mb-1">Se adquiridos separadamente:</p>
            <p className="text-2xl sm:text-3xl font-black text-[#52525B]/70 line-through mb-3">R$ {offer.complete.totalBonusReference}</p>
            
            <div className="bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl py-2.5 px-4 mb-3 inline-block w-full max-w-md">
              <p className="text-xs font-extrabold text-[#16A34A] uppercase tracking-wide">NO PACOTE COMPLETO:</p>
              <p className="text-2xl sm:text-3xl font-black text-[#16A34A]">R$ 0,00 ADICIONAIS</p>
            </div>
            
            <p className="text-[11px] sm:text-xs text-[#52525B] font-medium max-w-lg mx-auto">
              Ao escolher o Pacote Completo, você recebe <strong>R$ {offer.complete.totalBonusReference} em valor de referência dos bônus</strong> sem pagar nada a mais por eles.
            </p>
          </motion.div>
          
          <div className="mt-8 text-center">
             <a 
              href="#oferta-completa" 
              onClick={scrollToCompleteOffer}
              className="inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#e67c00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF8A00]/30 w-full sm:w-auto animate-pulse hover:animate-none cursor-pointer"
            >
              QUERO TER ACESSO AOS BÔNUS
              <ChevronRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS SECTION */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-[#1C1917]">Por que esse pacote é para você?</h2>
          <p className="text-[#52525B] text-base sm:text-lg">Seja você um iniciante do zero ou quem já gosta de mexer com madeira.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#FF8A00]/40 hover:border-[#FF8A00] transition-colors"
          >
            <div className="w-12 h-12 bg-[#FF8A00]/10 rounded-xl flex items-center justify-center text-[#FF8A00] mb-4 border border-[#FF8A00]/20">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Projetos Prontos</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Chega de quebrar a cabeça calculando medidas. Imprima o molde, aplique na madeira e comece a cortar.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#16A34A]/40 hover:border-[#16A34A] transition-colors"
          >
            <div className="w-12 h-12 bg-[#16A34A]/10 rounded-xl flex items-center justify-center text-[#16A34A] mb-4 border border-[#16A34A]/20">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Peças Altamente Lucrativas</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Selecionamos os modelos que mais vendem no mercado de artesanato e decoração para você faturar no seu tempo livre.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#FF8A00]/40 hover:border-[#FF8A00] transition-colors"
          >
            <div className="w-12 h-12 bg-[#FF8A00]/10 rounded-xl flex items-center justify-center text-[#FF8A00] mb-4 border border-[#FF8A00]/20">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1C1917]">Passo a Passo Simples</h3>
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">Qualquer pessoa pode fazer. Projetos desenhados com clareza para não deixar dúvidas na hora da execução.</p>
          </motion.div>
        </div>
      </section>

      {/* 7. EXPERT SECTION (NILTON LUIZ) */}
      <section className="py-14 sm:py-16 bg-[#F4EFE6] border-b border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto flex flex-col items-center text-center"
        >
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
        </motion.div>
      </section>

      {/* 7. GUARANTEE SECTION */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E8E1D5] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
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
              className="inline-flex items-center gap-2 text-[#16A34A] font-bold text-sm hover:underline cursor-pointer"
            >
              Começar com garantia de risco zero <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-12 sm:py-16 bg-[#F4EFE6] border-y border-[#E8E1D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917]">Perguntas Frequentes</h2>
            <p className="text-xs sm:text-sm text-[#52525B] mt-1">Tire todas as suas dúvidas antes de começar.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-[#E8E1D5] overflow-hidden"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION (WITH REQUESTED STYLES & ENTRANCE ANIMATION) */}
      <section className="py-16 bg-[#FDFBF7] text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative max-w-3xl mx-auto z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1917] mb-6 leading-tight">
            <span className="text-[#FF8A00]">MAIS DE 150 MOLDES</span> + 5 BÔNUS POR R$ 27,00
          </h2>
          <a
            href={offer.complete.checkoutUrl}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF8A00] via-[#FFA033] to-[#E65100] text-white px-8 sm:px-12 py-5 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_12px_32px_rgba(255,138,0,0.45)] hover:shadow-[0_16px_38px_rgba(255,138,0,0.58)] mb-4 cursor-pointer ring-1 ring-white/30 ring-inset"
          >
            <span className="relative z-10 flex items-center gap-2 font-black">
              <span>🔥</span>
              <span>SIM, QUERO O PACOTE COMPLETO</span>
            </span>
            <ChevronRight className="w-6 h-6 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
            {/* Feixe de luz reflexivo sem piscar nem alterar a opacidade do botão */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-btn-sheen pointer-events-none" />
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
        </motion.div>
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

      {/* 11. UPGRADE POPUP MODAL (CLEAN, COMPACT, HIGH-CONVERTING & MODERN) */}
      {showUpgradeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div 
            className="relative w-full max-w-[390px] bg-white border border-neutral-200 shadow-2xl rounded-2xl p-4 sm:p-5 my-auto text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 1. Badge Superior Sutil e Amigável */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <span>⚡</span>
              <span>OFERTA ESPECIAL</span>
            </div>

            {/* 2. Headline & Subtexto */}
            <h3 className="text-base sm:text-lg font-bold text-neutral-800 leading-snug">
              Leve o Pacote Completo por apenas R$ 2,93 a mais
            </h3>
            
            <p className="text-xs text-neutral-500 mt-1">
              Adicione todos os 5 bônus exclusivos por uma pequena diferença única.
            </p>

            {/* 3. Bloco de Preço e Ancoragem Matemática (Clean & Respirável) */}
            <div className="my-3 text-center">
              <span className="text-xs text-neutral-400 line-through">
                De R$ {offer.completePromo.oldPrice} por
              </span>
              
              <div 
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight my-0.5"
              >
                R$ {offer.completePromo.price}
              </div>
              
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-semibold mt-0.5">
                <span>Apenas R$ {offer.completePromo.diffPrice} a mais que o básico (R$ {offer.basic.price})</span>
              </div>
            </div>

            {/* 4. Nova Lista de Benefícios */}
            <ul className="space-y-1.5 text-left text-xs text-neutral-700 font-medium my-3.5 px-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>Todos os +150 Moldes do Plano Básico</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>+ 5 Bônus Exclusivos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>Materiais extras para ajudar você a criar e vender</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>Acesso imediato</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>Bônus: Aprenda a vender suas peças</span>
              </li>
            </ul>

            {/* 5. Botões de Ação e Recusa Clara */}
            <div className="space-y-1.5">
              <a
                href={offer.completePromo.checkoutUrl}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-center bg-[#FF8A00] hover:bg-[#e67c00] text-white text-sm sm:text-base transition-all transform hover:scale-[1.02] shadow-lg shadow-[#FF8A00]/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>SIM, QUERO O COMPLETO POR R$ {offer.completePromo.price}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href={offer.basic.checkoutUrl}
                className="text-neutral-600 hover:text-neutral-900 underline text-xs font-medium py-2 text-center block transition-colors cursor-pointer"
              >
                Não, obrigado. Quero apenas o Básico por R$ {offer.basic.price}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 9. STICKY BOTTOM OFFER MINI CARD (FLOATING PILL / GLASSMORPHISM) */}
      <div 
        id="sticky-bottom-offer-card"
        className={`fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 px-3 sm:px-4 pointer-events-none transition-all duration-500 ease-out transform ${
          showStickyCard ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="relative overflow-hidden bg-[#1C1917]/95 text-white backdrop-blur-md rounded-2xl sm:rounded-full px-3.5 py-2.5 sm:px-6 sm:py-3 shadow-2xl border border-[#FF8A00]/40 flex items-center justify-between gap-3 sm:gap-4 ring-1 ring-white/10 hover:border-[#FF8A00]/70 transition-all duration-300">
            
            {/* Subtle Amber Glow Background Effect */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#FF8A00]/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FF8A00]/20 rounded-full blur-xl pointer-events-none" />

            {/* Left Info: Icon & Text */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-full bg-gradient-to-br from-[#FF8A00] to-[#E65100] text-white flex items-center justify-center shrink-0 shadow-md">
                <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              
              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FFD166] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FFD166]" />
                    Oferta Especial
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate text-[#FDFBF7]">
                  +150 Moldes Prontos <span className="hidden sm:inline">por apenas</span>{' '}
                  <span className="text-[#FF8A00] font-black text-sm sm:text-base">
                    R$ {offer.basic.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action: CTA Button with Smooth Scroll */}
            <button
              onClick={scrollToOffersSection}
              id="sticky-card-cta-btn"
              className="group relative shrink-0 overflow-hidden bg-gradient-to-r from-[#FF8A00] via-[#FFA133] to-[#FF8A00] bg-[length:200%_auto] hover:bg-right text-white font-black text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full shadow-lg shadow-[#FF8A00]/25 hover:shadow-[#FF8A00]/40 transition-all duration-300 transform active:scale-95 flex items-center gap-1 sm:gap-1.5 cursor-pointer"
            >
              <span className="relative z-10 font-black">Garantir Oferta</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform group-hover:translate-x-0.5 font-bold" />
              
              {/* Shimmer animation pass */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full animate-shimmer pointer-events-none" />
            </button>

          </div>
        </div>
      </div>

      {/* 12. FLOATING SOCIAL PROOF TOAST (RECENT PURCHASES) */}
      <RecentPurchasesToast />

      {/* Styles for top marquee and price effects */}
      <style jsx>{`
        @keyframes textShimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: textShimmer 4.5s ease-in-out infinite;
        }
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
        @keyframes btnSheen {
          0% {
            transform: translateX(-160%) skewX(-20deg);
          }
          35%, 100% {
            transform: translateX(260%) skewX(-20deg);
          }
        }
        .animate-btn-sheen {
          animation: btnSheen 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes shimmerPass {
          0% {
            transform: translateX(-150%);
          }
          40%, 100% {
            transform: translateX(250%);
          }
        }
        .animate-shimmer {
          animation: shimmerPass 3.5s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.8s ease-in-out infinite;
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
