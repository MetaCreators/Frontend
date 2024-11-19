import Footer from "@/components/ThumbnailPageComponents/Footer";
import GeneratorSection from "@/components/ThumbnailPageComponents/GeneratorSection";
import HeroSection1 from "@/components/ThumbnailPageComponents/HeroSection1";
import HeroSection2 from "@/components/ThumbnailPageComponents/HeroSection2";
import HeroSection3 from "@/components/ThumbnailPageComponents/HeroSection3";
import ThumbnailNavbar from "@/components/ThumbnailPageComponents/ThumbnailNavbar";

function ThumbailPage() {
  return (
    <div>
      <ThumbnailNavbar />
      <HeroSection1 />
      <GeneratorSection />
      <HeroSection2 />
      <HeroSection3 />
      <Footer />
    </div>
  );
}

export default ThumbailPage;
