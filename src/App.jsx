import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  Calculator as CalcIcon, 
  ArrowRight,
  Send,
  CheckCircle2,
  Info,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Send as TelegramIcon
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ ---
// Замените на ваш реальный URL из Cloudflare R2
const R2_URL = "https://pub-your-id.r2.dev"; 
const CONTACT_PHONE = "+66 6 2335 7340";
const CONTACT_WHATSAPP = "66623357340";
const CONTACT_INSTAGRAM = "https://www.instagram.com/ateliersamui";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.2177285244634!2d100.00830226956194!3d9.56549419940743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f39fecf41fd3%3A0x40d66fd948899b7d!2sATELIER%20CARPENTRY%20WOOD%20SHOP!5e1!3m2!1sru!2sth!4v1768539608346!5m2!1sru!2sth";

// --- СЛОВАРИ ПЕРЕВОДОВ ---
const translations = {
  en: {
    heroTitle: "Elegance of Palm Wood",
    heroSub: "Minimalist interior solutions for luxury villas and hotels in Thailand.",
    catalog: "Catalog",
    calc: "Calculator",
    projects: "Projects",
    about: "About",
    contact: "Contact Us",
    dir: "ltr",
    calcTitle: "Project Estimator",
    width: "Width (cm)",
    height: "Height (cm)",
    area: "Total Area",
    result: "Estimated Project Cost",
    formTitle: "Start Your Project",
    formType: "Interest In",
    formSubmit: "Send Request",
    formSuccess: "Thank you! We will contact you shortly.",
    types: ["Partitions", "Wall Systems", "Furniture", "Custom Decor"],
    catTitle: "Our Collections",
    catSub: "Hand-crafted sustainable solutions.",
    projTitle: "Featured Projects",
    projSub: "Excellence delivered across Samui and Phuket.",
    contactTitle: "Get in Touch",
    locationTitle: "Visit Our Shop"
  },
  ru: {
    heroTitle: "Эстетика Пальмового Дерева",
    heroSub: "Минималистичные интерьерные решения для вилл и отелей в Таиланде.",
    catalog: "Каталог",
    calc: "Калькулятор",
    projects: "Проекты",
    about: "О нас",
    contact: "Связаться",
    dir: "ltr",
    calcTitle: "Расчет проекта",
    width: "Ширина (см)",
    height: "Высота (см)",
    area: "Общая площадь",
    result: "Ориентировочная стоимость",
    formTitle: "Начать проект",
    formType: "Тип изделия",
    formSubmit: "Отправить заявку",
    formSuccess: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    types: ["Перегородки", "Стеновые системы", "Мебель", "Декор на заказ"],
    catTitle: "Наши коллекции",
    catSub: "Экологичные решения ручной работы.",
    projTitle: "Наши Проекты",
    projSub: "Превосходство в деталях на Самуи и Пхукете.",
    contactTitle: "Контакты",
    locationTitle: "Наше производство"
  },
  th: {
    heroTitle: "ความสง่างามของไม้ปาล์ม",
    heroSub: "โซลูชั่นการตกแต่งภายในแบบมินิมอลสำหรับวิลล่าและโรงแรมหรูในประเทศไทย",
    catalog: "แคตตาล็อก",
    calc: "เครื่องคิดเลข",
    projects: "โครงการ",
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อเรา",
    dir: "ltr",
    calcTitle: "เครื่องคำนวณโครงการ",
    width: "ความกว้าง (ซม.)",
    height: "ความสูง (ซม.)",
    area: "พื้นที่ทั้งหมด",
    result: "ราคาประเมินโครงการ",
    formTitle: "เริ่มโครงการของคุณ",
    formType: "สนใจสินค้า",
    formSubmit: "ส่งคำขอ",
    formSuccess: "ขอบคุณ! เราจะติดต่อคุณกลับโดยเร็วที่สุด",
    types: ["ฉากกั้น", "ระบบผนัง", "เฟอร์นิเจอร์", "ของตกแต่งตามสั่ง"],
    catTitle: "คอลเลกชันของเรา",
    catSub: "โซลูชั่นที่ยั่งยืนด้วยฝีมือประณีต",
    projTitle: "โครงการเด่น",
    projSub: "ความเป็นเลิศที่ส่งมอบทั่วสมุยและภูเก็ต",
    contactTitle: "ติดต่อเรา",
    locationTitle: "เยี่ยมชมร้านของเรา"
  },
  he: {
    heroTitle: "אלגנטיות של עץ דקל",
    heroSub: "פתרונות פנים מינימליסטיים לוילות ובתי מלון יוקרתיים בתאילנד.",
    catalog: "קטלוג",
    calc: "מחשבון",
    projects: "פרויקטים",
    about: "אודות",
    contact: "צור קשר",
    dir: "rtl",
    calcTitle: "אומדן פרויקט",
    width: "רוחב (ס״מ)",
    height: "גובה (ס״מ)",
    area: "שטח כולל",
    result: "עלות פרויקט מוערכת",
    formTitle: "התחל פרויקט",
    formType: "סוג מוצר",
    formSubmit: "שלח בקשה",
    formSuccess: "תודה! נחזור אליך בהקדם.",
    types: ["מחיצות", "מערכות קיר", "רהיטים", "עיצוב בהתאמה אישית"],
    catTitle: "הקולקציות שלנו",
    catSub: "פתרונות ברי קיימא בעבודת יד",
    projTitle: "פרויקטים נבחרים",
    projSub: "מצוינות בביצוע בסאמוי ובפוקט",
    contactTitle: "צור קשר",
    locationTitle: "בקר אצלנו"
  }
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [calcData, setCalcData] = useState({ width: 300, height: 250, density: 1 });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang, t.dir, page]);

  const areaSqM = ((calcData.width * calcData.height) / 10000).toFixed(2);
  const estimatedPrice = (areaSqM * 4500 * calcData.density).toLocaleString();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // --- КОМПОНЕНТЫ СТРАНИЦ ---

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover opacity-40 grayscale-[20%]">
          <source src={`${R2_URL}/atelier-promo-high.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        
        <div className="relative z-20 text-center px-6 w-full max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-thin text-white mb-6 md:mb-8 tracking-tighter leading-[0.9] md:leading-[0.85]">
            {t.heroTitle}
          </h1>
          <p className="text-white/80 text-xs sm:text-sm md:text-xl font-light mb-10 md:mb-14 uppercase tracking-[0.2em] md:tracking-[0.25em] max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
            <button onClick={() => setPage('catalog')} className="w-full sm:w-auto bg-white px-10 md:px-14 py-4 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-xl">
              {t.catalog}
            </button>
            <button onClick={() => setPage('projects')} className="w-full sm:w-auto border border-white/40 text-white backdrop-blur-md px-10 md:px-14 py-4 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
              {t.projects}
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className={`flex flex-col ${t.dir === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20`}>
            <div className="w-full md:w-1/2">
              <span className="text-amber-600 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block underline decoration-2 underline-offset-8 italic">Tool</span>
              <h2 className="text-4xl md:text-6xl font-thin mb-10 md:mb-16 tracking-tighter">{t.calcTitle}</h2>
              <div className="space-y-10 md:space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-widest">{t.width} (cm)</label>
                    <input type="number" value={calcData.width} onChange={(e) => setCalcData({...calcData, width: e.target.value})} className="w-full bg-white border border-gray-200 p-4 md:p-5 font-mono text-lg md:text-xl focus:border-amber-500 outline-none transition" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-widest">{t.height} (cm)</label>
                    <input type="number" value={calcData.height} onChange={(e) => setCalcData({...calcData, height: e.target.value})} className="w-full bg-white border border-gray-200 p-4 md:p-5 font-mono text-lg md:text-xl focus:border-amber-500 outline-none transition" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-widest">Complexity</label>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {[
                      { label: 'Standard', val: 1 },
                      { label: 'Premium', val: 1.4 },
                      { label: 'Exotic', val: 1.9 }
                    ].map(style => (
                      <button key={style.label} onClick={() => setCalcData({...calcData, density: style.val})} className={`py-3 md:py-4 text-[9px] md:text-[10px] uppercase font-black tracking-widest border transition-all ${calcData.density === style.val ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}>
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-20 bg-white p-8 md:p-12 shadow-xl border-t-8 border-amber-600">
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 border-b border-gray-100 pb-8 md:pb-10 gap-6 ${t.dir === 'rtl' ? 'sm:flex-row-reverse text-right' : ''}`}>
                  <div>
                    <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">{t.area}</div>
                    <div className="text-4xl md:text-5xl font-extralight tracking-tighter">
                      {areaSqM} <span className="text-sm md:text-base uppercase opacity-40 ml-1">sq.m</span>
                    </div>
                  </div>
                  <div className={`${t.dir === 'rtl' ? 'sm:text-left' : 'sm:text-right'}`}>
                    <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-amber-600 font-black mb-1">{t.result}</div>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter">฿{estimatedPrice}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded text-[10px] text-amber-900/70 uppercase leading-relaxed font-medium">
                  <Info size={14} className="shrink-0 text-amber-600 mt-0.5"/>
                  <p>Prices are indicative. Final quote depends on site conditions.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative bg-gray-200 rounded min-h-[300px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                <img src={`${R2_URL}/preview-main.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="Preview" />
                <div className="relative z-10 flex gap-1 md:gap-2 h-1/2">
                   {[...Array(8)].map((_, i) => <div key={i} className="bg-amber-900/40 w-2 md:w-3" style={{ height: '100%', opacity: 0.2 + (i/10), marginRight: `${calcData.density * 4}px` }} />)}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 md:mb-12">
            <span className="text-amber-600 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block italic">Location</span>
            <h2 className="text-3xl md:text-5xl font-thin tracking-tighter uppercase leading-none">{t.locationTitle}</h2>
          </div>
          <div className="relative w-full aspect-square sm:aspect-[21/9] min-h-[350px] bg-stone-100 overflow-hidden shadow-inner group rounded-sm">
            <iframe 
              src={MAP_EMBED_URL}
              className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 opacity-90 group-hover:opacity-100 border-0"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Atelier Carpentry Wood Shop Location"
            ></iframe>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-3 text-gray-500 font-light italic text-sm md:text-base">
              <MapPin size={18} className="text-amber-600 shrink-0" />
              <span>ATELIER CARPENTRY WOOD SHOP, Koh Samui</span>
            </div>
            <a 
              href="https://maps.app.goo.gl/r6m9M6kE5p6M5D6Z8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );

  const CatalogPage = () => (
    <section className="pt-28 md:pt-40 pb-20 md:pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 text-center">
          <h2 className="text-4xl md:text-7xl font-thin tracking-tighter mb-4 uppercase">{t.catTitle}</h2>
          <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">{t.catSub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {[
            { id: 1, name: 'Slat Partitions', price: '4,500/m²', img: 'cat-1.jpg' },
            { id: 2, name: 'Ceiling Systems', price: '3,800/m²', img: 'cat-2.jpg' },
            { id: 3, name: 'Eco-Furniture', price: 'Custom', img: 'cat-3.jpg' },
            { id: 4, name: 'Palm Wall Decor', price: '5,200/m²', img: 'cat-4.jpg' },
            { id: 5, name: 'Outdoor Louvers', price: '6,000/m²', img: 'cat-5.jpg' },
            { id: 6, name: 'Integrated Storage', price: 'Custom', img: 'cat-6.jpg' }
          ].map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-5 relative">
                <img src={`${R2_URL}/${item.img}`} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-light uppercase tracking-tighter mb-1">{item.name}</h3>
              <p className="text-[9px] md:text-[10px] text-amber-600 font-black uppercase tracking-widest">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ProjectsPage = () => (
    <section className="pt-28 md:pt-40 pb-20 md:pb-32 px-6 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-thin tracking-tighter mb-4 uppercase italic">{t.projTitle}</h2>
          <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">{t.projSub}</p>
        </div>
        <div className="space-y-24 md:space-y-40">
          {[
            { title: "Banyan Tree Residence", loc: "Koh Samui, 2024", img: "proj-1.jpg", desc: "Full interior slat integration using sustainable coconut wood." },
            { title: "Azure Beach Club", loc: "Phuket, 2023", img: "proj-2.jpg", desc: "Bespoke ceiling systems and minimalist lounge partitions." }
          ].map((proj, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? (t.dir === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row') : (t.dir === 'rtl' ? 'md:flex-row' : 'md:flex-row-reverse')} gap-8 md:gap-20 items-center`}>
              <div className="w-full md:w-3/5 overflow-hidden aspect-video bg-stone-200">
                <img src={`${R2_URL}/${proj.img}`} className="w-full h-full object-cover hover:scale-105 transition duration-1000" alt={proj.title} />
              </div>
              <div className="w-full md:w-2/5 space-y-4 md:space-y-6">
                <span className="text-amber-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{proj.loc}</span>
                <h3 className="text-3xl md:text-4xl font-thin uppercase tracking-tighter">{proj.title}</h3>
                <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">{proj.desc}</p>
                <button className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] group pt-2">
                  View Case Study <ArrowRight size={14} className="group-hover:translate-x-2 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AboutPage = () => (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto text-center space-y-10 md:space-y-16">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-black flex items-center justify-center text-white text-2xl md:text-3xl font-black mx-auto">AS</div>
        <h2 className="text-5xl md:text-8xl font-thin tracking-tighter leading-none uppercase">Ecological <br className="hidden sm:block"/> Elegance</h2>
        <p className="text-lg md:text-2xl font-light text-gray-500 leading-relaxed italic px-2">
          Atelier Samui was born from the desire to merge the raw beauty of Thailand's palm trees with the clean lines of minimalist European design. We specialize in converting sustainable coconut and palm wood into architectural masterpieces.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pt-10 md:pt-16 border-t border-gray-100">
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-thin tracking-tighter">150+</h4>
            <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Projects Completed</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-thin tracking-tighter">12</h4>
            <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Global Awards</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-thin tracking-tighter">100%</h4>
            <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Sustainable Sourcing</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-amber-100 transition-colors duration-500 overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center text-white font-bold text-xs md:text-sm">AS</div>
            <span className="font-bold tracking-tighter text-xl md:text-2xl uppercase italic hidden sm:block">Atelier Samui</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
            <button onClick={() => setPage('catalog')} className={`hover:text-amber-600 transition ${page === 'catalog' ? 'text-amber-600' : ''}`}>{t.catalog}</button>
            <button onClick={() => setPage('projects')} className={`hover:text-amber-600 transition ${page === 'projects' ? 'text-amber-600' : ''}`}>{t.projects}</button>
            <button onClick={() => setPage('about')} className={`hover:text-amber-600 transition ${page === 'about' ? 'text-amber-600' : ''}`}>{t.about}</button>
            <a href="#contact" className="hover:text-amber-600 transition">{t.contact}</a>
            
            <div className="flex items-center gap-2 border-l border-gray-200 pl-8 ml-2">
              <Globe size={13} className="text-gray-400 mr-1" />
              {['en', 'ru', 'th', 'he'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-1.5 py-1 rounded transition-all text-[10px] ${lang === l ? 'text-amber-600 font-black' : 'text-gray-400'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
             <button className="p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
             </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden fixed inset-0 top-[65px] bg-white z-[90] transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          <div className="flex flex-col p-8 gap-8 overflow-y-auto h-full">
            <div className="flex flex-col gap-6">
              {['home', 'catalog', 'projects', 'about'].map(p => (
                <button 
                  key={p} 
                  onClick={() => {setPage(p); setIsMenuOpen(false)}} 
                  className={`text-2xl font-light tracking-widest uppercase text-left ${page === p ? 'text-amber-600 font-normal' : ''}`}
                >
                  {t[p] || p}
                </button>
              ))}
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex flex-wrap gap-4">
               {['en', 'ru', 'th', 'he'].map((l) => (
                <button key={l} onClick={() => {setLang(l); setIsMenuOpen(false)}} className={`text-xs font-bold uppercase py-2 px-3 border rounded ${lang === l ? 'bg-black text-white border-black' : 'text-gray-400 border-gray-100'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <div className="h-px bg-gray-100" />
            <div className="space-y-6 pt-2">
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full"><Phone size={18} /></div>
                {CONTACT_PHONE}
              </a>
              <a href={CONTACT_INSTAGRAM} target="_blank" className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-amber-600">
                <div className="w-10 h-10 bg-amber-50 flex items-center justify-center rounded-full"><Instagram size={18} /></div>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- PAGE ROUTER --- */}
      <main className={`animate-in fade-in duration-700 ${isMenuOpen ? 'blur-sm' : ''}`}>
        {page === 'home' && <HomePage />}
        {page === 'catalog' && <CatalogPage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'about' && <AboutPage />}
      </main>

      {/* --- CONTACTS & FORM --- */}
      <section id="contact" className="py-20 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 ${t.dir === 'rtl' ? 'rtl' : ''}`}>
            
            {/* Info Side */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-6xl font-thin tracking-tighter mb-10 md:mb-12 uppercase italic">{t.contactTitle}</h2>
              <div className="space-y-8 md:space-y-10">
                <div>
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-[0.3em] mb-3">Direct Call</p>
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-2xl md:text-3xl font-light hover:text-amber-600 transition">
                    {CONTACT_PHONE}
                  </a>
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-[0.3em] mb-4">Messaging</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={`https://wa.me/${CONTACT_WHATSAPP}`} target="_blank" className="flex items-center justify-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-none hover:border-green-500 hover:bg-green-50/20 transition-all text-[10px] font-bold uppercase tracking-widest">
                      <MessageCircle size={16} className="text-green-500" /> WhatsApp
                    </a>
                    <a href={`https://t.me/+66623357340`} target="_blank" className="flex items-center justify-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-none hover:border-blue-500 hover:bg-blue-50/20 transition-all text-[10px] font-bold uppercase tracking-widest">
                      <TelegramIcon size={16} className="text-blue-500" /> Telegram
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-[0.3em] mb-3">Social</p>
                  <a href={CONTACT_INSTAGRAM} target="_blank" className="flex items-center gap-3 text-xl md:text-2xl font-light hover:text-amber-600 transition group">
                    <Instagram size={22} className="group-hover:rotate-12 transition-transform" /> @ateliersamui
                  </a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="order-1 lg:order-2 bg-white p-8 md:p-16 shadow-2xl border-t-4 border-black">
              <h3 className="text-xl md:text-2xl font-thin tracking-tight mb-8 md:mb-10 uppercase">{t.formTitle}</h3>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 bg-stone-900 text-white rounded shadow-2xl">
                  <CheckCircle2 size={50} className="mb-4 text-amber-500 animate-bounce" />
                  <p className="text-xs font-light tracking-widest uppercase text-center px-4">{t.formSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-gray-400">Full Name</label>
                    <input required type="text" className="w-full border-b border-gray-200 py-3 px-1 focus:border-amber-600 outline-none transition bg-transparent text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-gray-400">Email</label>
                    <input required type="email" className="w-full border-b border-gray-200 py-3 px-1 focus:border-amber-600 outline-none transition bg-transparent text-sm" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-gray-400">{t.formType}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {t.types.slice(0, 4).map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="w-3.5 h-3.5 accent-amber-600" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full flex justify-center items-center gap-4 bg-black text-white py-5 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-amber-600 transition-all shadow-lg active:scale-[0.98]">
                    {t.formSubmit} <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-white py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 border-b border-white/5 pb-16 md:pb-20">
          <div className="space-y-6 md:space-y-8">
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter">ATELIER SAMUI</div>
            <p className="text-gray-500 text-xs md:text-sm font-light leading-loose max-w-xs">Hand-crafted excellence using sustainable palm and coconut wood. Minimalist architecture for contemporary living.</p>
          </div>
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.4em] text-amber-500 italic">Location</h4>
            <div className="space-y-3 md:space-y-4 text-xs md:text-sm font-light text-gray-400 uppercase tracking-widest">
              <p className="flex items-center gap-3"><MapPin size={14}/> Koh Samui, Thailand</p>
              <p className="flex items-center gap-3"><Phone size={14}/> {CONTACT_PHONE}</p>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.4em] text-amber-500 italic">Digital</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href={CONTACT_INSTAGRAM} target="_blank" className="flex items-center gap-3 text-[10px] text-gray-400 hover:text-white transition uppercase tracking-[0.2em] font-black">
                <Instagram size={14} /> Instagram
              </a>
              <a href={`https://wa.me/${CONTACT_WHATSAPP}`} target="_blank" className="flex items-center gap-3 text-[10px] text-gray-400 hover:text-white transition uppercase tracking-[0.2em] font-black">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href={`https://t.me/+66623357340`} target="_blank" className="flex items-center gap-3 text-[10px] text-gray-400 hover:text-white transition uppercase tracking-[0.2em] font-black">
                <TelegramIcon size={14} /> Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 flex flex-col sm:flex-row justify-between items-center text-[9px] md:text-[10px] text-gray-600 uppercase tracking-[0.3em] font-medium gap-6 text-center">
          <span>© 2026 Atelier Samui. All Rights Reserved.</span>
          <div className="flex gap-6 italic underline underline-offset-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
