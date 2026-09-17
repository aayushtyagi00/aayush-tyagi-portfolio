import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[2px] z-40">
      <div className="absolute top-0 left-0 w-full h-full bg-[#202226]" />
      <motion.div 
        className="absolute top-0 left-0 w-full bg-[#A88B62] origin-top"
        style={{ scaleY }}
      />
      
      {/* Precision indicator dot */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F2EFE8] rounded-full border border-[#A88B62]"
        style={{ top: dotTop }}
      />
    </div>
  );
}
