
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParallaxCard from './ParallaxCard';

type Tab = {
  id: number;
  color: string;
  title: string;
  description: string;
};

const tabs: Tab[] = [
  {
    id: 1,
    color: 'bg-lithouse-green',
    title: 'AI Script Generator',
    description: 'Create compelling scripts that keep viewers engaged throughout your video — tailored to your unique style and voice.',
  },
  {
    id: 2,
    color: 'bg-lithouse-purple',
    title: 'Video Description Builder',
    description: 'Generate SEO-optimized video descriptions with smart keyword integration to help your content rank higher.',
  },
  {
    id: 3,
    color: 'bg-lithouse-pink',
    title: 'Stunning Thumbnails in Seconds',
    description: 'Generate eye-catching thumbnails that boost clicks — no design skills needed.',
  },
];

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState(3);
  
  return (
    <section className="py-16 px-4 mt-[50vh]">
      <div className="container mx-auto max-w-5xl">
        {/* <div className="relative mt-20">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              className={`rounded-lg p-6 shadow-md ${tab.color} absolute inset-x-0 cursor-pointer`}
              style={{
                zIndex: tab.id === activeTab ? 30 : 10 + index,
                top: `${(tabs.length - 1 - index) * -20}px`,
                opacity: tab.id === activeTab ? 1 : 0.8,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: tab.id === activeTab ? 1 : 0.8, y: 0 }}
              whileHover={{ 
                scale: tab.id !== activeTab ? 1.02 : 1,
                opacity: tab.id !== activeTab ? 0.9 : 1,
              }}
              onClick={() => setActiveTab(tab.id)}
              transition={{ duration: 0.3 }}
            >
              <div className={`${tab.id === activeTab ? 'block' : 'opacity-0 h-0 overflow-hidden'}`}>
                <h3 className="text-xl font-bold mb-2">{tab.title}</h3>
                <p className="text-gray-800">{tab.description}</p>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer for content position */}
          {/* <div className="h-32"></div>
          
          {/* Active tab content (visible) */}
          {/* <motion.div
            className="rounded-lg p-6 shadow-md bg-lithouse-pink mt-48 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-2">{tabs[2].title}</h3>
            <p className="text-gray-800">{tabs[2].description}</p>
          </motion.div>
        </div>*/}
      </div> 
      <ParallaxCard/>
    </section>
  );
};

export default FeatureTabs;