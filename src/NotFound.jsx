import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background cursor-default select-none"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[60vw] h-[60vw] rounded-full animate-blob will-change-transform"
          style={{
            top: `${20 + mousePos.y * 10}%`,
            left: `${10 + mousePos.x * 10}%`,
            background: 'radial-gradient(circle, rgba(193,155,118,0.12) 0%, transparent 70%)',
            transition: 'top 1.5s ease-out, left 1.5s ease-out',
          }}
        />
        <div
          className="absolute w-[50vw] h-[50vw] rounded-full animate-blob will-change-transform"
          style={{
            bottom: `${-10 + mousePos.y * 15}%`,
            right: `${-5 + mousePos.x * 15}%`,
            animationDelay: '3s',
            background: 'radial-gradient(circle, rgba(140,82,48,0.12) 0%, transparent 70%)',
            transition: 'bottom 1.5s ease-out, right 1.5s ease-out',
          }}
        />
        <div
          className="absolute w-[40vw] h-[40vw] rounded-full animate-blob will-change-transform"
          style={{
            top: `${60 + mousePos.y * 8}%`,
            left: `${50 + mousePos.x * 8}%`,
            animationDelay: '5s',
            background: 'radial-gradient(circle, rgba(74,49,32,0.15) 0%, transparent 70%)',
            transition: 'top 1.5s ease-out, left 1.5s ease-out',
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* The big 404 */}
        <div className="relative mb-8">
          <h1
            className="font-display font-bold leading-none select-none"
            style={{
              fontSize: 'clamp(8rem, 25vw, 16rem)',
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(193,155,118,0.4) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'opacity 1s ease-out, transform 1s ease-out',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            404
          </h1>

          {/* Glowing line under 404 */}
          <div
            className="mx-auto h-[2px] rounded-full"
            style={{
              width: mounted ? '120px' : '0px',
              background: 'linear-gradient(90deg, transparent, rgba(193,155,118,0.6), transparent)',
              transition: 'width 1.2s ease-out 0.3s',
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-primary uppercase tracking-[0.35em] font-medium text-xs md:text-sm mb-6"
          style={{
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Сторінку не знайдено
        </p>

        {/* Description */}
        <p
          className="text-textMuted text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
          style={{
            transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Ця сторінка загубилася десь у просторі.
          <br className="hidden md:block" />
          Але ваш шлях до трансформації — ні.
        </p>

        {/* CTA Button */}
        <div
          style={{
            transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(193,155,118,0.15) 0%, rgba(193,155,118,0.05) 100%)',
              border: '1px solid rgba(193,155,118,0.3)',
            }}
          >
            {/* Hover glow */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              style={{ background: 'radial-gradient(circle at center, rgba(193,155,118,0.15) 0%, transparent 70%)' }}
            />

            <svg
              className="w-5 h-5 text-primary transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="relative text-white">Повернутися на головну</span>
          </Link>
        </div>

        {/* Bottom brand */}
        <p
          className="mt-20 text-accent tracking-[0.4em] uppercase text-xs font-medium"
          style={{
            transition: 'opacity 1s ease-out 1.2s',
            opacity: mounted ? 0.5 : 0,
          }}
        >
          System Beauty
        </p>
      </div>
    </div>
  );
};

export default NotFound;
