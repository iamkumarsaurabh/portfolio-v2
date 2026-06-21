'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '#work',      label: 'Work'      },
  { href: '#skills',    label: 'Skills'    },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center' }}
      >
        <div
          style={{
            marginTop: '24px',
            padding: '8px 8px 8px 16px',
            borderRadius: '99px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-lg)',
            boxShadow: scrolled
              ? '0 16px 40px rgba(0,0,0,0.4)'
              : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              color: 'var(--fg)',
              textDecoration: 'none',
            }}
          >
            KS<span style={{ color: 'var(--violet-bright)' }}>.</span>
          </a>

          {/* Links (Hidden on Mobile) */}
          <nav
            className="hidden md:flex items-center gap-1 sm:gap-2"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px' }}
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  padding: '6px 12px',
                  borderRadius: '99px',
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms, background 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--fg)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--fg-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Actions Divider (Hidden on Mobile) */}
          <div className="hidden md:block" style={{ width: '1px', height: '16px', background: 'var(--border-lg)' }} />

          {/* ThemeToggle (Visible everywhere) */}
          <ThemeToggle />
          
          {/* Hire Me (Hidden on Mobile) */}
          <a
            href="#contact"
            className="hidden md:flex magnetic"
            style={{
              padding: '8px 18px',
              borderRadius: '99px',
              background: 'var(--violet)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--violet-bright)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--violet)'}
          >
            Hire Me
          </a>

          {/* Hamburger Menu Toggle (Visible only on Mobile) */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-md)',
              color: 'var(--fg)',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <motion.div initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={16} />
              </motion.div>
            ) : (
              <motion.div initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={16} />
              </motion.div>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '84px',
              left: '16px',
              right: '16px',
              zIndex: 99,
              background: 'var(--bg-surface)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-lg)',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            className="md:hidden"
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: 'var(--violet)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
