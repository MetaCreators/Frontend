import Footer from "@/components/ThumbnailPageComponents/Footer";
import GeneratorSection from "@/components/ScriptPageComponents/GeneratorSection";
import HeroSection1 from "@/components/ScriptPageComponents/HeroSection1";
import HeroSection2 from "@/components/ScriptPageComponents/HeroSection2";
import HeroSection3 from "@/components/ScriptPageComponents/HeroSection3";
import Navbar from "@/components/common/Navbar";

function ScriptPage() {
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

export default ScriptPage;
