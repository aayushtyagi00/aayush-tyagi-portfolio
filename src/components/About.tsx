import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Terminal, Code2, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ end, label, subtitle }: { end: string; label: string; subtitle?: string }) => {
  return (
    <div className="p-4 rounded-xl bg-[#202328] border border-[#2B2D31] flex flex-col justify-center">
      <span className="text-2xl sm:text-3xl font-display font-bold text-[#F2EFE8] mb-1">
        {end}
      </span>
      <span className="text-xs uppercase tracking-wider text-[#B8B5AD] font-medium font-mono">{label}</span>
      {subtitle && <span className="text-[10px] text-[#85827B] font-mono mt-0.5">{subtitle}</span>}
    </div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: -50, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(cardRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { 
          x: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth 3D tilt tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-150, 150], [10, -10]);
  const rotateY = useTransform(smoothX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="relative min-h-screen py-24 sm:py-32 flex items-center bg-[#15171A] border-y border-[#202226]" ref={containerRef}>
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl" ref={textRef}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202328] border border-[#2B2D31] text-[#A88B62] text-xs font-mono tracking-widest uppercase mb-5 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Identity &amp; Focus</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F2EFE8] mb-6 leading-tight tracking-tight">
              Engineering Intelligence,<br />
              Architecting Realities.
            </h2>
            
            <div className="space-y-4 text-[#B8B5AD] text-sm sm:text-base mb-8 max-w-xl leading-relaxed">
              <p>
                I'm <strong className="text-[#F2EFE8] font-semibold">Aayush Tyagi</strong>, a first-year BTech Computer Science (AI/ML) 
                student at Lovely Professional University.
              </p>
              <p>
                My focus lies in building production full-stack AI applications—from multi-agent algorithmic investment engines and autonomous voice dispatchers to scalable mobile marketplaces with frictionless payments.
              </p>
              <p className="text-[#85827B]">
                My engineering approach combines rigorous machine learning pipelines with high-fidelity, interactive 3D interfaces and resilient backend systems.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              <StatCounter end="5+" label="Shipped Apps" subtitle="Web & Native" />
              <StatCounter end="3+" label="AI Pipelines" subtitle="Claude & Gemini" />
              <StatCounter end="100%" label="Code Ownership" subtitle="Full Stack" />
            </div>
          </div>

          {/* Right 3D Architectural Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end [perspective:1200px]" ref={cardRef}>
            <div className="relative w-full max-w-[370px]">
              
              <motion.div
                style={{ 
                  rotateX, 
                  rotateY, 
                  transformStyle: "preserve-3d" 
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full rounded-2xl p-6 sm:p-8 border border-[#2B2D31] bg-[#202328] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer group"
              >
                {/* Top Accent Strip in Brushed Bronze */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#A88B62]" />

                {/* Card Header Status */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2B2D31] [transform:translateZ(20px)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#596052]" />
                    <span className="text-[11px] font-mono tracking-wider text-[#F2EFE8] uppercase">Status: Active</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#85827B] px-2 py-0.5 rounded bg-[#15171A] border border-[#2B2D31]">
                    ID: AT-2026
                  </div>
                </div>

                {/* Center Monogram Specimen */}
                <div className="relative w-28 h-28 mx-auto mb-6 rounded-2xl bg-[#15171A] border border-[#2B2D31] flex flex-col items-center justify-center [transform:translateZ(35px)] group-hover:border-[#A88B62] transition-colors duration-300">
                  <span className="font-display font-bold text-4xl text-[#F2EFE8]">
                    AT
                  </span>
                  <span className="text-[9px] font-mono text-[#A88B62] mt-1 tracking-widest uppercase">
                    Developer
                  </span>
                </div>

                {/* Card Information Rows */}
                <div className="space-y-3 font-mono text-xs [transform:translateZ(25px)]">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#15171A] border border-[#2B2D31]">
                    <span className="text-[#85827B] flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#A88B62]" /> Major
                    </span>
                    <span className="text-[#F2EFE8] font-medium">BTech CSE (AI/ML)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#15171A] border border-[#2B2D31]">
                    <span className="text-[#85827B] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A88B62]" /> Location
                    </span>
                    <span className="text-[#F2EFE8] font-medium">Phagwara, Punjab</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#15171A] border border-[#2B2D31]">
                    <span className="text-[#85827B] flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#A88B62]" /> Core Focus
                    </span>
                    <span className="text-[#A88B62] font-semibold">Autonomous Systems</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
