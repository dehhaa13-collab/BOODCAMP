import React, { useLayoutEffect, useRef, memo } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldAlert, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Background ─────────────────────────────────────── */
const BackgroundEffects = memo(() => (
  <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden bg-background will-change-transform">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] animate-blob will-change-transform" style={{ background: 'radial-gradient(circle, rgba(193,155,118,0.15) 0%, transparent 70%)' }} />
    <div className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] animate-blob will-change-transform" style={{ animationDelay: '2s', background: 'radial-gradient(circle, rgba(140,82,48,0.15) 0%, transparent 70%)' }} />
    <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] animate-blob will-change-transform" style={{ animationDelay: '4s', background: 'radial-gradient(circle, rgba(74,49,32,0.2) 0%, transparent 70%)' }} />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
  </div>
));

/* ─── Hero ────────────────────────────────────────────── */
const Hero = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      );
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0 hero-bg will-change-transform">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(193,155,118,0.15) 0%, transparent 60%)' }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="hero-title text-primary uppercase tracking-[0.3em] font-medium text-sm md:text-base mb-6">
          Інституція власника у beauty-індустрії
        </p>
        <h1 className="hero-title font-display text-5xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
          SYSTEM <br />
          <span className="text-gradient">BEAUTY</span>
        </h1>
        <p className="hero-title text-textMuted text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Програма трансформації майстрів та власників студій. Перехід: з виконавця → у системного підприємця.
        </p>
      </div>
    </section>
  );
};

/* ─── Reality ─────────────────────────────────────────── */
const Reality = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.reality-card');
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: container.current, start: 'top 70%' },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  const items = [
    { title: 'Час = Гроші', desc: 'Дохід залежить від кількості годин роботи' },
    { title: 'Немає фінансів', desc: 'Відсутня фінансова система та управління прибутком' },
    { title: 'Сліпота', desc: 'Немає бізнес-метрик і розуміння цифр' },
    { title: 'Хаос', desc: 'Немає структури команди та масштабування' },
  ];

  return (
    <section ref={container} className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Реальність <br /><span className="text-textMuted font-light">beauty-індустрії</span>
            </h2>
          </div>
          <div>
            <p className="text-textMuted text-xl font-light leading-relaxed">
              Більшість майстрів працюють у моделі <span className="text-white font-medium">самозайнятості</span>. Їхній бізнес виглядає так:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="reality-card glass-card p-8">
              <h3 className="text-xl font-medium mb-4 text-primary">{item.title}</h3>
              <p className="text-textMuted">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 reality-card glass-card p-8 border-red-900/30 bg-red-950/10 text-center">
          <h3 className="text-2xl font-display text-red-400">У результаті: дохід має стелю.</h3>
        </div>
      </div>
    </section>
  );
};

/* ─── Master Trap ─────────────────────────────────────── */
const MasterTrap = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.circle-bg', {
        scale: 1.5, opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: 'top center', end: 'bottom center',
          scrub: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const trapItems = ['Перевантаження', 'Нестабільний дохід', 'Хаос у процесах', 'Залежність бізнесу'];

  return (
    <section ref={container} className="py-40 px-4 relative flex items-center justify-center min-h-[80vh] overflow-hidden">
      {/* Replaced blur-3xl with optimized radial gradient */}
      <div className="circle-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full -z-10 will-change-transform" style={{ background: 'radial-gradient(circle, rgba(193,155,118,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-4xl mx-auto text-center z-10">
        <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-8" />
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">Пастка майстра</h2>
        <p className="text-2xl text-textMuted font-light leading-relaxed mb-12">
          Навіть власники студій часто залишаються головними майстрами у своєму бізнесі.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {trapItems.map((t, i) => (
            <div key={i} className="border-l-2 border-primary/50 pl-4 py-2">
              <p className="text-lg font-medium">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── The Problem ─────────────────────────────────────── */
const TheProblem = () => (
  <section className="py-32 px-4 my-20 bg-surface/80 text-white text-center border-y border-white/5 relative z-10 glass-card mx-4 rounded-3xl">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl md:text-6xl font-bold mb-10">Головна причина</h2>
      <p className="text-2xl md:text-4xl font-light mb-8">Проблема не у клієнтах і не у ринку.</p>
      <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-8 py-4 rounded-full font-display text-2xl md:text-3xl font-bold shadow-2xl">
        Проблема у ролі.
      </div>
      <p className="text-xl md:text-2xl mt-12 text-textMuted font-light">
        Більшість працюють як <span className="font-bold text-white">майстри</span>, а не як власники системного бізнесу.
      </p>
    </div>
  </section>
);

/* ─── Horizontal Camps ────────────────────────────────── */
const HorizontalCamps = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;
      gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const camps = [
    { num: 1, title: 'Стан власника', subtitle: 'Чому майстри залишаються майстрами', items: ['Мислення працівника vs власника', 'Енергія, дисципліна і гроші', 'Фінансовий потолок майстра', 'Формування візії бізнесу'] },
    { num: 2, title: 'Фінансова формула', subtitle: 'Як працюють гроші у beauty', items: ['Формула доходу', 'Ячейка майстра/салону', 'Середній чек та повторні продажі', 'Бізнес-метрики: ROI, LTV, NPS'] },
    { num: 3, title: 'Система і команда', subtitle: 'Як перестати бути вузьким горлом', items: ['Делегування процесів', 'Ролі в команді', 'Стандарти сервісу', 'Система управління студією'] },
    { num: 4, title: 'Масштаб і стратегія', subtitle: 'Як масштабувати бізнес', items: ['Продуктові напрямки (навчання)', 'Стратегія на 12 місяців', 'Розвиток бренду', 'Робота з ризиками'] },
  ];

  return (
    <section ref={sectionRef} className="h-screen bg-transparent flex flex-col justify-center overflow-hidden relative z-10">
      <div className="px-10 mb-10 w-full flex-shrink-0">
        <h2 className="font-display text-5xl font-bold">Архітектура програми</h2>
        <p className="text-xl text-primary mt-2">4 ключові етапи роботи. 8 днів (9 місяців) стратегії.</p>
      </div>
      <div ref={scrollRef} className="flex gap-10 px-10 will-change-transform" style={{ width: 'max-content' }}>
        {camps.map((camp) => (
          <div key={camp.num} className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[35vw] glass-card p-10 flex flex-col h-[500px]">
            <div className="text-primary font-display text-xl mb-4">КЕМП {camp.num}</div>
            <h3 className="text-3xl font-bold mb-2">{camp.title}</h3>
            <p className="text-textMuted mb-8 font-light">{camp.subtitle}</p>
            <div className="mt-auto space-y-4">
              <div className="bg-white/5 p-6 rounded-xl">
                <p className="text-sm text-primary mb-4 uppercase tracking-wider">Що розбираємо:</p>
                <ul className="space-y-3">
                  {camp.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-textMuted shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Results ─────────────────────────────────────────── */
const resultItems = [
  'Чітка бізнес-модель, яка дозволяє масштабувати дохід',
  'Фінансова система та ключові метрики контролю',
  'Структура команди та розподіл ролей',
  'Система управління студією зі стандартами',
  'План масштабування на 12 місяців',
  'Доступ до Bless Community та партнерств',
];

const resultIcons = [TrendingUp, Target, Award, Users];
const resultLabels = ['Дохід у 2-3 рази', 'Особистий час', 'Системність', 'Нова роль'];

const Results = () => (
  <section className="py-32 px-4 relative">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Після програми</h2>
        <p className="text-xl text-textMuted">Учасник переходить у роль власника та будує систему.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultItems.map((item, i) => (
          <div key={i} className="glass-card p-8 flex items-start gap-4 hover:border-primary/50 transition-colors duration-200">
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
            <p className="text-lg text-gray-200 font-light">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 glass-card bg-primary/10 border-primary/30 text-center rounded-3xl relative overflow-hidden">
        {/* Replaced blur-[100px] with radial gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(193,155,118,0.15) 0%, transparent 70%)' }} />
        <h3 className="text-3xl md:text-5xl font-display font-bold mb-10 relative z-10">Головний результат</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {resultLabels.map((t, i) => {
            const Icon = resultIcons[i];
            return (
              <div key={i} className="text-center">
                <div className="text-primary mb-2 flex justify-center"><Icon size={32} /></div>
                <p className="text-xl font-medium">{t}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ─── Footer ──────────────────────────────────────────── */
const Footer = () => (
  <footer className="py-40 px-4 text-center border-t border-white/5 relative z-10">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-primary tracking-[0.4em] uppercase text-sm mb-8 font-medium">System Beauty</h2>
      <p className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8">
        Це не просто навчання. <br />
        <span className="text-textMuted">Це трансформація ролі.</span>
      </p>
      <p className="text-xl md:text-3xl font-light text-primary">
        Від майстра → до власника
      </p>
    </div>
  </footer>
);

/* ─── App ─────────────────────────────────────────────── */
function App() {
  return (
    <ReactLenis root>
      <main className="bg-transparent text-textMain min-h-screen relative z-10 w-full">
        <BackgroundEffects />
        <Hero />
        <Reality />
        <MasterTrap />
        <TheProblem />
        <HorizontalCamps />
        <Results />
        <Footer />
      </main>
    </ReactLenis>
  );
}

export default App;
