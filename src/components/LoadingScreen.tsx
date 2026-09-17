import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [complete, setComplete] = useState(false);

  const handleEnter = () => {
    setComplete(true);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0C0E] select-none px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo / Text Animation */}
          <div className="relative mb-8 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl font-display font-medium tracking-[0.25em] uppercase text-[#F2EFE8] select-none text-center"
            >
              Aayush Tyagi
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs sm:text-sm font-mono mt-3 tracking-[0.35em] uppercase text-[#A88B62] select-none text-center"
            >
              Engineering Portfolio
            </motion.p>
          </div>

          {/* Enter Portfolio Button in place of loading line */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            onClick={handleEnter}
            className="px-8 py-3.5 rounded-full border border-[#A88B62] bg-[#A88B62]/15 hover:bg-[#A88B62] text-[#F2EFE8] hover:text-[#0B0C0E] text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_30px_rgba(168,139,98,0.25)] hover:shadow-[0_0_40px_rgba(168,139,98,0.5)] hover:scale-105 cursor-pointer"
          >
            <span>Enter Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
