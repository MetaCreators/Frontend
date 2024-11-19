import { Button } from "../ui/button";
import tailor from "../../assets/highViews.jpg";

function HeroSection3() {
  return (
    <div className="bg-white h-96 flex justify-between text-black">
      <div className="w-1/2 flex justify-center items-center">
        <img src={tailor} className="h-80 w-80 rounded-lg" />
      </div>
      <div className="w-1/2 flex justify-center items-center text-left">
        <div className="w-3/4">
          <div className="text-slate-500">Discover the Possibilities</div>
          <div className="text-wrap text-3xl font-bold">
            Unleash the full potential of your videos
          </div>
          <div className="text-slate-700">Boost your video performance</div>
          <Button className="mt-2">Create Thumbnails</Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection3;
