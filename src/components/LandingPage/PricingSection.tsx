
import { motion } from 'framer-motion';

const PricingSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
            Simple Pricing, <br className="md:hidden" />Built for Creators
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            No hidden fees. Just powerful tools to level up your content.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a 
            href="#pricing"
            className="inline-block bg-lithouse-yellow text-gray-900 font-bold rounded-lg px-8 py-3 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Plans & Pricing
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;