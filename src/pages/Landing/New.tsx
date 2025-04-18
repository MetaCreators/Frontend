import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//import FeatureTabs from '../components/FeatureTabs';
//import CreatorSection from '../components/CreatorSection';
//import PricingSection from '../components/PricingSection';
//import Footer from '../components/Footer';
import NewNavbar from '@/components/common/NewNavBar';
import HeroSection from '@/components/LandingPage/HeroSection';
import ProductPreview from '@/components/LandingPage/ProductPreview';
import FeatureTabs from '@/components/LandingPage/FeatureTabs';
import Footer from '@/components/common/Footer';
import CreatorSection from '@/components/LandingPage/CreatorSection';
import PricingSection from '@/components/LandingPage/PricingSection';

const NewLanding = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NewNavbar />
      <HeroSection />
      <ProductPreview />
      <FeatureTabs />
      <CreatorSection />
      <PricingSection />
      
      {/* Scroll-to-top button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-white p-3 rounded-full shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
      
      <Footer />
    </div>
  );
};

export default NewLanding;