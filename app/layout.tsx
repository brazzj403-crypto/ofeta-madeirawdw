import type {Metadata} from 'next';
import { Poppins } from 'next/font/google';
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
  openGraph: {
    title: '+150 Moldes de Artesanato em Madeira',
    description: 'Página de vendas para pacote de moldes de artesanato em madeira.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '+150 Moldes de Artesanato em Madeira',
    description: 'Página de vendas para pacote de moldes de artesanato em madeira.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
