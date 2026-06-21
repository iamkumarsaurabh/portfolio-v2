import type { Metadata } from 'next';
import { Syne, Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import CustomCursor from '@/components/ui/CustomCursor';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kumar Saurabh — CSE AI/ML Engineer',
  description: 'Kumar Saurabh is a CSE AI/ML Engineering student building intelligent, visually heroic digital experiences at the intersection of AI and modern web technology.',
  keywords: ['Kumar Saurabh', 'Portfolio', 'AI/ML', 'CSE', 'Web Developer', 'Next.js'],
  authors: [{ name: 'Kumar Saurabh' }],
  openGraph: {
    title: 'Kumar Saurabh — CSE AI/ML Engineer',
    description: 'Building intelligent digital experiences.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@KSaurabh5808' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${poppins.variable} ${jbMono.variable}`}>
      <body className="noise">
        {/* Custom Cursor Elements */}
        <div id="cursor-dot" className="hidden md:block" />
        <div id="cursor-ring" className="hidden md:block" />

        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
