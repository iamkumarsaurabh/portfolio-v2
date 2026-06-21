'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Shader = dynamic(() => import('@/components/canvas/ShaderBackground'), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

function MagneticBtn({
  href, children, variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.3}px,${(e.clientY - r.top - r.height/2)*0.3}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  if (variant === 'primary') return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      className="group magnetic inline-flex items-center gap-3"
      style={{
        padding: '14px 32px',
        borderRadius: '99px',
        background: 'linear-gradient(135deg, var(--violet) 0%, #4F1FCE 100%)',
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontSize: '15px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        textDecoration: 'none',
        boxShadow: '0 0 40px var(--violet-glow), inset 0 1px 0 rgba(255,255,255,0.15)',
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 70px var(--violet-glow), 0 0 140px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
    >
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  );

  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      className="group magnetic inline-flex items-center gap-2"
      style={{
        padding: '14px 28px',
        borderRadius: '99px',
        border: '1px solid var(--border-lg)',
        color: 'var(--fg-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        textDecoration: 'none',
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(12px)',
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), color 200ms, border-color 200ms',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--fg)';
        e.currentTarget.style.borderColor = 'var(--border-lg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--fg-muted)';
        e.currentTarget.style.borderColor = 'var(--border-md)';
      }}
    >
      {children}
    </a>
  );
}

// Stagger container
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const itemV = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '8vh',
        overflow: 'hidden',
      }}
    >
      <Shader />

      {/* Deep radial overlay — draws eye to text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 50% 100%, transparent 20%, var(--bg-deep) 80%)',
      }} />

      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '200px', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, var(--bg-deep) 0%, transparent 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%',
      }}>
        <motion.div variants={containerV} initial="hidden" animate="show">

          {/* Status badge */}
          <motion.div variants={itemV} style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 16px', borderRadius: '99px',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.22)',
            }}>
              <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'var(--cyan)', animation: 'ping-slow 2s ease-out infinite',
                }} />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--cyan)',
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--cyan)', letterSpacing: '0.08em',
              }}>
                Open to opportunities · CSE AI/ML · 2026
              </span>
            </div>
          </motion.div>

          {/* GIANT NAME — Exaggerated Minimalism */}
          <div style={{ overflow: 'hidden', marginBottom: '-8px' }}>
            <motion.h1
              variants={itemV}
              className="display-giant"
              style={{ color: 'var(--fg)', display: 'block' }}
            >
              KUMAR
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              variants={itemV}
              className="display-giant text-gradient"
              style={{ display: 'block', paddingLeft: '4px', paddingBottom: '8px' }}
            >
              SAURABH
            </motion.h1>
          </div>

          {/* Tagline row */}
          <motion.div
            variants={itemV}
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              gap: '24px', marginTop: '32px', marginBottom: '40px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,2vw,18px)',
              color: 'var(--fg-muted)', maxWidth: '460px', lineHeight: 1.65,
            }}>
              I engineer{' '}
              <em style={{ color: 'var(--fg)', fontStyle: 'normal', fontWeight: 600 }}>
                intelligent digital experiences
              </em>{' '}
              at the intersection of AI and modern web technology.
            </p>

            {/* Vertical divider */}
            <div style={{
              width: '1px', height: '48px', background: 'var(--border-lg)',
              display: 'none',
            }} className="hidden sm:block" />

            {/* Stat pair */}
            <div style={{ display: 'flex', gap: '32px' }}>
              {[['6+', 'Projects\nShipped'], ['100%', 'Pixel\nPerfection']].map(([val, lbl]) => (
                <div key={val}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '28px',
                    fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--fg)',
                    lineHeight: 1,
                  }}>
                    {val}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    color: 'var(--fg-muted)', letterSpacing: '0.06em',
                    whiteSpace: 'pre-line', marginTop: '4px',
                  }}>
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemV}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}
          >
            <MagneticBtn href="#work" variant="primary">View My Work</MagneticBtn>
            <MagneticBtn href="#contact" variant="ghost">Let&apos;s Talk</MagneticBtn>

            {/* Scroll indicator */}
            <div style={{
              marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px',
              color: 'var(--fg-muted)',
            }}>
              <div style={{
                width: '32px', height: '1px', background: 'var(--border-lg)',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
              }}>
                SCROLL
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
