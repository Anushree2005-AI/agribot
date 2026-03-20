'use client';

import { m as motion } from 'framer-motion';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const springBounce = { type: 'spring', stiffness: 380, damping: 18 };
const fastEaseOut = [0.16, 1, 0.3, 1];
const smoothInOut = [0.4, 0, 0.2, 1];

export default function DarkModeToggle({ darkMode, toggleDarkMode }: Props) {
  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-5 right-5 md:top-6 md:right-8 p-1.5 rounded-full overflow-hidden group"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="relative w-11 h-11 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={springBounce}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: darkMode ? 1.18 : 0.5,
            backgroundColor: darkMode ? 'rgba(59,130,246,0.24)' : 'rgba(234,179,8,0.3)',
          }}
          transition={{ duration: 0.55, ease: fastEaseOut }}
        />
        <motion.div
          key={darkMode ? 'moon' : 'sun'}
          initial={{ rotate: -45, opacity: 0, scale: 0.65 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.42, ease: smoothInOut }}
          className="text-3xl relative z-10 drop-shadow-lg"
        >
          {darkMode ? '🌙' : '☀️'}
        </motion.div>
      </motion.div>
    </button>
  );
}