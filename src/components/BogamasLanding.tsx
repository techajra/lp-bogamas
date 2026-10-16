'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Menu, MessageCircle, Plus, X } from 'lucide-react';

// ─── Konfigurasi — ganti sebelum dipublikasikan ─────────────────────────
// Nomor WhatsApp bot toko (format internasional, tanpa "+"). Chat yang masuk ke
// nomor ini akan dilayani alur Toko (katalog → keranjang → transfer/COD).
const WA_NUMBER = '6280000000000';
// Harga contoh — samakan dengan harga di menu Toko > Produk.
const PRODUCTS = [
  {
    name: 'Minyak Kelapa 100 ml',
    desc: 'Botol kecil untuk mencoba, bekal, atau oles.',
    price: 8000,
    img: '/bogamas/botol-100ml.jpg',
  },
  {
    name: 'Minyak Kelapa 1 Liter',
    desc: 'Ukuran harian untuk dapur rumah tangga.',
    price: 38000,
    img: '/bogamas/botol-1l.jpg',
  },
  {
    name: 'Minyak Goreng 5 Liter',
    desc: 'Jerigen untuk usaha kuliner & katering.',
    price: 175000,
    img: '/bogamas/jerigen-5l.jpg',
  },
  {
    name: 'Paket 1 Karton (12 × 1 L)',
    desc: 'Harga grosir untuk warung dan reseller.',
    price: 420000,
    img: '/bogamas/paket-karton.jpg',
  },
];
// Ulasan CONTOH — ganti dengan ulasan asli pelanggan (dengan izin) sebelum dipublikasikan.
const REVIEWS = [
  {
    t: 'Gorengan lebih gurih',
    q: 'Tempe dan kerupuk jadi lebih harum dan renyah. Minyaknya juga tidak cepat hitam walau dipakai beberapa kali.',
    n: 'Contoh pelanggan',
  },
  {
    t: 'Seperti minyak klentik',
    q: 'Aromanya mengingatkan minyak klentik buatan nenek di kampung. Sekarang tidak perlu repot bikin sendiri.',
    n: 'Contoh pelanggan',
  },
  {
    t: 'Pesan gampang',
    q: 'Tinggal chat WhatsApp, admin langsung balas. Bisa COD juga, paket datang rapi dan aman.',
    n: 'Contoh pelanggan',
  },
];
// ─────────────────────────────────────────────────────────────────────────

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
const WA_GENERAL = waLink('Halo Bogamas, saya mau pesan minyak kelapa 😊');

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

const NAV = [
  { label: 'Produk', href: '#produk' },
  { label: 'Cerita Kami', href: '#cerita' },
  { label: 'Janji Kami', href: '#janji' },
  { label: 'FAQ', href: '#faq' },
];

const ANNOUNCEMENTS = [
  'Pesan langsung via WhatsApp — bisa transfer atau COD',
  'Minyak goreng kelapa murni dari Purworejo',
  'Halal MUI · Terdaftar PIRT · Non kolesterol',
];

const CLAIMS = [
  'Kelapa saja. Tanpa campuran.',
  'Dibuat di Purworejo',
  '0 g kolesterol per sajian',
  'Halal MUI',
  'Terdaftar PIRT',
  'Bisa COD',
];

const serif = '[font-family:var(--font-bm-serif)]';
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

// Tombol bergaya Cocofina: kotak, huruf renggang, tanpa sudut bulat.
const btnSolid =
  'inline-flex items-center justify-center gap-2 bg-[#C8163E] px-7 py-3.5 text-[15px] tracking-[0.06em] text-white transition hover:bg-[#A8112F]';
const btnOutlineLight =
  'inline-flex items-center justify-center gap-2 border border-[#FAF7F2]/70 px-7 py-3.5 text-[15px] tracking-[0.06em] text-[#FAF7F2] transition hover:bg-[#FAF7F2]/10';

function Logo() {
  return (
    <a href="#" aria-label="Bogamas" className="block bg-[#C8163E] px-2.5 py-1.5 text-center leading-none text-white">
      <span className="block text-[17px] font-bold tracking-tight">BOGA</span>
      <span className="block text-[17px] font-bold tracking-tight">MAS</span>
      <span className="mt-0.5 block text-[6.5px] uppercase tracking-[0.12em] text-white/85">minyak kelapa</span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#C8163E]">
      <span className="h-px w-10 bg-[#C8163E]" />
      {children}
    </p>
  );
}

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ANNOUNCEMENTS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const go = (d: number) => setI((v) => (v + d + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  return (
    <div className="bg-[#1A1208] text-[#FAF7F2]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-8">
        <button onClick={() => go(-1)} aria-label="Pengumuman sebelumnya" className="p-1 text-[#FAF7F2]/80 hover:text-[#FAF7F2]">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className={`${serif} text-center text-[15px]`} aria-live="polite">
          {ANNOUNCEMENTS[i]}
        </p>
        <button onClick={() => go(1)} aria-label="Pengumuman berikutnya" className="p-1 text-[#FAF7F2]/80 hover:text-[#FAF7F2]">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#1A1208]/10 bg-[#FAF7F2]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-8">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 text-[15px] tracking-[0.03em] text-[#1A1208] md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="underline-offset-4 hover:underline">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={WA_GENERAL}
            {...ext}
            className="hidden items-center gap-2 px-3 py-2 text-[15px] tracking-[0.03em] text-[#1A1208] underline-offset-4 hover:underline sm:inline-flex"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} /> Pesan
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center text-[#1A1208] md:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#1A1208]/10 px-4 pb-4 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-[#1A1208]/10 py-3.5 text-[#1A1208]">
              {n.label}
            </a>
          ))}
          <a href={WA_GENERAL} {...ext} className={`${btnSolid} mt-4 w-full`}>
            <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#EDE5D8]">
      {/* Foto mengisi sisi kanan; foto produk saat ini portrait & resolusi kecil, jadi tidak dibuat full-bleed. */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] md:block">
        <Image
          src="/bogamas/hero.jpg"
          alt="Botol minyak kelapa Boga Mas 1 liter dipegang di antara tanaman"
          fill
          priority
          sizes="58vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-[4/5] w-full md:hidden">
        <Image
          src="/bogamas/hero.jpg"
          alt="Botol minyak kelapa Boga Mas 1 liter dipegang di antara tanaman"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto flex max-w-6xl px-4 sm:px-8 md:min-h-[620px] md:items-end md:pb-14">
        <div className="-mt-24 w-full bg-[#1A1208]/95 px-6 py-8 text-[#FAF7F2] sm:px-10 sm:py-10 md:mt-0 md:max-w-xl">
          <h1 className={`${serif} text-[2.6rem] leading-[1.08] sm:text-[3.4rem]`}>
            Minyak kelapa yang <em className="not-italic text-[#E0506D]">jujur</em>, dari dapur Purworejo.
          </h1>
          <p className="mt-5 text-base tracking-[0.03em] text-[#FAF7F2]/80">
            Satu bahan. Kelapa pilihan. Tanpa campuran.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#produk" className={btnSolid}>
              Lihat Produk
            </a>
            <a href="#cerita" className={btnOutlineLight}>
              Cerita Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...CLAIMS, ...CLAIMS];
  return (
    <div className="bg-[#FAF7F2] py-10">
      <div className="overflow-hidden bg-[#1A1208] py-3.5 text-[#FAF7F2]/80">
        <div className="flex w-max animate-[bm-marquee_40s_linear_infinite] motion-reduce:animate-none">
          {row.map((c, i) => (
            <span key={i} className="flex items-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em]">
              <span className="px-10">{c}</span>
              <span aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { k: '100%', v: 'Dari minyak kelapa murni' },
    { k: '0 g', v: 'Kolesterol per sajian 14 g' },
    { k: '4', v: 'Pilihan ukuran, 100 ml sampai 1 karton' },
    { k: 'PIRT', v: 'Halal MUI & terdaftar resmi' },
  ];
  return (
    <section className="border-y border-[#1A1208]/10 bg-[#FAF7F2]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-8 md:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.v}
            className={`px-4 py-10 text-center border-[#1A1208]/10 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
          >
            <p className={`${serif} text-5xl text-[#C8163E] sm:text-[3.25rem]`}>{s.k}</p>
            <p className="mx-auto mt-3 max-w-[12rem] text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#1A1208]/70">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="cerita" className="scroll-mt-20 bg-[#FAF7F2] py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center bg-[#EFE8DD] md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[640px]">
          <Image src="/bogamas/cerita.jpg" alt="Dua botol minyak kelapa Boga Mas 1 liter" fill sizes="(min-width: 768px) 36rem, 100vw" className="object-cover" />
        </div>
        <div className="px-6 py-12 sm:px-12 md:py-16">
          <h2 className={`${serif} text-[2.6rem] leading-[1.15] text-[#1A1208] sm:text-5xl`}>
            Lahir di Purworejo. Dibuat seperti minyak klentik nenek.
          </h2>
          <div className="mt-7 space-y-4 leading-[1.8] tracking-[0.03em] text-[#1A1208]/75">
            <p>
              Dulu, minyak kelapa dibuat di dapur sendiri: kelapa diparut, diperas, lalu dimasak pelan sampai jernih.
              Hasilnya harum, gurih, dan awet dipakai menggoreng.
            </p>
            <p>
              Boga Mas meneruskan cara itu dari Purworejo, Jawa Tengah. Kami pakai kelapa pilihan, diolah higienis, dan
              tidak dicampur minyak lain. Yang ada di botol hanya satu: minyak kelapa.
            </p>
          </div>
          <a href="#janji" className={`${btnSolid} mt-9`}>
            Baca janji kami
          </a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="produk" className="scroll-mt-20 bg-[#FAF7F2] pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className={`${serif} text-3xl text-[#1A1208] sm:text-[2.1rem]`}>Beda ukuran. Satu standar.</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="group">
              <a href={waLink(`Halo Bogamas, saya mau pesan ${p.name} 😊`)} {...ext} className="block">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 17rem, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className={`${serif} mt-3 text-[17px] leading-snug text-[#1A1208] underline-offset-4 group-hover:underline`}>
                  {p.name} — {p.desc}
                </h3>
              </a>
              <p className="mt-2 text-[15px] tracking-[0.05em] text-[#1A1208]">{rupiah(p.price)}</p>
              <a
                href={waLink(`Halo Bogamas, saya mau pesan ${p.name} 😊`)}
                {...ext}
                className="mt-2 inline-flex items-center gap-1.5 text-[13px] tracking-[0.06em] text-[#C8163E] hover:underline"
              >
                Pesan via WhatsApp <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-[#FAF7F2] pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className={`${serif} text-4xl text-[#1A1208] sm:text-[2.6rem]`}>Ulasan</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.t} className="bg-[#EFEBE5] p-7">
              <p className={`${serif} text-xl text-[#1A1208]`}>{r.t}</p>
              <blockquote className="mt-4 leading-[1.75] tracking-[0.03em] text-[#1A1208]/75">{r.q}</blockquote>
              <figcaption className="mt-3 font-semibold text-[#1A1208]/80">— {r.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurPromise() {
  const items = [
    { t: 'Kelapa saja. Titik.', d: 'Tidak dicampur minyak sawit atau minyak lain. Satu bahan dari awal sampai ke botol.' },
    {
      t: 'Non kolesterol.',
      d: '0 g kolesterol per sajian, sesuai informasi nilai gizi di label. Pilihan yang lebih tenang untuk masakan keluarga.',
    },
    {
      t: 'Gurih & tahan panas.',
      d: 'Aroma kelapa yang lembut membuat gorengan lebih gurih, dan minyaknya stabil untuk menggoreng berkali-kali.',
    },
    { t: 'Resmi & halal.', d: 'Bersertifikat Halal MUI dan terdaftar PIRT 205330601026024. Diproduksi oleh Bogamas, Purworejo.' },
  ];
  return (
    <section id="janji" className="scroll-mt-20 bg-[#1A1208] text-[#FAF7F2]">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <div>
          <Eyebrow>Janji kami</Eyebrow>
          <h2 className={`${serif} mt-6 text-[2.6rem] leading-[1.15] sm:text-5xl`}>
            Satu bahan.
            <br />
            <em className="text-[#E0506D]">Tanpa campuran.</em>
            <br />
            Tanpa kompromi.
          </h2>
          <p className="mt-8 max-w-md leading-[1.8] tracking-[0.03em] text-[#FAF7F2]/70">
            Setiap botol Boga Mas dibuat dengan pertanyaan yang sama: apakah kami mau memakainya di dapur sendiri?
            Jawabannya harus selalu iya.
          </p>
        </div>
        <ol className="space-y-9">
          {items.map((it, i) => (
            <li key={it.t} className="flex gap-8">
              <span className="pt-1.5 text-xs tabular-nums text-[#C8163E]">0{i + 1}</span>
              <div>
                <h3 className={`${serif} text-2xl`}>{it.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.75] tracking-[0.03em] text-[#FAF7F2]/65">{it.d}</p>
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
    <section className="bg-[#FAF7F2] py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center bg-[#EFE8DD] md:grid-cols-2">
        <div className="order-2 px-6 py-12 sm:px-12 md:order-1 md:py-16">
          <h2 className={`${serif} text-[2.6rem] leading-[1.15] text-[#1A1208] sm:text-5xl`}>
            Baca labelnya. Kami tidak menyembunyikan apa pun.
          </h2>
          <dl className="mt-8 border-t border-[#1A1208]/15">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-[#1A1208]/15 py-3.5 tracking-[0.03em]">
                <dt className="text-[#1A1208]/70">{k}</dt>
                <dd className={k === 'Kolesterol' ? 'font-semibold text-[#C8163E]' : 'text-[#1A1208]'}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs tracking-[0.03em] text-[#1A1208]/50">Sumber: label Informasi Nilai Gizi pada kemasan Boga Mas.</p>
        </div>
        <div className="relative order-1 aspect-square md:order-2 md:aspect-auto md:h-full md:min-h-[600px]">
          <Image
            src="/bogamas/nilai-gizi.jpg"
            alt="Label informasi nilai gizi pada botol minyak kelapa Bogamas"
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const steps = [
    { t: 'Chat WhatsApp', d: 'Klik tombol pesan. Admin kami langsung membalas, 24 jam.' },
    { t: 'Pilih & isi alamat', d: 'Sebutkan ukuran dan jumlah, lalu kirim nama dan alamat lengkap.' },
    { t: 'Transfer atau COD', d: 'Bayar via transfer bank, atau bayar di tempat saat paket datang.' },
    { t: 'Paket dikirim', d: 'Pesanan dikemas rapi dan nomor resi dikirim lewat WhatsApp.' },
  ];
  return (
    <section id="cara-pesan" className="scroll-mt-20 border-t border-[#1A1208]/10 bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:py-24">
        <Eyebrow>Cara pesan</Eyebrow>
        <h2 className={`${serif} mt-6 text-4xl text-[#1A1208] sm:text-[2.6rem]`}>Pesan semudah chat.</h2>
        <ol className="mt-10 grid border-t border-[#1A1208]/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={`border-b border-[#1A1208]/10 py-7 lg:border-b-0 lg:px-6 lg:first:pl-0 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-6 lg:pl-6' : 'sm:pr-6'}`}
            >
              <span className="text-xs tabular-nums text-[#C8163E]">0{i + 1}</span>
              <h3 className={`${serif} mt-3 text-2xl text-[#1A1208]`}>{s.t}</h3>
              <p className="mt-2 text-[15px] leading-[1.75] tracking-[0.03em] text-[#1A1208]/70">{s.d}</p>
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
    <section id="faq" className="scroll-mt-20 bg-[#EFE8DD]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className={`${serif} mt-6 text-4xl leading-[1.15] text-[#1A1208] sm:text-[2.6rem]`}>Yang sering ditanyakan.</h2>
          <p className="mt-5 tracking-[0.03em] text-[#1A1208]/70">Pertanyaan lain? Tanyakan langsung lewat WhatsApp.</p>
        </div>
        <div className="border-t border-[#1A1208]/15">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-[#1A1208]/15 py-5">
              <summary className={`${serif} flex cursor-pointer list-none items-center justify-between gap-4 text-left text-xl text-[#1A1208] [&::-webkit-details-marker]:hidden`}>
                {f.q}
                <Plus className="h-5 w-5 shrink-0 text-[#C8163E] transition group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              <p className="mt-3 leading-[1.75] tracking-[0.03em] text-[#1A1208]/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-[#FAF7F2] px-4 py-16 text-center sm:px-8 md:py-20">
      <h2 className={`${serif} text-[2.6rem] leading-tight text-[#1A1208] sm:text-5xl`}>Ganti minyak di dapur hari ini.</h2>
      <p className="mx-auto mt-4 max-w-md tracking-[0.03em] text-[#1A1208]/75">
        Chat kami sekarang — admin siap bantu pilih ukuran, cek ongkir, dan proses pesanan Anda.
      </p>
      <a
        href={WA_GENERAL}
        {...ext}
        className="mx-auto mt-8 flex max-w-sm items-center justify-between border border-[#1A1208]/60 px-5 py-3.5 text-left tracking-[0.03em] text-[#1A1208] transition hover:border-[#1A1208]"
      >
        Pesan via WhatsApp <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </a>
    </section>
  );
}

function Footer() {
  const badges = ['Halal MUI', 'Terdaftar PIRT', 'Non kolesterol', 'Bisa COD'];
  const info = [
    { label: 'Cerita Kami', href: '#cerita' },
    { label: 'Janji Kami', href: '#janji' },
    { label: 'Cara Pesan', href: '#cara-pesan' },
    { label: 'FAQ', href: '#faq' },
  ];
  const head = 'text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/45';
  const link = 'text-[14px] tracking-[0.03em] text-[#FAF7F2]/75 hover:text-[#FAF7F2]';
  return (
    <footer className="bg-[#1A1208] text-[#FAF7F2]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className={`${serif} text-2xl`}>Minyak Kelapa Boga Mas</p>
          <p className={`${head} mt-3`}>Purworejo, Jawa Tengah</p>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed tracking-[0.03em] text-[#FAF7F2]/65">
            Dibuat di Purworejo. Satu bahan, tanpa campuran.
          </p>
          <ul className="mt-5 flex max-w-xs flex-wrap gap-2">
            {badges.map((b) => (
              <li key={b} className="border border-[#FAF7F2]/20 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#FAF7F2]/60">
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={head}>Belanja</p>
          <ul className="mt-4 space-y-2.5">
            {PRODUCTS.map((p) => (
              <li key={p.name}>
                <a href="#produk" className={link}>
                  {p.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#produk" className="text-[14px] tracking-[0.03em] text-[#E0506D] hover:underline">
                Semua produk →
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className={head}>Bogamas</p>
          <ul className="mt-4 space-y-2.5">
            {info.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={head}>Kontak</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={WA_GENERAL} {...ext} className={link}>
                WhatsApp: +{WA_NUMBER}
              </a>
            </li>
            <li className="text-[14px] tracking-[0.03em] text-[#FAF7F2]/75">PIRT 205330601026024</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#FAF7F2]/10">
        {/* pb/pr ekstra supaya teks tidak tertutup tombol WhatsApp melayang */}
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-24 pt-6 text-[11px] tracking-[0.03em] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6 sm:pr-24">
          <p className="text-[#FAF7F2]/40">© {new Date().getFullYear()} Boga Mas. Minyak goreng kelapa murni.</p>
          <p className="uppercase tracking-[0.14em] text-[#E0506D]">Kelapa saja. Tanpa campuran.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWa() {
  return (
    <a
      href={WA_GENERAL}
      {...ext}
      aria-label="Pesan via WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export default function BogamasLanding() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1208] [font-family:var(--font-bm-sans)]">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Story />
        <Products />
        <Reviews />
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
