import React, { useLayoutEffect, useRef, memo, useState, useEffect, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldAlert, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Custom Cursor ────────────────────────────────────── */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(false);
    }
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .glass-card, .interactive')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${hovered ? 2.5 : 1})`,
      }}
    >
      <div className="w-5 h-5 rounded-full bg-primary/80 backdrop-blur-[2px] shadow-[0_0_15px_rgba(250,204,21,0.6)] relative flex items-center justify-center transition-all duration-300">
        {hovered && <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />}
      </div>
    </div>
  );
};

/* ─── Tilt Card ──────────────────────────────────────── */
const TiltCard = ({ children, className, ...props }) => {
  const [styles, setStyles] = useState({});

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale rotation bounds based on element size, max 10 degrees
    const xPct = (x / rect.width - 0.5) * 2; 
    const yPct = (y / rect.height - 0.5) * 2;
    
    const rotateX = -yPct * 8;
    const rotateY = xPct * 8;
    
    setStyles({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyles({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
    });
  };

  return (
    <div 
      className={`relative group ${className}`} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...styles, transformStyle: 'preserve-3d' }}
      {...props}
    >
      <div 
        className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none rounded-[inherit]" 
        style={{ transform: 'translateZ(-10px)' }}
      />
      <div className="h-full w-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

/* ─── Preloader ──────────────────────────────────────── */
const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading'); // loading → fadeOut → done

  useEffect(() => {
    // Wait for fonts + minimum display time
    const fontPromise = document.fonts?.ready || Promise.resolve();
    const minTime = new Promise(r => setTimeout(r, 1800));

    Promise.all([fontPromise, minTime]).then(() => {
      setPhase('fadeOut');
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 800);
    });
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        transition: 'opacity 0.8s ease-out',
        opacity: phase === 'fadeOut' ? 0 : 1,
        pointerEvents: phase === 'fadeOut' ? 'none' : 'auto',
      }}
    >
      {/* Subtle glow behind logo */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      <div className="relative text-center">
        {/* SB Monogram */}
        <div className="relative inline-block">
          <span
            className="font-display text-7xl md:text-9xl font-bold tracking-tight inline-block"
            style={{
              background: 'linear-gradient(135deg, #FACC15 0%, #FDE047 50%, #EAB308 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'preloaderReveal 1s ease-out forwards',
            }}
          >
            SB
          </span>
        </div>

        {/* Loading bar */}
        <div className="mt-8 w-32 h-[2px] mx-auto bg-accent/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FACC15, #FDE047)',
              animation: 'loadingBar 1.8s ease-in-out forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Scroll Progress Bar ────────────────────────────── */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useLenis(({ progress: p }) => {
    setProgress(p);
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div
        className="h-full will-change-transform"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #FACC15, #FDE047, #FACC15)',
          boxShadow: '0 0 12px rgba(250,204,21,0.4)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
};

/* ─── Navigation ─────────────────────────────────────── */
const navItems = [
  { label: 'Реальність', id: 'reality' },
  { label: 'Пастка', id: 'trap' },
  { label: 'Причина', id: 'problem' },
  { label: 'Програма', id: 'camps' },
  { label: 'Результат', id: 'results' },
];

const Navigation = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useLenis(({ scroll }) => {
    setVisible(scroll > window.innerHeight * 0.5);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[90] transition-all duration-500"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md border-b border-white/5" />

      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-xl tracking-tight hover:text-primary transition-colors duration-200"
        >
          S<span className="text-primary">B</span>
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
              style={{ color: activeSection === id ? '#FACC15' : '#9ca3af' }}
            >
              {/* Active indicator dot */}
              <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300"
                style={{
                  opacity: activeSection === id ? 1 : 0,
                  transform: activeSection === id
                    ? 'translateX(-50%) scale(1)'
                    : 'translateX(-50%) scale(0)',
                }}
              />
              <span className="group-hover:text-white transition-colors duration-200">{label}</span>
            </button>
          ))}
        </div>

        {/* Mobile: minimal indicator */}
        <div className="md:hidden flex items-center gap-2">
          {navItems.map(({ id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: activeSection === id ? '#FACC15' : '#2c2c31',
                transform: activeSection === id ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

/* ─── Background ─────────────────────────────────────── */
const BackgroundEffects = memo(() => (
  <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden bg-background will-change-transform">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] animate-blob will-change-transform" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)' }} />
    <div className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] animate-blob will-change-transform" style={{ animationDelay: '2s', background: 'radial-gradient(circle, rgba(30,64,175,0.15) 0%, transparent 70%)' }} />
    <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] animate-blob will-change-transform" style={{ animationDelay: '4s', background: 'radial-gradient(circle, rgba(17,24,39,0.2) 0%, transparent 70%)' }} />
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
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15, delay: 2 }
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
    <section id="hero" ref={container} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0 hero-bg will-change-transform">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(250,204,21,0.15) 0%, transparent 60%)' }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="hero-title inline-block bg-primary text-black px-4 py-2 rounded font-bold uppercase tracking-widest text-xs md:text-sm mb-6 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
          Інституція власника у beauty-індустрії
        </div>
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
    <section id="reality" ref={container} className="py-32 px-4 relative z-10">
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
            <TiltCard key={i} className="reality-card glass-card p-8 interactive border-white/5 hover:border-primary/20 transition-colors duration-300">
              <h3 className="text-xl font-medium mb-4 text-primary">{item.title}</h3>
              <p className="text-textMuted">{item.desc}</p>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 reality-card p-8 bg-accent text-center rounded-2xl border border-white/10">
          <h3 className="text-2xl font-display text-white font-bold uppercase tracking-wide">У результаті: дохід має стелю.</h3>
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
    <section id="trap" ref={container} className="py-40 px-4 relative flex items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="circle-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full -z-10 will-change-transform" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)' }} />
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
  <section id="problem" className="py-32 px-4 my-20 bg-surface/80 text-white text-center border-y border-white/5 relative z-10 glass-card mx-4 rounded-3xl">
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-4xl md:text-6xl font-bold mb-10">Головна причина</h2>
      <p className="text-2xl md:text-4xl font-light mb-8">Проблема не у клієнтах і не у ринку.</p>
      <div className="inline-block bg-primary text-black px-10 py-5 rounded-sm font-display text-3xl md:text-5xl font-bold shadow-[0_0_30px_rgba(250,204,21,0.3)] uppercase tracking-tighter transform -rotate-1">
        Проблема у ролі.
      </div>
      <p className="text-xl md:text-2xl mt-12 text-textMuted font-light">
        Більшість працюють як <span className="font-bold text-white">майстри</span>, а не як власники системного бізнесу.
      </p>
    </div>
  </section>
);

/* ─── Horizontal Camps ────────────────────────────────── */
const camps = [
  { num: 1, title: 'Стан власника', subtitle: 'Чому майстри залишаються майстрами', items: ['Мислення працівника vs власника', 'Енергія, дисципліна і гроші', 'Фінансовий потолок майстра', 'Формування візії бізнесу'] },
  { num: 2, title: 'Фінансова формула', subtitle: 'Як працюють гроші у beauty', items: ['Формула доходу', 'Ячейка майстра/салону', 'Середній чек та повторні продажі', 'Бізнес-метрики: ROI, LTV, NPS'] },
  { num: 3, title: 'Система і команда', subtitle: 'Як перестати бути вузьким горлом', items: ['Делегування процесів', 'Ролі в команді', 'Стандарти сервісу', 'Система управління студією'] },
  { num: 4, title: 'Масштаб і стратегія', subtitle: 'Як масштабувати бізнес', items: ['Продуктові напрямки (навчання)', 'Стратегія на 12 місяців', 'Розвиток бренду', 'Робота з ризиками'] },
];

const HorizontalCamps = ({ ready }) => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    // Only initialize GSAP AFTER preloader is done and content is visible
    if (!ready || !sectionRef.current || !scrollRef.current) return;

    // Wait for next frame so the browser has painted with correct dimensions
    const raf = requestAnimationFrame(() => {
      // Clean up previous context if it exists (e.g. on hot reload)
      if (ctxRef.current) ctxRef.current.revert();

      ctxRef.current = gsap.context(() => {
        // Dynamic function ensures correct calculation even on resize
        const getScrollWidth = () => {
          if (!scrollRef.current) return 0;
          return scrollRef.current.scrollWidth - window.innerWidth;
        };

        gsap.to(scrollRef.current, {
          x: () => -getScrollWidth(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${getScrollWidth()}`,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [ready]);

  return (
    <section id="camps" ref={sectionRef} className="h-screen bg-transparent flex flex-col justify-center overflow-hidden relative z-10">
      <div className="px-10 mb-10 w-full flex-shrink-0">
        <h2 className="font-display text-5xl font-bold">Архітектура програми</h2>
        <p className="text-xl text-primary mt-2">4 ключові етапи роботи. 8 днів (9 місяців) стратегії.</p>
      </div>
      <div ref={scrollRef} className="flex gap-10 px-10 will-change-transform pb-20 pt-10" style={{ width: 'max-content' }}>
        {camps.map((camp) => (
          <TiltCard key={camp.num} className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[35vw] glass-card p-10 flex flex-col h-[500px] interactive border-white/5 hover:border-primary/30 transition-colors duration-300">
            <div className="bg-primary text-black font-display font-bold text-sm mb-4 px-3 py-1 rounded inline-block w-max uppercase tracking-wider">КЕМП {camp.num}</div>
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
          </TiltCard>
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
  <section id="results" className="py-32 px-4 relative">
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
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)' }} />
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
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => {
    setLoaded(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, []);

  return (
    <ReactLenis root>
      <CustomCursor />
      <Preloader onComplete={handleLoaded} />
      {loaded && <ScrollProgress />}
      {loaded && <Navigation />}
      <main
        className="bg-transparent text-textMain min-h-screen relative z-10 w-full"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out 0.2s',
        }}
      >
        <BackgroundEffects />
        <Hero />
        <Reality />
        <MasterTrap />
        <TheProblem />
        <HorizontalCamps ready={loaded} />
        <Results />
        <Footer />
      </main>
    </ReactLenis>
  );
}

export default App;
