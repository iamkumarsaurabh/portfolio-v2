'use client';

import React, { useRef } from 'react';

const GithubIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width={p.size} height={p.size} stroke="currentColor" strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width={p.size} height={p.size} stroke="currentColor" strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width={p.size} height={p.size} stroke="currentColor" strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width={p.size} height={p.size} stroke="currentColor" strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const SOCIALS = [
  { icon: GithubIcon, href: 'https://github.com/iamkumarsaurabh', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/iamkumarsaurabh/', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/multiverseofsaurabh/', label: 'Instagram' },
  { icon: TwitterIcon, href: 'https://x.com/KSaurabh5808', label: 'Twitter/X' },
];

function MagneticSocial({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.4}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <a
      ref={ref} href={href} target="_blank" rel="noreferrer" aria-label={label}
      onMouseMove={onMove}
      className="magnetic group"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '48px', height: '48px', borderRadius: '50%',
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        color: 'var(--fg-muted)', transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1), color 200ms, box-shadow 200ms, border-color 200ms',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.borderColor = 'var(--border-lg)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--fg-muted)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
        onLeave();
      }}
    >
      <Icon size={20} strokeWidth={2} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      padding: '60px 24px',
      background: 'var(--bg-deep)',
      backdropFilter: 'blur(24px)',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '32px'
      }}>

        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 900,
            color: 'var(--fg)', letterSpacing: '-0.04em', marginBottom: '8px'
          }}>
            KS.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-subtle)' }}>
            © {new Date().getFullYear()} Kumar Saurabh. All rights reserved.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {SOCIALS.map(s => <MagneticSocial key={s.label} {...s} />)}
        </div>

      </div>
    </footer>
  );
}