'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Flame,
  HeartPulse,
  Leaf,
  Menu,
  MessageCircle,
  PackageCheck,
  Plus,
  Truck,
  Wallet,
  X,
} from 'lucide-react';

// ─── Konfigurasi — ganti sebelum dipublikasikan ─────────────────────────
// Nomor WhatsApp bot toko (format internasional, tanpa "+"). Chat yang masuk ke
// nomor ini akan dilayani alur Toko (katalog → keranjang → transfer/COD).
const WA_NUMBER = '6280000000000';
// Harga contoh — samakan dengan harga di menu Toko > Produk.
const PRODUCTS = [
  {
    name: 'Minyak Kelapa 100 ml',
    tag: 'Coba dulu',
    desc: 'Botol kecil untuk mencoba, bekal, atau oles.',
    price: 8000,
    img: '/bogamas/botol-100ml.jpg',
  },
  {
    name: 'Minyak Kelapa 1 Liter',
    tag: 'Paling laris',
    desc: 'Ukuran harian untuk dapur rumah tangga.',
    price: 38000,
    img: '/bogamas/botol-1l.jpg',
  },
  {
    name: 'Minyak Goreng 5 Liter',
    tag: 'Hemat',
    desc: 'Jerigen untuk usaha kuliner & katering.',
    price: 175000,
    img: '/bogamas/jerigen-5l.jpg',
  },
  {
    name: 'Paket 1 Karton (12 × 1 L)',
    tag: 'Reseller',
    desc: 'Harga grosir untuk warung dan reseller.',
    price: 420000,
    img: '/bogamas/paket-karton.jpg',
  },
];

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
const WA_GENERAL = waLink('Halo Bogamas, saya mau pesan minyak kelapa 😊');

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

const NAV = [
  { label: 'Produk', href: '#produk' },
  { label: 'Cerita', href: '#cerita' },
  { label: 'Janji Kami', href: '#janji' },
  { label: 'Cara Pesan', href: '#cara-pesan' },
  { label: 'FAQ', href: '#faq' },
];

const serif = '[font-family:var(--font-bm-serif)]';

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="Bogamas">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E9B10E] text-[13px] font-bold tracking-tight text-[#1F3D2B] ring-2 ring-[#1F3D2B]">
        BM
      </span>
      <span className="leading-none">
        <span className={`${serif} block text-xl font-semibold ${light ? 'text-[#F6F1E7]' : 'text-[#1F3D2B]'}`}>Boga Mas</span>
        <span className={`block text-[10px] uppercase tracking-[0.22em] ${light ? 'text-[#F6F1E7]/60' : 'text-[#7A6A55]'}`}>
          Minyak kelapa · Purworejo
        </span>
      </span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${light ? 'text-[#E9B10E]' : 'text-[#B5850B]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#E9B10E]' : 'bg-[#B5850B]'}`} />
      {children}
    </p>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#2A2118]/10 bg-[#F6F1E7]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-[#2A2118]/80 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-[#1F3D2B]">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#1F3D2B] px-5 py-2.5 text-sm font-medium text-[#F6F1E7] transition hover:bg-[#16301F] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> Pesan via WA
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-[#1F3D2B] md:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#2A2118]/10 px-4 pb-4 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-[#2A2118]">
              {n.label}
            </a>
          ))}
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#1F3D2B] px-5 py-3 text-sm font-medium text-[#F6F1E7]"
          >
            <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-20">
        <div>
          <Eyebrow>Minyak goreng kelapa murni</Eyebrow>
          <h1 className={`${serif} mt-6 text-[2.75rem] font-medium leading-[1.05] text-[#2A2118] sm:text-6xl lg:text-7xl`}>
            Minyak kelapa yang{' '}
            <em className="font-normal italic text-[#B5850B]">jujur</em>, dari dapur Purworejo.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#2A2118]/70">
            Satu bahan. Kelapa pilihan. Tanpa campuran. Gorengan lebih gurih, dapur lebih tenang.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#produk"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F3D2B] px-7 py-3.5 text-sm font-medium text-[#F6F1E7] transition hover:bg-[#16301F]"
            >
              Lihat Produk <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#1F3D2B]/30 px-7 py-3.5 text-sm font-medium text-[#1F3D2B] transition hover:border-[#1F3D2B] hover:bg-[#1F3D2B]/5"
            >
              <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#2A2118]/70">
            {['Non kolesterol', 'Halal MUI', 'Terdaftar PIRT', 'Bisa COD'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-[#1F3D2B]" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#E9B10E]/30 blur-2xl" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(42,33,24,0.35)]">
            <Image
              src="/bogamas/hero.jpg"
              alt="Botol minyak kelapa Boga Mas 1 liter dipegang di antara tanaman"
              fill
              priority
              sizes="(min-width: 768px) 28rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-[#F6F1E7] px-5 py-4 shadow-xl ring-1 ring-[#2A2118]/10 sm:-left-8">
            <p className={`${serif} text-3xl font-semibold text-[#1F3D2B]`}>0 g</p>
            <p className="text-xs text-[#2A2118]/60">kolesterol per sajian</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { k: '100%', v: 'Dari minyak kelapa murni' },
    { k: '0 g', v: 'Kolesterol per sajian 14 g' },
    { k: '4', v: 'Pilihan ukuran, 100 ml – 1 karton' },
    { k: 'PIRT', v: 'Halal MUI & terdaftar resmi' },
  ];
  return (
    <section className="border-y border-[#2A2118]/10 bg-[#EFE7D8]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.v}
            className={`px-4 py-8 text-center ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''} border-[#2A2118]/10`}
          >
            <p className={`${serif} text-3xl font-semibold text-[#1F3D2B] sm:text-4xl`}>{s.k}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#2A2118]/60">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="cerita" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        <div className="relative aspect-square overflow-hidden rounded-[2rem]">
          <Image
            src="/bogamas/cerita.jpg"
            alt="Dua botol minyak kelapa Boga Mas 1 liter"
            fill
            sizes="(min-width: 768px) 32rem, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <Eyebrow>Cerita kami</Eyebrow>
          <h2 className={`${serif} mt-5 text-4xl font-medium leading-tight text-[#2A2118] sm:text-5xl`}>
            Lahir di Purworejo. <em className="italic text-[#B5850B]">Dibuat</em> seperti minyak klentik nenek.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-[#2A2118]/70">
            <p>
              Dulu, minyak kelapa dibuat di dapur sendiri: kelapa diparut, diperas, lalu dimasak pelan sampai jernih.
              Hasilnya harum, gurih, dan awet dipakai menggoreng.
            </p>
            <p>
              Boga Mas meneruskan cara itu dari Purworejo, Jawa Tengah. Kami pakai kelapa pilihan, diolah higienis, dan
              tidak dicampur minyak lain. Yang ada di botol hanya satu: minyak kelapa.
            </p>
          </div>
          <a href="#janji" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] underline-offset-4 hover:underline">
            Baca janji kami <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="produk" className="scroll-mt-20 bg-[#EFE7D8]/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Produk</Eyebrow>
            <h2 className={`${serif} mt-5 text-4xl font-medium text-[#2A2118] sm:text-5xl`}>
              Beda ukuran. <em className="italic text-[#B5850B]">Satu</em> standar.
            </h2>
          </div>
          <p className="max-w-sm text-[#2A2118]/70">
            Dari botol kecil untuk mencoba sampai paket karton untuk reseller — isinya sama: minyak kelapa Boga Mas.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF8F2] ring-1 ring-[#2A2118]/10 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 18rem, 45vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-[#F6F1E7]/95 px-2.5 py-1 text-[9px] sm:left-3 sm:top-3 sm:px-3 sm:text-[11px] font-semibold uppercase tracking-wider text-[#1F3D2B]">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <h3 className={`${serif} text-base font-medium leading-snug text-[#2A2118] sm:text-xl`}>{p.name}</h3>
                <p className="mt-1.5 flex-1 text-xs text-[#2A2118]/60 sm:text-sm">{p.desc}</p>
                <p className="mt-3 font-semibold text-[#1F3D2B] sm:mt-4 sm:text-lg">{rupiah(p.price)}</p>
                <a
                  href={waLink(`Halo Bogamas, saya mau pesan ${p.name} 😊`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#1F3D2B] px-3 py-2 text-sm sm:mt-4 sm:px-4 sm:py-2.5 font-medium text-[#F6F1E7] transition hover:bg-[#16301F]"
                >
                  <MessageCircle className="h-4 w-4" /> Pesan
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurPromise() {
  const items = [
    {
      icon: Leaf,
      t: 'Kelapa saja. Titik.',
      d: 'Tidak dicampur minyak sawit atau minyak lain. Satu bahan dari awal sampai ke botol.',
    },
    {
      icon: HeartPulse,
      t: 'Non kolesterol.',
      d: '0 g kolesterol per sajian, sesuai informasi nilai gizi di label. Pilihan yang lebih tenang untuk masakan keluarga.',
    },
    {
      icon: Flame,
      t: 'Gurih & tahan panas.',
      d: 'Aroma kelapa yang lembut membuat gorengan lebih gurih, dan minyaknya stabil untuk menggoreng berkali-kali.',
    },
    {
      icon: BadgeCheck,
      t: 'Resmi & halal.',
      d: 'Bersertifikat Halal MUI dan terdaftar PIRT 205330601026024. Diproduksi oleh Bogamas, Purworejo.',
    },
  ];
  return (
    <section id="janji" className="scroll-mt-20 bg-[#1F3D2B] text-[#F6F1E7]">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-28">
        <div>
          <Eyebrow light>Janji kami</Eyebrow>
          <h2 className={`${serif} mt-5 text-4xl font-medium leading-tight sm:text-5xl`}>
            Satu bahan.
            <br />
            <em className="italic text-[#E9B10E]">Tanpa</em> campuran.
            <br />
            Tanpa kompromi.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-[#F6F1E7]/70">
            Setiap botol Boga Mas dibuat dengan pertanyaan yang sama: apakah kami mau memakainya di dapur sendiri?
          </p>
        </div>
        <ol className="divide-y divide-[#F6F1E7]/15">
          {items.map((it, i) => (
            <li key={it.t} className="flex gap-6 py-6 first:pt-0">
              <span className="pt-1 text-sm tabular-nums text-[#E9B10E]">0{i + 1}</span>
              <div>
                <h3 className={`${serif} flex items-center gap-2 text-2xl`}>
                  <it.icon className="h-5 w-5 text-[#E9B10E]" /> {it.t}
                </h3>
                <p className="mt-2 leading-relaxed text-[#F6F1E7]/70">{it.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Nutrition() {
  const rows = [
    ['Takaran saji', '14 g'],
    ['Energi total', '138 kkal'],
    ['Lemak total', '14 g'],
    ['Kolesterol', '0 g'],
    ['Karbohidrat total', '0 g'],
  ];
  return (
    <section>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        <div className="order-2 md:order-1">
          <Eyebrow>Transparan</Eyebrow>
          <h2 className={`${serif} mt-5 text-4xl font-medium leading-tight text-[#2A2118] sm:text-5xl`}>
            Baca labelnya. <em className="italic text-[#B5850B]">Kami</em> tidak menyembunyikan apa pun.
          </h2>
          <dl className="mt-8 divide-y divide-[#2A2118]/10 rounded-2xl bg-[#FBF8F2] px-6 ring-1 ring-[#2A2118]/10">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-3.5">
                <dt className="text-[#2A2118]/70">{k}</dt>
                <dd className={`font-semibold ${k === 'Kolesterol' ? 'text-[#1F3D2B]' : 'text-[#2A2118]'}`}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-[#2A2118]/50">Sumber: label Informasi Nilai Gizi pada kemasan Boga Mas.</p>
        </div>
        <div className="relative order-1 aspect-square overflow-hidden rounded-[2rem] md:order-2">
          <Image
            src="/bogamas/nilai-gizi.jpg"
            alt="Label informasi nilai gizi pada botol minyak kelapa Bogamas"
            fill
            sizes="(min-width: 768px) 32rem, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const steps = [
    { icon: MessageCircle, t: 'Chat WhatsApp', d: 'Klik tombol pesan. Admin kami langsung membalas, 24 jam.' },
    { icon: PackageCheck, t: 'Pilih & isi alamat', d: 'Sebutkan ukuran dan jumlah, lalu kirim nama dan alamat lengkap.' },
    { icon: Wallet, t: 'Transfer atau COD', d: 'Bayar via transfer bank, atau bayar di tempat saat paket datang.' },
    { icon: Truck, t: 'Paket dikirim', d: 'Pesanan dikemas rapi dan nomor resi dikirim lewat WhatsApp.' },
  ];
  return (
    <section id="cara-pesan" className="scroll-mt-20 bg-[#EFE7D8]/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Cara pesan</Eyebrow>
          </div>
          <h2 className={`${serif} mt-5 text-4xl font-medium text-[#2A2118] sm:text-5xl`}>
            Pesan semudah <em className="italic text-[#B5850B]">chat</em>.
          </h2>
        </div>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="rounded-3xl bg-[#FBF8F2] p-6 ring-1 ring-[#2A2118]/10">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1F3D2B] text-[#E9B10E]">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className={`${serif} text-3xl text-[#2A2118]/15`}>0{i + 1}</span>
              </div>
              <h3 className={`${serif} mt-5 text-xl font-medium text-[#2A2118]`}>{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2A2118]/65">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'Apa bedanya dengan minyak goreng sawit biasa?',
    a: 'Boga Mas dibuat dari kelapa, bukan sawit. Aromanya lebih harum, gorengan lebih gurih, dan per sajiannya 0 g kolesterol sesuai label nilai gizi.',
  },
  {
    q: 'Apakah sama dengan VCO (virgin coconut oil)?',
    a: 'Bukan. Boga Mas adalah minyak goreng kelapa (coconut cooking oil) — diolah dengan pemanasan seperti minyak klentik, sehingga cocok untuk menggoreng dan menumis sehari-hari.',
  },
  {
    q: 'Kenapa minyaknya bisa membeku?',
    a: 'Itu tanda alami minyak kelapa. Di suhu dingin (di bawah ±24°C) minyak kelapa memadat. Rendam botol di air hangat sebentar dan minyak akan cair kembali tanpa mengubah kualitas.',
  },
  {
    q: 'Bisa bayar di tempat (COD)?',
    a: 'Bisa, untuk area yang dijangkau kurir COD. Selain itu tersedia pembayaran transfer bank. Admin akan mengonfirmasi saat Anda memesan lewat WhatsApp.',
  },
  {
    q: 'Saya mau jadi reseller, bagaimana caranya?',
    a: 'Pilih Paket 1 Karton atau chat admin untuk harga grosir pembelian dalam jumlah besar.',
  },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={`${serif} mt-5 text-4xl font-medium leading-tight text-[#2A2118] sm:text-5xl`}>
            Yang sering <em className="italic text-[#B5850B]">ditanyakan</em>.
          </h2>
          <p className="mt-5 text-[#2A2118]/70">Pertanyaan lain? Tanyakan langsung lewat WhatsApp.</p>
        </div>
        <div className="divide-y divide-[#2A2118]/10 border-y border-[#2A2118]/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium text-[#2A2118] [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-[#B5850B] transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 leading-relaxed text-[#2A2118]/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[2rem] bg-[#E9B10E] md:grid-cols-[1.2fr_0.8fr]">
        <div className="p-8 sm:p-12">
          <h2 className={`${serif} text-4xl font-medium leading-tight text-[#1F3D2B] sm:text-5xl`}>
            Ganti minyak di dapur Anda <em className="italic">hari ini</em>.
          </h2>
          <p className="mt-4 max-w-md text-[#1F3D2B]/80">
            Chat kami sekarang — admin siap bantu pilih ukuran, cek ongkir, dan proses pesanan Anda.
          </p>
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1F3D2B] px-7 py-3.5 text-sm font-medium text-[#F6F1E7] transition hover:bg-[#16301F]"
          >
            <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
          </a>
        </div>
        <div className="relative hidden h-full min-h-[320px] md:block">
          <Image src="/bogamas/duo.jpg" alt="Minyak kelapa Boga Mas" fill sizes="24rem" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2A2118] text-[#F6F1E7]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F6F1E7]/60">
            Minyak goreng kelapa murni dari Purworejo, Jawa Tengah. Satu bahan, tanpa campuran.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E9B10E]">Belanja</p>
          <ul className="mt-4 space-y-2 text-sm text-[#F6F1E7]/70">
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <a href="#produk" className="hover:text-[#F6F1E7]">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E9B10E]">Kontak</p>
          <ul className="mt-4 space-y-2 text-sm text-[#F6F1E7]/70">
            <li>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="hover:text-[#F6F1E7]">
                WhatsApp: +{WA_NUMBER}
              </a>
            </li>
            <li>Purworejo, Jawa Tengah</li>
            <li>PIRT 205330601026024 · Halal MUI</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#F6F1E7]/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-[#F6F1E7]/40 sm:px-6">
          © {new Date().getFullYear()} Boga Mas. Minyak goreng kelapa murni.
        </p>
      </div>
    </footer>
  );
}

function FloatingWa() {
  return (
    <a
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan via WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export default function BogamasLanding() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#2A2118] [font-family:var(--font-bm-sans)]">
      <div className="bg-[#1F3D2B] px-4 py-2 text-center text-xs tracking-wide text-[#F6F1E7]/90">
        Pesan langsung via WhatsApp — bisa transfer atau COD
      </div>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Story />
        <Products />
        <OurPromise />
        <Nutrition />
        <HowToOrder />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <FloatingWa />
    </div>
  );
}
