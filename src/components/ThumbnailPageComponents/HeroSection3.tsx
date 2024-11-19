import { Button } from "../ui/button";

function HeroSection3() {
  return (
    <div className="bg-white h-96 flex justify-between text-black">
      <div>hi</div>
      <div className="w-1/2 border-l border-black flex justify-center items-center text-left">
        <div className="w-3/4">
          <div>Discover the Possibilities</div>
          <div className="text-wrap text-3xl font-bold">
            Unleash the full potential of your videos
          </div>
          <div className="text-wrap">Boost your video performance</div>
          <Button className="mt-2">Create Thumbnails</Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection3;
