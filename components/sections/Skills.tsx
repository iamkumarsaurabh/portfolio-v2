'use client';

import { useRef, useEffect, useState } from 'react';
import { Code2, Zap, Layers, Globe, Terminal, Server, Database, Brain, GitBranch, Cpu } from 'lucide-react';

const SKILLS = [
  {
    cat: 'Frontend',
    color: 'var(--violet-bright)',
    items: [
      { name: 'HTML5 & CSS3', level: 90, icon: Code2 },
      { name: 'JavaScript ES6+', level: 85, icon: Zap },
      { name: 'React / Next.js', level: 80, icon: Layers },
      { name: 'Tailwind CSS', level: 88, icon: Globe },
    ]
  },
  {
    cat: 'Backend & AI',
    color: 'var(--cyan)',
    items: [
      { name: 'Python', level: 85, icon: Terminal },
      { name: 'Flask', level: 78, icon: Server },
      { name: 'SQL', level: 75, icon: Database },
      { name: 'AI / ML Basics', level: 65, icon: Brain },
    ]
  },
  {
    cat: 'Core & Tools',
    color: 'var(--amber)',
    items: [
      { name: 'C Fundamentals', level: 70, icon: Cpu },
      { name: 'Git & GitHub', level: 85, icon: GitBranch },
      { name: 'VS Code', level: 95, icon: Code2 },
      { name: 'Web APIs', level: 80, icon: Globe },
    ]
  }
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

function SkillGroup({ group, delay }: { group: typeof SKILLS[0]; delay: number }) {
  const { ref, visible } = useReveal();
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        className="group"
        style={{
          position: 'relative',
          padding: '32px 24px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          height: '100%',
          transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1), border-color 300ms, box-shadow 300ms',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${group.color}40`;
          e.currentTarget.style.boxShadow = `0 10px 40px -10px ${group.color}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'none';
          onLeave();
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 800,
          color: 'var(--fg)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: group.color }} />
          {group.cat}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {group.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--fg-muted)' }}>
                    <Icon size={14} style={{ color: group.color }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--fg)' }}>{item.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-subtle)' }}>{item.level}%</span>
                </div>
                <div style={{ width: '100%', height: '2px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: group.color,
                    width: visible ? `${item.level}%` : '0%',
                    transition: `width 1.5s cubic-bezier(0.16,1,0.3,1) ${delay + 300 + (idx * 100)}ms`,
                    boxShadow: `0 0 10px ${group.color}80`
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, visible } = useReveal();

  return (
    <section id="skills" style={{ position: 'relative', zIndex: 2, padding: '120px 24px', background: 'var(--bg-base)', backdropFilter: 'blur(24px)' }}>
      {/* Grid background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15,
        backgroundImage: 'radial-gradient(var(--border-md) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div ref={ref} style={{
          marginBottom: '64px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
           <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
              color: 'var(--cyan)', marginBottom: '12px', textTransform: 'uppercase',
            }}>
              Technical Arsenal
            </div>
            <h2 className="display-large" style={{ color: 'var(--fg)' }}>
              Engineered for <br/>
              <span className="text-gradient">Precision.</span>
            </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {SKILLS.map((group, i) => (
            <SkillGroup key={group.cat} group={group} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}