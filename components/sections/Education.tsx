'use client';

import { useRef, useEffect, useState } from 'react';

const EDUCATION = [
  {
    year: '2025 — 2029',
    degree: 'B.Tech in CSE (AI & ML)',
    institution: 'SIET, Nilokheri',
    desc: 'Specializing in Computer Science & Engineering with a dedicated focus on Artificial Intelligence and Machine Learning. Building a robust foundation in algorithms, system design, and advanced neural networks.',
    active: true
  },
  {
    year: '2023 — 2025',
    degree: 'Senior Secondary Education',
    institution: 'CBSE Board',
    desc: 'Focused on Physics, Chemistry, and Mathematics. Graduated with a 9.87 CGPA, developing a strong analytical mindset and problem-solving capabilities.',
    active: false
  },
  {
    year: '2013 — 2023',
    degree: 'Secondary Education',
    institution: 'HBSE Board',
    desc: 'Cultivated early interests in science and computation. Graduated with a 9.8 CGPA, laying the groundwork for a career in technology.',
    active: false
  }
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function EduCard({ item, idx }: { item: typeof EDUCATION[0], idx: number }) {
  const { ref, visible } = useReveal();
  
  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: '32px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(40px)',
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 150}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 150}ms`,
      position: 'relative'
    }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        left: '5px',
        top: '24px',
        bottom: idx === EDUCATION.length - 1 ? 'auto' : '-40px',
        height: idx === EDUCATION.length - 1 ? '0' : 'calc(100% + 40px)',
        width: '1px',
        background: 'var(--border-md)',
        zIndex: 0
      }} />

      {/* Node */}
      <div style={{
        width: '11px',
        height: '11px',
        borderRadius: '50%',
        background: item.active ? 'var(--violet)' : 'var(--bg-deep)',
        border: `2px solid ${item.active ? 'var(--violet)' : 'var(--border-lg)'}`,
        marginTop: '6px',
        position: 'relative',
        zIndex: 1,
        boxShadow: item.active ? '0 0 16px var(--violet)' : 'none',
        flexShrink: 0
      }} />

      <div style={{ flex: 1, paddingBottom: '48px' }}>
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '12px', 
          color: item.active ? 'var(--violet-bright)' : 'var(--fg-muted)',
          marginBottom: '8px',
          letterSpacing: '0.05em'
        }}>
          {item.year}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 800,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          marginBottom: '4px'
        }}>
          {item.degree}
        </h3>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--fg)',
          opacity: 0.7,
          marginBottom: '16px'
        }}>
          {item.institution}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--fg)',
          opacity: 0.85,
          lineHeight: 1.6,
          maxWidth: '600px'
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Education() {
  const { ref, visible } = useReveal();

  return (
    <section id="education" style={{ position: 'relative', zIndex: 2, padding: '120px 24px', background: 'var(--bg-deep)', backdropFilter: 'blur(24px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div ref={ref} style={{
          marginBottom: '80px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
           <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
              color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase',
            }}>
              Background
            </div>
            <h2 className="display-large" style={{ color: 'var(--fg)' }}>
              Academic <br/>
              <span className="text-gradient-warm">Foundation.</span>
            </h2>
        </div>

        <div>
          {EDUCATION.map((item, i) => (
            <EduCard key={i} item={item} idx={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
