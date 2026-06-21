'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, GitBranch, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    num: '01',
    category: 'Logic & AI',
    name: 'Stark Arcade',
    desc: 'A duo of interactive Python logic games. Complex algorithm implementation and game loop engineering served via Flask on the web.',
    tags: ['Python', 'Flask', 'Algorithm'],
    accent: '#7C3AED',
    glow: 'rgba(124,58,237,0.2)',
    github: 'https://github.com/iamkumarsaurabh/pythonarcade',
    live: 'https://iamsaurabh.pythonanywhere.com/',
    liveLabel: 'Play Now',
    span: 2, // wide card
  },
  {
    num: '02',
    category: 'Web Gaming',
    name: 'Flappy Bird',
    desc: 'Responsive arcade game built with vanilla JS and HTML5 Canvas. Dynamic difficulty scaling and smooth frame-perfect physics.',
    tags: ['JavaScript', 'Canvas'],
    accent: '#06B6D4',
    glow: 'rgba(6,182,212,0.18)',
    github: 'https://github.com/iamkumarsaurabh/flappybird',
    live: 'https://iamkumarsaurabh.github.io/flappybird/',
    liveLabel: 'Play Now',
    span: 1,
  },
  {
    num: '03',
    category: 'DOM Engineering',
    name: 'Vanilla Calculator',
    desc: 'Precision-built math interface with full keyboard support, expression parsing, and history stack. Zero dependencies.',
    tags: ['Vanilla JS', 'CSS3'],
    accent: '#10B981',
    glow: 'rgba(16,185,129,0.18)',
    github: 'https://github.com/iamkumarsaurabh/calculator',
    live: 'https://iamkumarsaurabh.github.io/calculator/',
    liveLabel: 'Use Now',
    span: 1,
  },
  {
    num: '04',
    category: 'Client Work',
    name: 'Client Portfolio',
    desc: 'Production-grade responsive website delivered for a real client. Cross-device optimized, performance-first build.',
    tags: ['HTML5', 'CSS3', 'Responsive'],
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.18)',
    github: null,
    live: 'https://nanddurga.github.io/portfolio/',
    liveLabel: 'Visit Site',
    span: 2,
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function ProjectCard({ p, delay }: { p: typeof PROJECTS[0]; delay: number }) {
  const { ref, visible } = useReveal();
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <div
      ref={ref}
      className={p.span === 2 ? "md:col-span-2" : ""}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group glass-liquid"
        style={{
          position: 'relative', borderRadius: '20px', padding: '32px',
          overflow: 'hidden', height: '100%',
          transition: 'border-color 400ms, box-shadow 400ms, transform 500ms cubic-bezier(0.16,1,0.3,1)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${p.accent}33`;
          e.currentTarget.style.boxShadow = `0 24px 80px ${p.glow}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '';
          e.currentTarget.style.boxShadow = '';
          onLeave();
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: p.glow, filter: 'blur(50px)',
          opacity: 0, transition: 'opacity 600ms',
          pointerEvents: 'none',
        }} className="group-hover:opacity-100" />

        {/* Number + category */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
            color: p.accent, fontWeight: 500,
          }}>
            {p.num} / {p.category}
          </span>
          <a
            href={p.live} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '8px',
              background: `${p.accent}14`, border: `1px solid ${p.accent}30`,
              color: p.accent, transition: 'background 200ms, transform 200ms',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}28`; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${p.accent}14`; e.currentTarget.style.transform = ''; }}
          >
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,28px)',
          fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--fg)',
          marginBottom: '12px', lineHeight: 1.1,
        }}>
          {p.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.65,
          color: 'var(--fg)', opacity: 0.85, fontWeight: 400, marginBottom: '24px',
        }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {p.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          paddingTop: '20px', borderTop: '1px solid var(--border)',
        }}>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--fg-muted)', textDecoration: 'none',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-muted)'}
            >
              <GitBranch size={12} strokeWidth={2} /> Source
            </a>
          )}
          <a href={p.live} target="_blank" rel="noreferrer"
            style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
              color: p.accent, textDecoration: 'none',
              transition: 'gap 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
          >
            {p.liveLabel}
            <ExternalLink size={12} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section id="work" style={{ position: 'relative', zIndex: 2, padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div ref={ref} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '64px', flexWrap: 'wrap', gap: '24px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
              color: 'var(--violet-bright)', marginBottom: '12px', textTransform: 'uppercase',
            }}>
              Selected Work
            </div>
            <h2 className="display-large" style={{ color: 'var(--fg)' }}>
              Projects that<br />
              <span className="text-gradient">actually ship.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--fg-muted)',
            maxWidth: '320px', lineHeight: 1.7,
          }}>
            End-to-end builds — from algorithm to interface. Each one engineered to perform.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} p={p} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}
