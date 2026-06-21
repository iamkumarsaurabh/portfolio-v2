'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

export default function Contact() {
  const { ref, visible } = useReveal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const fd = new FormData(form);
    const object = Object.fromEntries(fd);
    
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(object)
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Web3Forms Error:', data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-lg)',
    padding: '16px 0',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    color: 'var(--fg)',
    outline: 'none',
    transition: 'border-color 300ms, box-shadow 300ms',
    borderRadius: '0'
  };

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 2, padding: '120px 24px', background: 'var(--bg-base)', backdropFilter: 'blur(24px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          
          {/* Left Column - Copy */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
              color: 'var(--violet-bright)', marginBottom: '12px', textTransform: 'uppercase',
            }}>
              Connect
            </div>
            <h2 className="display-large" style={{ color: 'var(--fg)', marginBottom: '32px' }}>
              Let's build <br/>
              <span className="text-gradient">something.</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--fg-muted)',
              lineHeight: 1.7, marginBottom: '40px'
            }}>
              Currently open for new opportunities, collaborations, and ambitious projects. Reach out if you want to architect the future together.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-subtle)', marginBottom: '4px' }}>EMAIL</div>
                <a href="mailto:ksaurabhthakur.008@gmail.com" style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                  color: 'var(--fg)', textDecoration: 'none'
                }} className="underline-link">
                  ksaurabhthakur.008@gmail.com
                </a>
              </div>
               <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-subtle)', marginBottom: '4px' }}>LOCATION</div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                  color: 'var(--fg)'
                }}>
                  Panipat, Haryana, India
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-liquid" style={{
             padding: '40px',
             borderRadius: '24px',
          }}>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <input type="hidden" name="access_key" value="7eb74658-5610-4adf-aeb4-5c59009d9a50" />

              <div style={{ position: 'relative' }}>
                <input 
                  type="text" name="name" required placeholder="Name"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = '0 1px 0 var(--violet)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-lg)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <input 
                  type="email" name="email" required placeholder="Email Address"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = '0 1px 0 var(--violet)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-lg)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <textarea 
                  name="message" required placeholder="Project Details" rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.boxShadow = '0 1px 0 var(--violet)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-lg)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <button 
                type="submit" disabled={status === 'loading'}
                className="group"
                style={{
                  padding: '16px 32px',
                  borderRadius: '99px',
                  background: 'var(--violet)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  boxShadow: '0 0 20px var(--violet-glow)',
                  transition: 'all 300ms',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (status !== 'loading') {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px var(--violet-glow)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 20px var(--violet-glow)';
                }}
              >
                {status === 'idle' && <><Send size={16} /> Send Message</>}
                {status === 'loading' && <><Loader2 size={16} className="animate-spin" /> Sending...</>}
                {status === 'success' && <><CheckCircle size={16} style={{ color: 'var(--cyan)' }}/> Sent Successfully</>}
                {status === 'error' && <><AlertCircle size={16} style={{ color: '#EF4444' }}/> Error Sending</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
