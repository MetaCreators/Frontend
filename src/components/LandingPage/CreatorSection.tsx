
import { motion } from 'framer-motion';
import { Video, Smartphone, LightbulbIcon } from 'lucide-react';

const creatorTypes = [
  {
    id: 1,
    title: 'YouTube Creators & Streamers',
    description: 'From gaming to vlogs, make your content pop with scroll-stopping thumbnails and scripts that keep viewers watching.',
    icon: Video,
  },
  {
    id: 2,
    title: 'Short-Form Creators',
    subtext: '(Reels, TikTok, Shorts)',
    description: 'Need to move fast? Get punchy captions, hooks, and visual assets that make your short videos stand out.',
    icon: Smartphone,
  },
  {
    id: 3,
    title: 'Solo Creators & Side Hustlers',
    description: 'Juggling everything alone? We take care of the content grunt work so you can stay creative and consistent.',
    icon: LightbulbIcon,
  }
];

const CreatorSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">Built for Modern Content Creators</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {creatorTypes.map((type) => {
            //const Icon = type.icon;
            
            return (
              <motion.div 
                key={type.id} 
                className="bg-white rounded-lg p-6 shadow-md"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4">
                    <img 
                      src={`https://api.dicebear.com/6.x/personas/svg?seed=${type.id}`} 
                      alt={type.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{type.title}</h3>
                  {type.subtext && <p className="text-sm text-gray-500 mb-2">{type.subtext}</p>}
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CreatorSection;