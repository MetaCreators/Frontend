import Footer from "@/components/ThumbnailPageComponents/Footer";
import GeneratorSection from "@/components/ScriptPageComponents/GeneratorSection";
import HeroSection1 from "@/components/ScriptPageComponents/HeroSection1";
import HeroSection2 from "@/components/ScriptPageComponents/HeroSection2";
import HeroSection3 from "@/components/ScriptPageComponents/HeroSection3";
import ScriptNavbar from "@/components/ScriptPageComponents/ScriptNavbar";

function ScriptPage() {
  return (
    <div>
      <ScriptNavbar />
      <HeroSection1 />
      <GeneratorSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer />
    </div>
  );
}

export default ScriptPage;
