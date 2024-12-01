import { Button } from "../ui/button";

function HeroSection1() {
  return (

    <>
    <div className="flex flex-col justify-center items-center h-auto md:h-80 px-4">
      <div className="text-wrap w-full md:w-1/2 text-center space-y-5">
        <div className="text-3xl md:text-5xl font-semibold leading-tight">
          Generate Stunning thumbnails for your videos
        </div>
        <div className="font-thin text-sm md:text-lg space-y-2">
          <div>
            Elevate your content with our powerful AI-driven thumbnail generator
          </div>
          <div>Effortlessly create eye-catching content</div>
        </div>
      </div>
      <Button className="mt-6 md:mt-8" variant="destructive">
        Try it Now
      </Button>
      

    </div>
<div style={{height:'3%',visibility:'hidden'}}>h</div>
   
    </>

  );
}

export default HeroSection1;
