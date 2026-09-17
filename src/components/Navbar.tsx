import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 font-sans ${
        scrolled 
          ? 'top-4 w-[92%] md:w-[85%] max-w-5xl rounded-full bg-[#0B0C0E]/85 backdrop-blur-md px-6 md:px-8 py-3 border border-[#2B2D31] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'top-6 w-[95%] md:w-[90%] max-w-6xl rounded-full bg-[#0B0C0E]/60 backdrop-blur-sm px-6 md:px-10 py-3.5 border border-[#202226]'
      } ${mobileMenuOpen ? 'rounded-[24px!important] bg-[#0B0C0E] border-[#2B2D31]' : ''}`}
    >
      <div className="w-full flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a href="#home" className="text-base sm:text-lg font-display font-bold flex items-center gap-2 text-[#F2EFE8] group">
          <span>Aayush Tyagi</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#A88B62] group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                  isActive ? 'text-[#F2EFE8] font-semibold' : 'text-[#B8B5AD] hover:text-[#FAF9F6]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A88B62]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#B8B5AD] p-1.5 hover:text-[#F2EFE8] transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-80 mt-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-4 py-3 border-t border-[#2B2D31] mt-2">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xs font-mono tracking-widest uppercase py-1 ${
                activeSection === link.id ? 'text-[#F2EFE8] font-bold' : 'text-[#B8B5AD] hover:text-[#F2EFE8]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
