import { Button } from "../ui/button";
import tailor from "../../assets/highViews.jpg";

function HeroSection2() {
  return (
    <div className="bg-slate-900 h-96 flex justify-between text-white">
      <div className="w-1/2 flex justify-center items-center text-left">
        <div className="w-3/4">
          <div className="text-slate-400">Personalized Recommendations</div>
          <div className="text-wrap text-3xl font-bold">
            Tailor made for your brand
          </div>
          <div className="text-wrap text-slate-400">
            Boost your video performance
          </div>
          <Button className="mt-2" variant="destructive">
            Try it Now
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src={tailor} className="h-80 w-80 rounded-lg" />
      </div>
    </div>
  );
}

export default HeroSection2;
