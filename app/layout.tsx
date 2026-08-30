import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css'; // Global styles

const poppins = Poppins({ 
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '+150 Moldes de Artesanato em Madeira',
  description: 'Página de vendas para pacote de moldes de artesanato em madeira.',
  icons: {
    icon: 'https://i.imgur.com/BGHEp1E.png',
    shortcut: 'https://i.imgur.com/BGHEp1E.png',
    apple: 'https://i.imgur.com/BGHEp1E.png',
  },
  openGraph: {
    title: '+150 Moldes de Artesanato em Madeira',
    description: 'Página de vendas para pacote de moldes de artesanato em madeira.',
    images: ['https://i.imgur.com/BGHEp1E.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '+150 Moldes de Artesanato em Madeira',
    description: 'Página de vendas para pacote de moldes de artesanato em madeira.',
    images: ['https://i.imgur.com/BGHEp1E.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Favicon / Ícone da Guia do Navegador */}
        <link rel="icon" href="https://i.imgur.com/BGHEp1E.png" type="image/png" />
        <link rel="shortcut icon" href="https://i.imgur.com/BGHEp1E.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/BGHEp1E.png" />

        {/* Meta Pixel Code & Tracking */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1765022624917316');
              fbq('track', 'PageView');
              fbq('track', 'ViewContent', {
                content_name: '+150 Moldes de Artesanato em Madeira',
                content_category: 'Woodworking Plans & Craft Courses',
                currency: 'BRL',
                value: 27.00
              });
            `,
          }}
        />

        {/* Script de Repasse Automático de UTMs e Disparo de InitiateCheckout */}
        <Script
          id="cakto-utm-and-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setupTrackingAndUtms() {
                  try {
                    var currentUrlParams = new URLSearchParams(window.location.search);
                    
                    // Buscar todos os links da página
                    var links = document.querySelectorAll('a[href*="pay.cakto.com.br"], a[href*="cakto.com.br"]');
                    
                    links.forEach(function(link) {
                      var originalHref = link.getAttribute('href');
                      if (!originalHref) return;

                      // 1. Repasse de parâmetros e UTMs
                      if (currentUrlParams.toString()) {
                        try {
                          var targetUrl = new URL(originalHref, window.location.origin);
                          
                          // Anexa todas as UTMs e parâmetros existentes na LP preservando os do destino
                          currentUrlParams.forEach(function(value, key) {
                            if (!targetUrl.searchParams.has(key)) {
                              targetUrl.searchParams.set(key, value);
                            }
                          });

                          link.setAttribute('href', targetUrl.toString());
                        } catch(e) {
                          // Fallback para URLs relativas ou com sintaxe especial
                          var separator = originalHref.indexOf('?') !== -1 ? '&' : '?';
                          link.setAttribute('href', originalHref + separator + currentUrlParams.toString());
                        }
                      }

                      // 2. Disparo de InitiateCheckout no clique (evitando múltiplos listeners)
                      if (!link.dataset.trackingAttached) {
                        link.dataset.trackingAttached = 'true';
                        link.addEventListener('click', function() {
                          if (typeof window.fbq === 'function') {
                            window.fbq('track', 'InitiateCheckout', {
                              content_name: '+150 Moldes de Madeira',
                              currency: 'BRL',
                              destination_url: link.getAttribute('href')
                            });
                          }
                        });
                      }
                    });
                  } catch (err) {
                    console.error('Erro no tracking Cakto/UTM:', err);
                  }
                }

                // Executa assim que o DOM estiver pronto
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', setupTrackingAndUtms);
                } else {
                  setupTrackingAndUtms();
                }

                // Observa possíveis novos modais ou botões renderizados dinamicamente
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function() {
                    setupTrackingAndUtms();
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                }
              })();
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1765022624917316&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
