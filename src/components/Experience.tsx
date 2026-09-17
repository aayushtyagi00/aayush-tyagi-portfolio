import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Rocket, Sparkles, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  location: string;
  type: 'education' | 'experience' | 'milestone';
  description: string;
  achievements: string[];
  tech?: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "2026 — Present",
    role: "BTech in Computer Science (AI & ML)",
    organization: "Lovely Professional University",
    location: "Punjab, India",
    type: "education",
    description: "Specializing in Machine Learning, Autonomous Multi-Agent Architectures, and Full-Stack Engineering with coursework in Data Structures, Neural Networks, and Distributed Systems.",
    achievements: [
      "Consistent high academic standing in core computer science curriculum",
      "Architected and deployed full-stack native mobile apps & generative AI tools",
      "Led student project initiatives in applied LLM reasoning pipelines"
    ],
    tech: ["Python", "TensorFlow", "React Native", "TypeScript", "C++"]
  },
  {
    year: "2025 — 2026",
    role: "Full-Stack AI Project Architect",
    organization: "Independent Development",
    location: "Remote",
    type: "milestone",
    description: "Designed, developed, and deployed high-complexity software products including ExpertEdge (marketplace app with Razorpay integration) and Stock Council AI (Claude-driven debate engine).",
    achievements: [
      "Successfully integrated Indian payment rails and secure escrow workflows",
      "Created sub-500ms voice agent pipelines using modern telephony APIs",
      "Open-sourced production-ready React and React Native codebases"
    ],
    tech: ["React Native", "Claude API", "Gemini API", "Supabase", "Firebase"]
  },
  {
    year: "2024 — 2026",
    role: "Higher Secondary Education",
    organization: "Senior Secondary School",
    location: "India",
    type: "education",
    description: "Focused on Physics, Chemistry, and Advanced Mathematics, establishing strong analytical foundations in linear algebra, calculus, and computational problem solving.",
    achievements: [
      "Excellence in Mathematics and Physics Olympiads",
      "Early mastery of programming fundamentals in C++ and Python"
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-[#15171A] border-t border-[#202226]" ref={containerRef}>
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202328] border border-[#2B2D31] text-[#A88B62] text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestones &amp; Path</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F2EFE8] mb-4 tracking-tight">
            Education &amp; Experience
          </h2>
          <p className="text-[#85827B] text-sm sm:text-base max-w-xl mx-auto">
            The timeline of academic excellence, independent architectural engineering, and system design mastery.
          </p>
        </div>

        {/* Central Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Connecting Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#2B2D31] md:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.year + item.role}
                  ref={(el) => { itemsRef.current[idx] = el; }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#202328] border-2 border-[#A88B62] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,139,98,0.2)]">
                    {item.type === 'education' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#F2EFE8]" />
                    ) : item.type === 'experience' ? (
                      <Briefcase className="w-3.5 h-3.5 text-[#F2EFE8]" />
                    ) : (
                      <Rocket className="w-3.5 h-3.5 text-[#F2EFE8]" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} w-full`}>
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#202328] border border-[#2B2D31] shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-[#A88B62] transition-colors duration-300">
                      
                      {/* Date & Location Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-[#A88B62] tracking-wider uppercase">
                          {item.year}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] text-[#85827B]">
                          <MapPin className="w-3 h-3 text-[#A88B62]" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-[#F2EFE8] mb-1">
                        {item.role}
                      </h3>
                      
                      <div className="text-xs font-mono text-[#85827B] mb-4">
                        {item.organization}
                      </div>

                      <p className="text-[#B8B5AD] text-xs sm:text-sm leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2 mb-5">
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-[#B8B5AD]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A88B62] mt-1.5 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#2B2D31]">
                          {item.tech.map((t) => (
                            <span 
                              key={t}
                              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#15171A] text-[#85827B] border border-[#2B2D31]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
