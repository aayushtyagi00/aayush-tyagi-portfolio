import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollIndicator from './components/ScrollIndicator';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0B0C0E] text-[#F2EFE8] min-h-screen">
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <ScrollIndicator />
        <Background3D />
        
        <Navbar />
        
        <main>
          <Hero isPageReady={!isLoading} />
          
          <div className="w-full h-px relative my-0 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-transparent via-[#A88B62]/40 to-transparent transition-all duration-1000" />
          </div>

          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
