import { useRouter } from 'next/router';
import { ru } from '../locales/ru';
import { en } from '../locales/en';
import { th } from '../locales/th';
import { he } from '../locales/he';

export default function Home() {
  const { locale } = useRouter();
  const t = locale === 'ru' ? ru : locale === 'th' ? th : locale === 'he' ? he : en;
  const R2_URL = "https://pub-your-id.r2.dev"; // ВАШ URL ИЗ CLOUDFLARE

  return (
    <div dir={t.dir} className="bg-white min-h-screen font-sans">
      <nav className="p-6 flex justify-between fixed w-full z-50 bg-white/50 backdrop-blur">
        <div className="font-bold text-xl uppercase tracking-tighter">Atelier Samui</div>
        <div className="space-x-4 uppercase text-xs">
          <a href="/ru" className="px-2">RU</a>
          <a href="/en" className="px-2">EN</a>
          <a href="/th" className="px-2">TH</a>
          <a href="/he" className="px-2 font-hebrew">HE</a>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover grayscale-[0.5]">
          <source src={`${R2_URL}/promo-video.mp4`} type="video/mp4" />
        </video>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">{t.heroH1}</h1>
          <p className="text-xl md:text-2xl font-extralight uppercase tracking-widest">{t.heroP}</p>
        </div>
      </section>
    </div>
  );
}
