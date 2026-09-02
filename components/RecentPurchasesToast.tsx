'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

interface PurchaseItem {
  name: string;
  location: string;
  plan: string;
  timeAgo: string;
}

const purchasesList: PurchaseItem[] = [
  {
    name: 'Carlos Eduardo',
    location: 'Campinas, SP',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 2 minutos'
  },
  {
    name: 'Marcos Vinícius',
    location: 'Belo Horizonte, MG',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 4 minutos'
  },
  {
    name: 'Antônio S.',
    location: 'Curitiba, PR',
    plan: 'Moldes de Artesanato',
    timeAgo: 'há 6 minutos'
  },
  {
    name: 'José Roberto',
    location: 'Goiânia, GO',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 3 minutos'
  },
  {
    name: 'Paulo Henrique',
    location: 'Porto Alegre, RS',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 7 minutos'
  },
  {
    name: 'Fernando Dias',
    location: 'São Paulo, SP',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 1 minuto'
  },
  {
    name: 'Lucas Mendes',
    location: 'Salvador, BA',
    plan: 'Moldes de Artesanato',
    timeAgo: 'há 9 minutos'
  },
  {
    name: 'Cláudio N.',
    location: 'Florianópolis, SC',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 5 minutos'
  },
  {
    name: 'Valdir Ramos',
    location: 'Joinville, SC',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 3 minutos'
  },
  {
    name: 'Marcelo Castro',
    location: 'Brasília, DF',
    plan: 'Pacote Completo (+5 Bônus)',
    timeAgo: 'há 8 minutos'
  }
];

export default function RecentPurchasesToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Primeiro toast aparece após 5 segundos da entrada na página
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (!isVisible || isDismissed) return;

    // Permanece visível por 5.5 segundos
    const hideTimer = setTimeout(() => {
      setIsVisible(false);

      // Aguarda 9 a 14 segundos antes de mostrar a próxima compra
      const nextDelay = Math.floor(Math.random() * 5000) + 9000;
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % purchasesList.length);
        setIsVisible(true);
      }, nextDelay);

      return () => clearTimeout(nextTimer);
    }, 5500);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isDismissed]);

  if (isDismissed) return null;

  const currentPurchase = purchasesList[currentIndex];

  return (
    <div
      aria-live="polite"
      className={`fixed z-40 left-3 sm:left-5 bottom-20 sm:bottom-6 max-w-[340px] w-[calc(100%-24px)] sm:w-auto transition-all duration-400 ease-out transform pointer-events-auto ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200/90 flex items-start gap-3">
        {/* Ícone de confirmação de compra com fundo verde esmeralda */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <ShoppingBag className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Informações da compra */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
              {currentPurchase.name}
            </span>
            <span className="text-[11px] font-medium text-neutral-500">
              de {currentPurchase.location}
            </span>
          </div>

          <p className="text-xs text-neutral-700 font-medium leading-snug mt-0.5">
            adquiriu o <strong className="font-bold text-amber-700">{currentPurchase.plan}</strong>
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-neutral-400">
              {currentPurchase.timeAgo}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
              Compra Verificada
            </span>
          </div>
        </div>

        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
