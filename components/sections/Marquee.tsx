'use client';

import { Code2, Zap, Terminal, Server, Database, Globe, Layers, Cpu, Braces, GitBranch } from 'lucide-react';

const ITEMS = [
  { icon: Code2,    label: 'HTML & CSS'      },
  { icon: Zap,      label: 'JavaScript ES6+' },
  { icon: Terminal, label: 'Python'           },
  { icon: Server,   label: 'Flask'            },
  { icon: Database, label: 'SQL'              },
  { icon: Globe,    label: 'Next.js'          },
  { icon: Layers,   label: 'React'            },
  { icon: Cpu,      label: 'AI / ML'          },
  { icon: Braces,   label: 'TypeScript'       },
  { icon: GitBranch,label: 'Git & GitHub'     },
];

const DOUBLE = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(8px)',
        padding: '18px 0',
      }}
    >
      {/* Fade edges */}
      {['left','right'].map(side => (
        <div key={side} style={{
          position: 'absolute', top: 0, bottom: 0, width: '120px', zIndex: 1, pointerEvents: 'none',
          [side]: 0,
          background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--bg-deep), transparent)`,
        }} />
      ))}

      <div className="marquee-inner">
        {DOUBLE.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              marginRight: '52px', whiteSpace: 'nowrap', userSelect: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500,
              color: 'var(--fg-muted)',
              transition: 'color 200ms',
            }}>
              <Icon size={14} style={{ color: 'var(--violet-bright)', flexShrink: 0 }} strokeWidth={2} />
              {item.label}
              {i < DOUBLE.length - 1 && (
                <span style={{ marginLeft: '28px', color: 'var(--border-lg)', fontSize: '10px' }}>✦</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
