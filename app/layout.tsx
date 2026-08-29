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

        {/* Meta Pixel Code */}
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
