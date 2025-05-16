import { motion } from "framer-motion";
import VideoSlider from "./VideoSlider";

const ProductPreview: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-100 rounded-3xl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl font-bold font-poppins"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get to know LitHouse.
          </motion.h2>

          <motion.a
            href="#use-product"
            className="text-lithouse-blue font-medium hover:underline"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Use the Product
          </motion.a>
        </div>

        <VideoSlider />
      </div>
    </section>
  );
};

export default ProductPreview;
