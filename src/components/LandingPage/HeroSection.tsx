import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StartCreatingAnimation } from './StartCreatingAnimation';

const emojis = [
  { id: 1, emoji: '😃', top: '10%', left: '15%', delay: 0 },
  { id: 2, emoji: '🎬', top: '20%', right: '20%', delay: 0.5 },
  { id: 3, emoji: '🎯', bottom: '30%', left: '10%', delay: 1 },
  { id: 4, emoji: '🚀', bottom: '20%', right: '15%', delay: 1.5 },
  { id: 5, emoji: '✨', top: '50%', left: '5%', delay: 2 },
];

const HeroSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-2">
            Create Content <span className="text-lithouse-blue">Faster</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins">
            Stand Out <span className="text-lithouse-purple">Instantly</span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-lg max-w-2xl mx-auto mb-8 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Create scroll-stopping YouTube thumbnails, snappy scripts, and engaging video descriptions effortlessly.
          Let your creativity shine with tools made for creators, by creators.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-full px-8 py-3 flex items-center justify-center mx-auto shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Creating</span>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </motion.div>
        <StartCreatingAnimation/>
      </div>

      {/* Floating Emojis */}
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-3xl md:text-4xl pointer-events-none"
          style={{ 
            top: item.top, 
            left: item.left, 
            right: item.right, 
            bottom: item.bottom,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: item.delay,
          }}
        >
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {item.emoji}
          </motion.span>
        </motion.div>
      ))}
    </section>
  );
};

export default HeroSection;