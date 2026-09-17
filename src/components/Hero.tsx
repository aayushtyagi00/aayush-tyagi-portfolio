import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Brain, Code2, Terminal, Bot 
} from 'lucide-react';
import { FaGithub, FaInstagram, FaXTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import heroVideoSrc from '../assets/hero-video.mp4';

export default function Hero({ isPageReady = true }: { isPageReady?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Play video with audio as soon as page is ready
  useEffect(() => {
    if (!isPageReady) return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.volume = 1.0;

    // Attempt unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay before interaction,
          // play with mute initially and unlock audio instantly on first gesture
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // Instantly unlock audio on ANY user click, touch, key, or pointer interaction anywhere on the page
    const unlockAudio = () => {
      if (videoRef.current) {
        videoRef.current.volume = 1.0;
        videoRef.current.muted = false;
        const p = videoRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            setIsMuted(false);
            setIsPlaying(true);
            cleanupListeners();
          }).catch(() => {});
        }
      }
    };

    const cleanupListeners = () => {
      document.removeEventListener('pointerdown', unlockAudio, true);
      document.removeEventListener('click', unlockAudio, true);
      document.removeEventListener('touchstart', unlockAudio, true);
      document.removeEventListener('keydown', unlockAudio, true);
    };

    document.addEventListener('pointerdown', unlockAudio, true);
    document.addEventListener('click', unlockAudio, true);
    document.addEventListener('touchstart', unlockAudio, true);
    document.addEventListener('keydown', unlockAudio, true);

    return () => {
      cleanupListeners();
    };
  }, [isPageReady]);

  // Mute / Unmute toggle
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.volume = 1.0;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // =========================================================================
  // SCROLL OBSERVER: 
  // - When scrolling away from Hero: automatically mute audio and pause video
  // - When scrolling back to Hero: automatically unmute audio and play video
  // =========================================================================
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // IntersectionObserver to detect when Hero enters or leaves the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            // User came back to the hero section: automatically unmute and play
            video.muted = false;
            setIsMuted(false);
            video.play().catch(() => {});
            setIsPlaying(true);
          } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.1) {
            // User scrolled away to the next section: automatically mute and pause
            video.muted = true;
            setIsMuted(true);
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.6]
      }
    );

    observer.observe(section);

    // Scroll event listener as resilient fallback for Lenis smooth-scrolling
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      // If hero section has scrolled past the top (user is on About, Skills, etc.)
      if (rect.bottom < 100) {
        if (!video.muted) {
          video.muted = true;
          setIsMuted(true);
        }
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      } else if (rect.top > -rect.height * 0.5 && rect.bottom > 250) {
        // User came back to the hero section: automatically unmute and play
        if (video.muted) {
          video.muted = false;
          setIsMuted(false);
        }
        if (video.paused) {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const socials = [
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com/aayushtyagi00" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com/in/aayushtyagi00" },
    { name: "Twitter / X", icon: <FaXTwitter />, href: "https://x.com/aayushtyagi00" },
    { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com/aayushtyagi00" },
    { name: "Email", icon: <FaEnvelope />, href: "mailto:tyagiaayush3030@gmail.com" },
  ];

  const highlights = [
    { label: "Autonomous Agents", icon: <Bot className="w-3.5 h-3.5 text-[#A88B62]" /> },
    { label: "Full-Stack Architecture", icon: <Code2 className="w-3.5 h-3.5 text-[#A88B62]" /> },
    { label: "Deep Learning & NLP", icon: <Brain className="w-3.5 h-3.5 text-[#A88B62]" /> },
    { label: "Interactive 3D / WebGL", icon: <Terminal className="w-3.5 h-3.5 text-[#A88B62]" /> },
  ];

  return (
    <section 
      id="home" 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#0B0C0E]"
    >
      {/* =========================================================================
          FULL-SCREEN BACKGROUND VIDEO LAYER
          Positioned towards the right so Aayush's face & suit are clearly visible
          without being covered by the left-aligned text column
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          defaultMuted
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-[70%_center] md:object-[68%_center] lg:object-[65%_center] scale-[1.02]"
        >
          <source src={heroVideoSrc} type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/The_man_looks_into_the_camera_gwr_video_mvp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 
          HORIZONTAL GRADIENT SCRIM:
          Deep solid Obsidian (#0B0C0E) on the left side to guarantee perfect contrast 
          and readability for the text, gradually feathering to TRANSPARENT on the right 
          so the video subject (Aayush) is completely bright, crisp, and unobscured.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/90 via-35% md:via-48% lg:via-45% to-transparent" />
        
        {/* Subtle vertical fades for seamless top/bottom page integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,139,98,0.12),transparent_60%)]" />
      </div>

      {/* =========================================================================
          MAIN HERO CONTENT: ALIGNED TO THE LEFT SIDE
          Keeps the video subject on the right completely unobstructed
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 min-h-[calc(100vh-80px)] flex items-center">
        
        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
          
          {/* Status Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#15171A]/90 border border-[#2B2D31] text-xs font-mono mb-5 backdrop-blur-xl shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#596052] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#737968]"></span>
            </span>
            <span className="text-[#B8B5AD]">AI &amp; Full-Stack Engineer</span>
            <span className="text-[#85827B]">·</span>
            <span className="text-[#A88B62] font-semibold">Available for Opportunities</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#F2EFE8] leading-[1.02] tracking-tight mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
          >
            Aayush Tyagi
          </motion.h1>

          {/* Subtitle / Department Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-2.5 mb-5 flex-wrap"
          >
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#A88B62] font-semibold">
              LPU CSE (AI/ML)
            </span>
            <span className="text-[#85827B]">/</span>
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#F2EFE8]">
              Autonomous Systems Architect
            </span>
          </motion.div>

          {/* Narrative Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-[#B8B5AD] max-w-xl mb-7 leading-relaxed drop-shadow-md"
          >
            Engineering intelligent multi-agent ecosystems, production-grade deep learning pipelines, and immersive digital interfaces. Turning complex algorithmic intelligence into fluid, beautifully engineered software.
          </motion.p>

          {/* Capabilities Tag Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-8 max-w-xl"
          >
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#15171A]/85 border border-[#2B2D31] text-[11px] font-mono text-[#F2EFE8] backdrop-blur-md hover:border-[#A88B62]/70 hover:bg-[#202328]/90 transition-all shadow-sm"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Button Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mb-8"
          >
            {/* Primary CTA */}
            <a 
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-[#F2EFE8] hover:bg-[#FAF9F6] text-[#0B0C0E] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 text-[#0B0C0E]" />
            </a>

            {/* Secondary CTA */}
            <a 
              href="#contact"
              className="px-7 py-3.5 rounded-full bg-[#15171A]/80 hover:bg-[#A88B62] text-[#F2EFE8] hover:text-[#0B0C0E] border border-[#A88B62] text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-md"
            >
              <span>Initiate Contact</span>
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex items-center gap-3 flex-wrap"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="p-2.5 rounded-full bg-[#15171A]/80 border border-[#2B2D31] text-[#B8B5AD] hover:text-[#F2EFE8] hover:border-[#A88B62] transition-all duration-300 hover:scale-110 backdrop-blur-md shadow-sm"
              >
                <span className="text-sm">{social.icon}</span>
              </a>
            ))}
          </motion.div>

        </div>

      </div>

    </section>
  );
}
