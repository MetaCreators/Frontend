import { Button } from "../ui/button";

function HeroSection1() {
  return (
    <div className="flex flex-col justify-center items-center h-80">
      <div className="text-wrap w-1/2 text-center space-y-5">
        <div className="text-5xl font-semibold">
          Generate Stunning thumbnails for your videos
        </div>
        <div className="font-thin text-lg">
          <div>
            Elevate your content with our powerful AI-driven thumbnail generator
          </div>
          <div>Effortlessly create eye-catching content</div>
        </div>
      </div>
      <Button className="mt-8" variant="destructive">
        Try it Now
      </Button>
    </div>
  );
}

export default HeroSection1;
