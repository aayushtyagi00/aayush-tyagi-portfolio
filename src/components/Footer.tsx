export default function Footer() {
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#08090A] pt-16 pb-10 border-t border-[#2B2D31]">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        {/* Monogram / Brand mark */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display font-bold text-2xl text-[#F2EFE8] tracking-tight">Aayush Tyagi</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#A88B62]" />
        </div>

        <p className="text-[#85827B] text-xs font-mono mb-8 tracking-wider uppercase">
          AI/ML Engineering · Autonomous Systems · Full-Stack Architecture
        </p>

        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[#B8B5AD] hover:text-[#C2A77C] transition-colors text-xs uppercase tracking-widest font-mono font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="w-full max-w-sm h-px bg-[#202226] mb-6" />
        
        <p className="text-[#6E6B65] text-xs font-mono">
          © {new Date().getFullYear()} Aayush Tyagi · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
