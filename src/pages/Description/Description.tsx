import Footer from "@/components/DescriptionPageComponents/Footer";
import GeneratorSection from "@/components/DescriptionPageComponents/GeneratorSection";
import HeroSection1 from "@/components/DescriptionPageComponents/HeroSection1";
import HeroSection2 from "@/components/DescriptionPageComponents/HeroSection2";
import HeroSection3 from "@/components/DescriptionPageComponents/HeroSection3";
import Navbar from "@/components/common/Navbar";

function DescripitionPage() {
  return (
    <div>
      <Navbar />
      <HeroSection1 />
      <GeneratorSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer />
    </div>
  );
}

export default DescripitionPage;
