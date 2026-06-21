import Navbar   from '@/components/ui/Navbar';
import Hero      from '@/components/sections/Hero';
import Marquee   from '@/components/sections/Marquee';
import Projects  from '@/components/sections/Projects';
import Skills    from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Contact   from '@/components/sections/Contact';
import Footer    from '@/components/ui/Footer';

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
