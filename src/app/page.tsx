import type { Metadata } from 'next';
import { Cormorant, DM_Sans } from 'next/font/google';
import BogamasLanding from '@/components/BogamasLanding';

const serif = Cormorant({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-bm-serif' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-bm-sans' });

export const metadata: Metadata = {
  title: 'Bogamas — Minyak Goreng Kelapa Murni dari Purworejo',
  description:
    'Minyak goreng kelapa Bogamas: dibuat di Purworejo sejak 2010 dari kelapa pilihan, non kolesterol, halal & terdaftar PIRT. Tersedia 1 liter, 1,5 liter, 5 liter, dan paket karton. Pesan langsung via WhatsApp.',
  openGraph: {
    title: 'Bogamas — Minyak Goreng Kelapa Murni',
    description: 'Satu bahan. Kelapa pilihan. Tanpa campuran. Pesan via WhatsApp, bisa transfer atau COD.',
    images: ['/bogamas/hero.jpg'],
  },
};

export default function BogamasPage() {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <BogamasLanding />
    </div>
  );
}
