
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Menu, X } from 'lucide-react';

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <motion.nav 
      className="sticky top-0 z-50 py-4 bg-white/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Home className="text-orange-500" size={24} />
          <span className="font-poppins font-bold text-xl">LitHouse</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="#features" className="font-medium hover:text-lithouse-blue transition-colors">Features</a>
            <a href="#reviews" className="font-medium hover:text-lithouse-blue transition-colors">Reviews</a>
            <a href="#lithouse" className="font-medium hover:text-lithouse-blue transition-colors">LitHouse</a>
            <a href="#discord" className="font-medium hover:text-lithouse-blue transition-colors">Discord</a>
            <a href="#login" className="font-medium hover:text-lithouse-blue transition-colors">Login</a>
          </div>
          <div className="flex items-center space-x-3">
            <motion.a 
              href="#signup"
              className="px-6 py-2 border border-gray-300 rounded-full font-medium text-sm hover:border-lithouse-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up
            </motion.a>
            <motion.a 
              href="#try"
              className="px-6 py-2 bg-lithouse-blue text-white rounded-full font-medium text-sm shadow-md hover:bg-opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try for free
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white py-4 px-4 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col space-y-4">
            <a href="#features" className="font-medium hover:text-lithouse-blue transition-colors">Features</a>
            <a href="#reviews" className="font-medium hover:text-lithouse-blue transition-colors">Reviews</a>
            <a href="#lithouse" className="font-medium hover:text-lithouse-blue transition-colors">LitHouse</a>
            <a href="#discord" className="font-medium hover:text-lithouse-blue transition-colors">Discord</a>
            <a href="#login" className="font-medium hover:text-lithouse-blue transition-colors">Login</a>
            <div className="flex flex-col space-y-2 pt-2">
              <a href="#signup" className="px-6 py-2 border border-gray-300 rounded-full font-medium text-sm text-center hover:border-lithouse-blue">Sign up</a>
              <a href="#try" className="px-6 py-2 bg-lithouse-blue text-white rounded-full font-medium text-sm text-center shadow-md">Try for free</a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NewNavbar;