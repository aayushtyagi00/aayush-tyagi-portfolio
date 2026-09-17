import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { CheckCircle2, ArrowUpRight, Layers, Activity, Cpu, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  links: { github?: string; live?: string };
  metric: string;
  mockupType: 'expertedge' | 'stockcouncil' | 'mindcraft' | 'voiceagent';
}

const projects: Project[] = [
  {
    number: "01",
    title: "ExpertEdge",
    subtitle: "Professional Consultation Marketplace",
    category: "Full-Stack & Mobile Architecture",
    description: "A production mobile-first marketplace connecting verified enterprise consultants with clients for paid real-time advisory sessions. Engineered with complete payment escrow rails, encrypted state synchronization, and an India-first transaction architecture.",
    highlights: ["17-screen responsive React Native build", "Razorpay Payment Gateway integration", "Real-time chat & calendar scheduling engine"],
    tags: ["React Native", "Firebase", "Razorpay", "Node.js", "AI/ML"],
    links: { github: "#", live: "#" },
    metric: "17 Screens · Zero Latency",
    mockupType: "expertedge"
  },
  {
    number: "02",
    title: "Stock Council AI",
    subtitle: "Multi-Agent Investment Synthesis Engine",
    category: "Autonomous Agentic Networks",
    description: "An algorithmic equity intelligence platform powered by the Claude API. Autonomous AI personas (Technical Analyst, Fundamental Analyst, Risk Assessor) conduct structured multi-round debates to synthesize quantitative consensus reports.",
    highlights: ["Autonomous multi-agent consensus runtime", "Live market streaming via Bigdata API", "Persistent vector debate history storage"],
    tags: ["Claude API", "React", "Supabase", "Bigdata API", "Python"],
    links: { github: "#", live: "#" },
    metric: "Agentic Debate · 100% Consensus",
    mockupType: "stockcouncil"
  },
  {
    number: "03",
    title: "MindCraft AI",
    subtitle: "Generative Knowledge Mapping & Study Engine",
    category: "Generative AI Systems",
    description: "An intelligent technical study accelerator powered by the Gemini API. Transforms dense textbook corpora, whitepapers, and lecture audio into hierarchical concept maps, active recall flashcards, and exportable slide decks in seconds.",
    highlights: ["Gemini 1.5 multimodal knowledge extraction", "Interactive hierarchical mind map canvas", "Automated deck export pipeline"],
    tags: ["Gemini API", "React", "Vite", "Tailwind CSS"],
    links: { github: "#", live: "#" },
    metric: "Instant Mapping · 10x Study Speed",
    mockupType: "mindcraft"
  },
  {
    number: "04",
    title: "Personal AI Voice Agent",
    subtitle: "Low-Latency Autonomous Call Triage",
    category: "Voice AI & Automation",
    description: "An enterprise-grade autonomous call screening and scheduling agent. Built with low-latency LLM speech synthesis, real-time routing logic, and customizable persona guardrails to filter unsolicited calls and synchronize high-priority meetings.",
    highlights: ["Sub-500ms voice pipeline response", "Custom system persona guardrails", "Telephony integration via Bland/Vapi"],
    tags: ["Bland.ai", "Vapi.ai", "Prompt Engineering", "Node.js"],
    links: { github: "#" },
    metric: "<500ms Pipeline Latency",
    mockupType: "voiceagent"
  }
];

function Project3DVisual({ project }: { project: Project }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-150, 150], [8, -8]);
  const rotateY = useTransform(smoothX, [-150, 150], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
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
    <div className="w-full [perspective:1000px]">
      <motion.div
        ref={visualRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full aspect-[16/11] rounded-2xl p-4 sm:p-6 bg-[#202328] border border-[#2B2D31] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden cursor-pointer group"
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2B2D31] [transform:translateZ(20px)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B2D31]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B2D31]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B2D31]" />
          </div>
          <span className="text-[10px] font-mono text-[#85827B] uppercase tracking-wider">{project.metric}</span>
        </div>

        {/* Visual Content Device Frame: Black Chrome #101214 */}
        <div className="relative w-full h-[calc(100%-36px)] rounded-xl bg-[#101214] border border-[#2B2D31] overflow-hidden flex flex-col items-center justify-center p-6 [transform:translateZ(30px)]">
          {project.mockupType === 'expertedge' && (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#15171A] border border-[#2B2D31] flex items-center justify-center mb-3 group-hover:border-[#A88B62] transition-colors">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#F2EFE8]">
                  E
                </span>
              </div>
              <span className="font-display font-semibold text-base text-[#F2EFE8] tracking-widest uppercase">ExpertEdge</span>
              <span className="text-xs font-mono text-[#A88B62] mt-1">Consultation Marketplace</span>
            </div>
          )}

          {project.mockupType === 'stockcouncil' && (
            <div className="flex flex-col items-center text-center w-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-2.5 py-1 rounded-md bg-[#15171A] border border-[#2B2D31] text-[10px] font-mono text-[#B8B5AD] flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#A88B62]" /> Technical Agent
                </div>
                <div className="px-2.5 py-1 rounded-md bg-[#15171A] border border-[#2B2D31] text-[10px] font-mono text-[#B8B5AD] flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#A88B62]" /> Risk Manager
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#15171A] border border-[#2B2D31] text-left w-full max-w-xs font-mono text-[10.5px] text-[#B8B5AD]">
                <span className="text-[#A88B62]">&gt; consensus.evaluate()</span>
                <p className="text-[#596052] mt-1 font-semibold">✓ Strong Buy Target: +18.4%</p>
              </div>
            </div>
          )}

          {project.mockupType === 'mindcraft' && (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#15171A] border border-[#2B2D31] flex items-center justify-center mb-3 group-hover:border-[#A88B62] transition-colors">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#F2EFE8]">
                  M
                </span>
              </div>
              <span className="font-display font-semibold text-base text-[#F2EFE8] tracking-widest uppercase">MindCraft AI</span>
              <span className="text-xs font-mono text-[#A88B62] mt-1">Cognitive Mind Map Engine</span>
            </div>
          )}

          {project.mockupType === 'voiceagent' && (
            <div className="flex flex-col items-center text-center w-full">
              <div className="w-14 h-14 rounded-full bg-[#15171A] border border-[#2B2D31] flex items-center justify-center mb-3 group-hover:border-[#A88B62] transition-colors">
                <Terminal className="w-6 h-6 text-[#A88B62]" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#15171A] border border-[#2B2D31] text-[#B8B5AD] text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#596052]" />
                Low-Latency Telephony Stream
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectItemRefs.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0B0C0E]" ref={containerRef}>
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15171A] border border-[#2B2D31] text-[#A88B62] text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F2EFE8] mb-4 tracking-tight">
            Selected Engineering Works
          </h2>
          <p className="text-[#85827B] text-sm sm:text-base max-w-xl mx-auto">
            Production full-stack applications, agentic orchestrators, and AI systems built for performance and real users.
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24 sm:gap-32 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <div 
              key={project.title}
              ref={(el) => { projectItemRefs.current[idx] = el; }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}
            >
              {/* Content Column */}
              <div className="w-full lg:w-1/2 flex flex-col">
                
                {/* Numbering & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#A88B62] tracking-wider">
                    {project.number}
                  </span>
                  <span className="text-xs text-[#85827B]">·</span>
                  <span className="font-mono text-xs text-[#85827B] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F2EFE8] mb-2">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-[#A88B62] uppercase tracking-wider mb-5">
                  {project.subtitle}
                </span>
                
                {/* Description Panel: Graphite #15171A */}
                <div className="p-5 sm:p-6 rounded-xl bg-[#15171A] border border-[#2B2D31] mb-6">
                  <p className="text-[#B8B5AD] text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Architecture Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#B8B5AD]">
                      <CheckCircle2 className="w-4 h-4 text-[#A88B62] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#15171A] text-[#85827B] border border-[#2B2D31]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.links.github && (
                    <a 
                      href={project.links.github} 
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15171A] border border-[#2B2D31] hover:border-[#A88B62] text-[#F2EFE8] text-xs font-mono font-medium transition-all"
                    >
                      <FaGithub className="text-sm" />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a 
                      href={project.links.live} 
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F2EFE8] hover:bg-[#FAF9F6] text-[#0B0C0E] text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-[1.02] shadow-md"
                    >
                      <span>Live Architecture</span>
                      <ArrowUpRight className="w-4 h-4 text-[#0B0C0E]" />
                    </a>
                  )}
                </div>
              </div>

              {/* 3D Visual Mockup Column */}
              <div className="w-full lg:w-1/2">
                <Project3DVisual project={project} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
