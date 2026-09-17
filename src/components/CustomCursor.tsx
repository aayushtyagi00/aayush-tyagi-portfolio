import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on screens with hover pointer (non-touch) and desktop size
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!hasCoarsePointer && window.innerWidth >= 768) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Check if hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Inner Dot: Warm Ivory */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-[#F2EFE8] rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 2.5,
          y: mousePosition.y - 2.5,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      
      {/* Outer Ring: Brushed Bronze */}
      <motion.div
        className={`fixed top-0 left-0 border border-[#A88B62] rounded-full pointer-events-none z-[99] transition-colors duration-300 ${
          isHovering ? 'bg-[#A88B62]/15 border-[#C2A77C]' : 'bg-transparent'
        }`}
        animate={{
          x: mousePosition.x - (isHovering ? 26 : 18),
          y: mousePosition.y - (isHovering ? 26 : 18),
          width: isHovering ? 52 : 36,
          height: isHovering ? 52 : 36,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 160, 
          damping: 22, 
          mass: 0.5 
        }}
      />
    </>
  );
}
