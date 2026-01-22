import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  Calculator as CalcIcon, 
  MapPin,
  Instagram,
  MessageCircle,
  Sun,
  ShieldCheck,
  Hammer,
  Leaf,
  Lightbulb,
  Check,
  ArrowRight
} from 'lucide-react';

// --- CONFIGURATION ---
const R2_URL = "https://assets.atelier-samui.com"; 
const CONTACT_PHONE = "+66 6 2335 7340";
const CONTACT_WHATSAPP = "66623357340";
const CONTACT_INSTAGRAM = "https://www.instagram.com/ateliersamui";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.2177285244634!2d100.00830226956194!3d9.56549419940743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f39fecf41fd3%3A0x40d66fd948899b7d!2sATELIER%20CARPENTRY%20WOOD%20SHOP!5e1!3m2!1sru!2sth!4v1768539608346!5m2!1sru!2sth";

const translations = {
  en: {
    heroTitle: "Furniture Built for the Tropics",
    heroSub: "Handmade in Koh Samui. Eco-friendly Palm Wood, Aluminum & Glass. Engineered to last 20+ years in the island climate.",
    catalog: "Catalog",
    projects: "Projects",
    about: "About",
    contact: "Contact Us",
    dir: "ltr",
    catTitle: "Our Collections",
    catSub: "Handmade furniture for Villas, Restaurants, and Boutiques.",
    projTitle: "Featured Projects",
    featDurabilityTitle: "20+ Year Longevity",
    featDurabilityDesc: "Our marine-grade aluminum and tempered glass structures are immune to rust and termites, lasting decades longer than any mass-market alternative.",
    featLocalTitle: "Samui Production",
    featLocalDesc: "Every piece is designed and manufactured in our Koh Samui workshop, tailored to the unique humidity and salt-air challenges of the Gulf of Thailand.",
    featCustomTitle: "Beyond IKEA Quality",
    featCustomDesc: "We don't use particle board. Our furniture features solid palm wood and steel that won't warp or degrade in 100% humidity.",
    featEcoTitle: "Sustainable Palm",
    featEcoDesc: "We reclaim aged palm trees, transforming them into high-end, eco-conscious furniture with a signature tropical aesthetic.",
    prodSunbeds: "Elite Sunbeds",
    prodTables: "Dining & Cafe Tables",
    prodShelves: "LED Wall Shelves",
    prodChairs: "Designer Chairs",
    swipeHint: "Swipe to navigate",
    aboutText: "Atelier Samui specializes in high-durability furniture for the world's most demanding tropical environments. Our signature mix of handmade palm wood, industrial aluminum, and sleek glass creates a 'Forever-Last' standard for luxury villas and commercial spaces."
  },
  th: {
    heroTitle: "เฟอร์นิเจอร์เพื่อภูมิภาคเขตร้อน",
    heroSub: "งานทำมือในเกาะสมุย ไม้ปาล์มรักษ์โลก อลูมิเนียม และกระจก ออกแบบมาเพื่อให้มีอายุการใช้งานยาวนานกว่า 20 ปีในสภาพอากาศเกาะ",
    catalog: "แคตตาล็อก",
    projects: "โครงการ",
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อเรา",
    dir: "ltr",
    catTitle: "คอลเลกชันของเรา",
    catSub: "เฟอร์นิเจอร์ทำมือสำหรับวิลล่า ร้านอาหาร และร้านค้าบูติก",
    projTitle: "โครงการที่โดดเด่น",
    featDurabilityTitle: "อายุการใช้งาน 20+ ปี",
    featDurabilityDesc: "โครงสร้างอลูมิเนียมเกรดมารีนและกระจกนิรภัยของเราทนทานต่อสนิมและปลวก มีอายุการใช้งานยาวนานกว่าเฟอร์นิเจอร์ทั่วไป",
    featLocalTitle: "การผลิตในสมุย",
    featLocalDesc: "ทุกชิ้นงานได้รับการออกแบบและผลิตในโรงงานของเราที่เกาะสมุย ปรับให้เข้ากับความชื้นและไอเค็มของอ่าวไทย",
    featCustomTitle: "คุณภาพที่เหนือกว่า",
    featCustomDesc: "เราไม่ใช้ไม้อัดพาร์ติเคิล เฟอร์นิเจอร์ของเราใช้ไม้ปาล์มจริงและเหล็กที่ไม่บิดงอหรือเสื่อมสภาพในความชื้น 100%",
    featEcoTitle: "ไม้ปาล์มยั่งยืน",
    featEcoDesc: "เรานำต้นปาล์มที่มีอายุมากมาแปรรูปเป็นเฟอร์นิเจอร์ระดับไฮเอนด์ที่เป็นมิตรต่อสิ่งแวดล้อม พร้อมเอกลักษณ์สไตล์ทรอปิคอล",
    prodSunbeds: "เตียงอาบแดด Elite",
    prodTables: "โต๊ะอาหารและคาเฟ่",
    prodShelves: "ชั้นวางผนัง LED",
    prodChairs: "เก้าอี้ดีไซน์เนอร์",
    swipeHint: "ปัดเพื่อเปลี่ยนหน้า",
    aboutText: "Atelier Samui เชี่ยวชาญด้านเฟอร์นิเจอร์ที่มีความทนทานสูงสำหรับสภาพแวดล้อมเขตร้อนที่ท้าทายที่สุดในโลก การผสมผสานระหว่างไม้ปาล์มทำมือ อลูมิเนียมอุตสาหกรรม และกระจกที่โฉบเฉี่ยว สร้างมาตรฐาน 'ความคงทนตลอดกาล' สำหรับวิลล่าหรูและพื้นที่เชิงพาณิชย์"
  },
  he: {
    heroTitle: "ריהוט שנבנה עבור האקלים הטרופי",
    heroSub: "עבודת יד בקוסמוי. עץ דקל אקולוגי, אלומיניום וזכוכית. הנדסה שמחזיקה מעמד 20+ שנים באקלים האי.",
    catalog: "קטלוג",
    projects: "פרויקטים",
    about: "אודותינו",
    contact: "צור קשר",
    dir: "rtl",
    catTitle: "הקולקציות שלנו",
    catSub: "ריהוט בעבודת יד עבור וילות, מסעדות וחנויות בוטיק.",
    projTitle: "פרויקטים נבחרים",
    featDurabilityTitle: "עמידות ל-20+ שנים",
    featDurabilityDesc: "מבני האלומיניום והזכוכית המחוסמת שלנו חסינים בפני חלודה וטרמיטים, ומחזיקים מעמד עשורים יותר מכל חלופה אחרת בשוק.",
    featLocalTitle: "ייצור מקומי בסמוי",
    featLocalDesc: "כל פריט מעוצב ומיוצר בנגרייה שלנו בקוסמוי, מותאם לאתגרי הלחות והמליחות הייחודיים של מפרץ תאילנד.",
    featCustomTitle: "איכות מעל איקאה",
    featCustomDesc: "אנחנו לא משתמשים בלוחות סיבית. הרהיטים שלנו כוללים עץ דקל מלא ופלדה שלא יתעוותו או יתפרקו ב-100% לחות.",
    featEcoTitle: "דקל בר-קיימא",
    featEcoDesc: "אנחנו ממחזרים עצי דקל בוגרים והופכים אותם לריהוט יוקרתי ואקולוגי עם אסתטיקה טרופית ייחודית.",
    prodSunbeds: "מיטות שיזוף עלית",
    prodTables: "שולחנות אוכל ובתי קפה",
    prodShelves: "מדפי קיר LED",
    prodChairs: "כיסאות מעצבים",
    swipeHint: "החלק לניווט",
    aboutText: "Atelier Samui מתמחה בריהוט בעל עמידות גבוהה לסביבות הטרופיות התובעניות ביותר בעולם. השילוב הייחודי שלנו בין עץ דקל בעבודת יד, אלומיניום תעשייתי וזכוכית אלגנטית יוצר תקן של 'עמידות לנצח' עבור וילות יוקרה וחללים מסחריים."
  },
  ru: {
    heroTitle: "Мебель для тропиков",
    heroSub: "Ручная работа на Самуи. Эко-пальма, алюминий и стекло. Срок службы более 20 лет в островном климате.",
    catalog: "Каталог",
    projects: "Проекты",
    about: "О нас",
    contact: "Контакт",
    dir: "ltr",
    catTitle: "Наши коллекции",
    catSub: "Мебель ручной работы для вилл и ресторанов.",
    projTitle: "Наши Проекты",
    featDurabilityTitle: "Служит 20+ лет",
    featDurabilityDesc: "Морской алюминий и закаленное стекло не ржавеют и не боятся термитов, в отличие от обычной мебели.",
    featLocalTitle: "Производство на Самуи",
    featLocalDesc: "Каждое изделие создается в нашей мастерской на Самуи с учетом влажности и морской соли.",
    featCustomTitle: "Лучше чем IKEA",
    featCustomDesc: "Мы не используем ДСП. Только цельная пальма и металл, которые не деформируются при 100% влажности.",
    featEcoTitle: "Эко-Пальма",
    featEcoDesc: "Мы используем древесину старых пальм, создавая премиальную мебель с уникальной тропической эстетикой.",
    prodSunbeds: "Шезлонги Elite",
    prodTables: "Столы для кафе",
    prodShelves: "LED Полки",
    prodChairs: "Дизайнерские стулья",
    swipeHint: "Свайп для навигации",
    aboutText: "Atelier Samui специализируется на сверхпрочной мебели для тропиков. Сочетание ручной работы, алюминия и стекла создает стандарт 'на века' для вилл и бизнеса."
  }
};

const PAGES = ['home', 'catalog', 'projects', 'about'];

const App = () => {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const videoRef = useRef(null);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const t = translations[lang] || translations['en'];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang, t.dir, page]);

  // Set slow motion effect for video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [page]);

  // Navigation logic
  const onTouchStart = (e) => {
    touchEnd.current = null; 
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const currentIndex = PAGES.indexOf(page);
    
    // Reverse swipe direction for RTL
    const isRTL = t.dir === 'rtl';
    const swipeLeft = isRTL ? distance < -70 : distance > 70;
    const swipeRight = isRTL ? distance > 70 : distance < -70;

    if (swipeLeft && currentIndex < PAGES.length - 1) setPage(PAGES[currentIndex + 1]);
    if (swipeRight && currentIndex > 0) setPage(PAGES[currentIndex - 1]);
  };

  const Nav = () => (
    <nav className="fixed w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold text-xs">AS</div>
          <span className="font-bold tracking-tighter text-lg uppercase italic hidden sm:block">Atelier Samui</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <button onClick={() => setPage('catalog')} className={`hover:text-amber-600 ${page === 'catalog' ? 'text-amber-600' : ''}`}>{t.catalog}</button>
          <button onClick={() => setPage('projects')} className={`hover:text-amber-600 ${page === 'projects' ? 'text-amber-600' : ''}`}>{t.projects}</button>
          <button onClick={() => setPage('about')} className={`hover:text-amber-600 ${page === 'about' ? 'text-amber-600' : ''}`}>{t.about}</button>
          
          <div className={`flex items-center gap-2 border-gray-200 pl-8 ml-2 ${t.dir === 'rtl' ? 'border-r pr-8 pl-0 mr-2 ml-0' : 'border-l pl-8 ml-2'}`}>
            {['en', 'th', 'he', 'ru'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 ${lang === l ? 'text-amber-600 font-black' : 'text-gray-400'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 top-[65px] bg-white z-[90] transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col p-8 gap-8">
          {PAGES.map(p => (
            <button key={p} onClick={() => {setPage(p); setIsMenuOpen(false)}} className={`text-3xl font-light tracking-widest uppercase text-left ${page === p ? 'text-amber-600' : ''} ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t[p] || p}
            </button>
          ))}
          <div className={`flex gap-4 pt-10 ${t.dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
             {['en', 'th', 'he', 'ru'].map((l) => (
              <button key={l} onClick={() => {setLang(l); setIsMenuOpen(false)}} className={`text-sm font-bold p-3 border ${lang === l ? 'bg-black text-white' : 'text-gray-400'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div 
      className="min-h-screen bg-white text-stone-900 overflow-x-hidden antialiased font-sans"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Nav />
      
      <main className="transition-opacity duration-500">
        {page === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-stone-950">
               <video 
                 ref={videoRef}
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="absolute inset-0 w-full h-full object-cover opacity-50"
               >
                  <source src="https://assets.atelier-samui.com/atelier-promo-high.mp4.mp4" type="video/mp4" />
               </video>
               <div className="relative z-10 text-center px-6 max-w-4xl">
                  <h1 className="text-5xl md:text-9xl font-thin text-white mb-8 tracking-tighter">{t.heroTitle}</h1>
                  <p className="text-white/70 text-sm md:text-lg font-light uppercase tracking-[0.3em] mb-12">{t.heroSub}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button onClick={() => setPage('catalog')} className="bg-amber-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
                      {t.catalog}
                    </button>
                    <button onClick={() => setPage('about')} className="border border-white/30 text-white backdrop-blur-md px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      {t.about}
                    </button>
                  </div>
               </div>
               <div className="absolute bottom-10 animate-bounce text-white/30 lg:hidden text-[10px] uppercase tracking-widest">
                  {t.swipeHint} {t.dir === 'rtl' ? '→ ←' : '← →'}
               </div>
            </section>

            {/* Core Values / Features */}
            <section className="py-32 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div className="space-y-4">
                  <Sun className="text-amber-600" size={32} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">{t.featDurabilityTitle}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t.featDurabilityDesc}</p>
                </div>
                <div className="space-y-4">
                  <MapPin className="text-amber-600" size={32} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">{t.featLocalTitle}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t.featLocalDesc}</p>
                </div>
                <div className="space-y-4">
                  <ShieldCheck className="text-amber-600" size={32} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">{t.featCustomTitle}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t.featCustomDesc}</p>
                </div>
                <div className="space-y-4">
                  <Leaf className="text-amber-600" size={32} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">{t.featEcoTitle}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t.featEcoDesc}</p>
                </div>
              </div>
            </section>

            {/* Highlighted Product: LED Shelves */}
            <section className="bg-stone-50 py-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 order-2 lg:order-1">
                        <img src={`${R2_URL}/led-shelf-main.jpg`} alt="LED Wall Shelf Decoration" className="shadow-2xl grayscale-0 hover:grayscale transition duration-700" />
                    </div>
                    <div className="flex-1 order-1 lg:order-2 space-y-8">
                        <span className="text-amber-600 font-bold uppercase tracking-[0.5em] text-[10px]">Interior Revolution</span>
                        <h2 className="text-4xl md:text-6xl font-thin tracking-tighter uppercase">{t.prodShelves}</h2>
                        <p className="text-stone-500 leading-relaxed font-light italic">
                           "Our forever-last shelves turn wall decoration into an experience. Built with hidden LED channels, integrated glass, and Samui-produced aluminum, these shelves outlast any mass-market alternative by decades."
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Hidden LED integration",
                                "Floating Aluminum Architecture",
                                "Moisture-proof Palm inserts",
                                "Custom dimensions for Shop/Villa"
                            ].map((item, idx) => (
                                <li key={idx} className={`flex items-center gap-3 text-xs uppercase font-bold text-stone-400 ${t.dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Check size={14} className="text-amber-600" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
          </>
        )}

        {page === 'catalog' && (
          <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-6xl md:text-9xl font-thin tracking-tighter uppercase mb-4">{t.catTitle}</h2>
                <p className="text-stone-400 uppercase tracking-widest text-[10px]">{t.catSub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[
                { name: t.prodSunbeds, desc: "Marine aluminum frame with eco-palm slats. Won't rot.", price: "From ฿12,000", img: "sunbed.jpg" },
                { name: t.prodTables, desc: "Slab wood and powder-coated steel. Built for 365 use.", price: "From ฿8,500", img: "table.jpg" },
                { name: t.prodShelves, desc: "The ultimate wall decoration. Built-in LED & Glass.", price: "From ฿4,500/m", img: "shelf.jpg" },
                { name: t.prodChairs, desc: "Ergonomic designs combining palm and industrial steel.", price: "From ฿3,200", img: "chair.jpg" },
                { name: "Villa Partitions", desc: "Decorative slat walls for privacy and ventilation.", price: "Custom Quote", img: "partition.jpg" },
                { name: "Shop Fittings", desc: "Durable shelving and displays for high-traffic retail.", price: "Custom Quote", img: "shop.jpg" }
              ].map((prod, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-stone-100 mb-6 overflow-hidden relative">
                    <img src={`${R2_URL}/${prod.img}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={prod.name} />
                    <div className={`absolute top-4 ${t.dir === 'rtl' ? 'left-4' : 'right-4'} bg-white px-3 py-1 text-[9px] font-black uppercase tracking-tighter shadow-md`}>
                        {prod.price}
                    </div>
                  </div>
                  <h3 className="text-xl font-light uppercase mb-2 tracking-tighter">{prod.name}</h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">{prod.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === 'about' && (
          <section className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
             <div className="flex flex-col items-center text-center space-y-12">
                <Hammer className="text-amber-600" size={48} />
                <h2 className="text-5xl md:text-8xl font-thin tracking-tighter uppercase leading-none">Local Craft <br/> Global Standards</h2>
                <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed italic">
                  {t.aboutText}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left w-full mt-20">
                    <div className="p-8 border border-stone-100">
                        <h4 className={`font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2 ${t.dir === 'rtl' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                           <Lightbulb size={16} className="text-amber-600" /> Built for Koh Samui
                        </h4>
                        <p className={`text-sm text-stone-500 leading-relaxed ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            IKEA furniture is built for dry, temperate climates. Our furniture is built for the Gulf of Thailand. We use materials that thrive in 90% humidity and constant UV exposure.
                        </p>
                    </div>
                    <div className="p-8 border border-stone-100">
                        <h4 className={`font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2 ${t.dir === 'rtl' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                           <ShieldCheck size={16} className="text-amber-600" /> Eco-Palm Technology
                        </h4>
                        <p className={`text-sm text-stone-500 leading-relaxed ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            Instead of importing pine or plywood, we work with the island's natural resource: Palm Wood. It is harder than oak when treated correctly and has a stunning, exotic grain.
                        </p>
                    </div>
                </div>
             </div>
          </section>
        )}

        {page === 'projects' && (
            <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                 <h2 className="text-6xl md:text-9xl font-thin tracking-tighter uppercase text-center mb-24">{t.projTitle}</h2>
                 <div className="space-y-40">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}>
                            <div className="w-full lg:w-3/5 aspect-video overflow-hidden shadow-2xl">
                                <img src={`${R2_URL}/project-${i}.jpg`} className="w-full h-full object-cover" alt={`Project ${i}`} />
                            </div>
                            <div className={`w-full lg:w-2/5 space-y-6 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                <span className="text-amber-600 text-xs font-black tracking-widest">RESIDENTIAL / 2025</span>
                                <h3 className="text-4xl font-thin uppercase tracking-tighter">Luxury Villa Case 0{i}</h3>
                                <p className="text-stone-500 font-light leading-relaxed">Complete furniture set for a 5-bedroom villa in Chaweng Noi. Featuring sunbeds, dining sets, and custom LED wall systems.</p>
                                <button className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 group ${t.dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    View Details <ArrowRight size={14} className={`transition ${t.dir === 'rtl' ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
            </section>
        )}
      </main>

      {/* Footer / Contact */}
      <footer className="bg-stone-950 text-white py-24 px-6">
        <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-20 ${t.dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`max-w-md ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-6xl font-thin tracking-tighter uppercase mb-12">{t.contact}</h2>
            <div className="space-y-6">
              <a href={`tel:${CONTACT_PHONE}`} className="block text-2xl font-light hover:text-amber-500 transition">{CONTACT_PHONE}</a>
              <div className={`flex gap-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <a href={`https://wa.me/${CONTACT_WHATSAPP}`} className="p-4 bg-white/5 hover:bg-green-600 transition"><MessageCircle size={24} /></a>
                <a href={CONTACT_INSTAGRAM} className="p-4 bg-white/5 hover:bg-pink-600 transition"><Instagram size={24} /></a>
              </div>
            </div>
            <p className="mt-12 text-stone-500 text-xs uppercase tracking-widest leading-loose">
              Atelier Carpentry Wood Shop<br/>
              Koh Samui, Surat Thani, Thailand<br/>
              Open: Mon - Sat, 9:00 - 18:00
            </p>
          </div>
          <div className="w-full lg:w-1/2 aspect-video overflow-hidden grayscale invert opacity-50 hover:opacity-100 transition duration-1000">
             <iframe src={MAP_EMBED_URL} className="w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
        <div className={`max-w-7xl mx-auto border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row justify-between text-[9px] uppercase tracking-widest text-stone-600 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
            <span>© 2026 Atelier-Samui.com</span>
            <span>Handmade for the Tropical 365</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
