import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiTensorflow, SiFirebase, SiSupabase, SiMongodb, SiGit, SiGithub, SiFigma, SiVite, SiVercel,
  SiHuggingface, SiScikitlearn, SiAnthropic, SiGooglegemini
} from 'react-icons/si';
import { Sparkles, Layers, Cpu, Code2, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  category: 'languages' | 'frameworks' | 'ai' | 'tools';
  icon: React.ReactNode;
  level: string;
  brandColor: string;
}

const allSkills: SkillItem[] = [
  // Languages
  { name: "Python", category: "languages", icon: <SiPython />, level: "Advanced", brandColor: "#3776AB" },
  { name: "JavaScript", category: "languages", icon: <SiJavascript />, level: "Expert", brandColor: "#F7DF1E" },
  { name: "TypeScript", category: "languages", icon: <SiTypescript />, level: "Advanced", brandColor: "#3178C6" },
  { name: "C++", category: "languages", icon: <SiCplusplus />, level: "Intermediate", brandColor: "#00599C" },
  { name: "HTML5", category: "languages", icon: <SiHtml5 />, level: "Expert", brandColor: "#E34F26" },
  { name: "CSS3", category: "languages", icon: <SiCss />, level: "Expert", brandColor: "#1572B6" },

  // Frameworks & Web
  { name: "React", category: "frameworks", icon: <SiReact />, level: "Expert", brandColor: "#61DAFB" },
  { name: "React Native", category: "frameworks", icon: <SiReact />, level: "Advanced", brandColor: "#61DAFB" },
  { name: "Next.js", category: "frameworks", icon: <SiNextdotjs />, level: "Advanced", brandColor: "#FFFFFF" },
  { name: "Node.js", category: "frameworks", icon: <SiNodedotjs />, level: "Advanced", brandColor: "#5FA04E" },
  { name: "Express", category: "frameworks", icon: <SiExpress />, level: "Advanced", brandColor: "#E5E7EB" },
  { name: "Tailwind CSS", category: "frameworks", icon: <SiTailwindcss />, level: "Expert", brandColor: "#06B6D4" },

  // AI & ML
  { name: "TensorFlow", category: "ai", icon: <SiTensorflow />, level: "Intermediate", brandColor: "#FF6F00" },
  { name: "Scikit-learn", category: "ai", icon: <SiScikitlearn />, level: "Intermediate", brandColor: "#F7931E" },
  { name: "Claude API", category: "ai", icon: <SiAnthropic />, level: "Advanced", brandColor: "#D97706" },
  { name: "Gemini API", category: "ai", icon: <SiGooglegemini />, level: "Advanced", brandColor: "#4E88FF" },
  { name: "LangChain", category: "ai", icon: <Cpu className="w-5 h-5" />, level: "Intermediate", brandColor: "#10B981" },
  { name: "Hugging Face", category: "ai", icon: <SiHuggingface />, level: "Intermediate", brandColor: "#FFD21E" },

  // Tools & Cloud
  { name: "Firebase", category: "tools", icon: <SiFirebase />, level: "Advanced", brandColor: "#FFCA28" },
  { name: "Supabase", category: "tools", icon: <SiSupabase />, level: "Advanced", brandColor: "#3ECF8E" },
  { name: "MongoDB", category: "tools", icon: <SiMongodb />, level: "Intermediate", brandColor: "#47A248" },
  { name: "Git & GitHub", category: "tools", icon: <SiGit />, level: "Expert", brandColor: "#F05032" },
  { name: "Figma", category: "tools", icon: <SiFigma />, level: "Advanced", brandColor: "#F24E1E" },
  { name: "Vite", category: "tools", icon: <SiVite />, level: "Expert", brandColor: "#646CFF" },
  { name: "Vercel", category: "tools", icon: <SiVercel />, level: "Advanced", brandColor: "#FFFFFF" },
];

interface SkillCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  categoryKey: 'languages' | 'frameworks' | 'ai' | 'tools';
}

const skillCategories: SkillCategoryGroup[] = [
  {
    id: 'languages',
    title: 'Core Programming & Languages',
    subtitle: 'High-performance computing, typed systems, and web standards',
    icon: <Code2 className="w-4 h-4 text-[#A88B62]" />,
    categoryKey: 'languages'
  },
  {
    id: 'frameworks',
    title: 'Web & Mobile Engineering',
    subtitle: 'Modern component architectures, SSR frameworks, and reactive client UIs',
    icon: <Layers className="w-4 h-4 text-[#A88B62]" />,
    categoryKey: 'frameworks'
  },
  {
    id: 'ai',
    title: 'AI & Neural Systems',
    subtitle: 'Foundation LLMs, multi-agent orchestration, and machine learning pipelines',
    icon: <Cpu className="w-4 h-4 text-[#A88B62]" />,
    categoryKey: 'ai'
  },
  {
    id: 'tools',
    title: 'Cloud, Databases & Tooling',
    subtitle: 'Distributed backends, real-time databases, design systems, and CI/CD',
    icon: <Database className="w-4 h-4 text-[#A88B62]" />,
    categoryKey: 'tools'
  },
];

function Skill3DCard({ skill }: { skill: SkillItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="[perspective:800px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 8 : 0}px)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className={`relative group w-full h-[135px] rounded-xl p-4 flex flex-col justify-between items-center text-center cursor-pointer border bg-[#15171A] transition-all duration-300 ${
          isHovered 
            ? 'border-[#A88B62] bg-[#202328] shadow-[0_8px_25px_rgba(0,0,0,0.5)]' 
            : 'border-[#2B2D31]'
        }`}
      >
        {/* Subtle Bronze Top Line on Hover */}
        {isHovered && (
          <div 
            className="absolute top-0 left-0 right-0 h-[1.5px]" 
            style={{ backgroundColor: skill.brandColor }}
          />
        )}

        {/* Icon Container: displaying original logo brand color */}
        <div 
          className="relative z-10 w-11 h-11 rounded-lg flex items-center justify-center bg-[#202328] border border-[#2B2D31] group-hover:border-[#3B3C3A] transition-all duration-300"
          style={{
            boxShadow: isHovered ? `0 0 16px ${skill.brandColor}33` : undefined,
          }}
        >
          <div 
            className="text-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ color: skill.brandColor }}
          >
            {skill.icon}
          </div>
        </div>

        {/* Name & Mastery Label */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-xs font-display font-medium text-[#F2EFE8] group-hover:text-[#FAF9F6] transition-colors">
            {skill.name}
          </span>
          <span className="text-[9.5px] font-mono tracking-wider text-[#85827B] mt-0.5">
            {skill.level}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'languages' | 'frameworks' | 'ai' | 'tools'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const displayedCategories = selectedFilter === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.categoryKey === selectedFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#0B0C0E]" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Heading */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15171A] border border-[#2B2D31] text-[#A88B62] text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F2EFE8] mb-4 tracking-tight">
            Engineering Arsenal
          </h2>
          <p className="text-[#85827B] text-sm sm:text-base max-w-xl mx-auto">
            Categorized toolkit separated by functional domain — from low-level systems and client architectures to neural models and cloud backends.
          </p>
        </div>

        {/* Quick Domain Filter Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mx-auto mb-16">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#F2EFE8] text-[#0B0C0E] font-bold shadow-md'
                : 'bg-[#15171A] border border-[#2B2D31] text-[#B8B5AD] hover:text-[#F2EFE8] hover:border-[#3B3C3A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Domains</span>
          </button>
          {skillCategories.map((cat) => {
            const isActive = selectedFilter === cat.categoryKey;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.categoryKey)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#F2EFE8] text-[#0B0C0E] font-bold shadow-md' 
                    : 'bg-[#15171A] border border-[#2B2D31] text-[#B8B5AD] hover:text-[#F2EFE8] hover:border-[#3B3C3A]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Separated Categories by Use */}
        <div className="space-y-12 sm:space-y-16">
          <AnimatePresence mode="wait">
            {displayedCategories.map((group, groupIdx) => {
              const groupSkills = allSkills.filter(s => s.category === group.categoryKey);
              
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                  className="rounded-2xl p-6 sm:p-8 bg-[#101214] border border-[#23262B] relative overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#23262B]">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#181B1F] border border-[#2E3138] flex items-center justify-center text-[#A88B62] shadow-inner shrink-0">
                        {group.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg sm:text-xl font-display font-semibold text-[#F2EFE8]">
                            {group.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#181B1F] text-[#A88B62] border border-[#2E3138]">
                            {groupSkills.length} tools
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#85827B] mt-0.5">
                          {group.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {groupSkills.map((skill) => (
                      <Skill3DCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
