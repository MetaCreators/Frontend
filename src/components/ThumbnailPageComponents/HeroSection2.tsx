import { Button } from "../ui/button";

function HeroSection2() {
  return (
    <div className="bg-slate-900 h-96 flex justify-between text-white">
      <div className="w-1/2 border-r border-white flex justify-center items-center text-left">
        <div className="border-white border w-3/4">
          <div>Personalized Recommendations</div>
          <div className="text-wrap text-3xl font-bold">
            Tailor made for your brand
          </div>
          <div className="text-wrap">Boost your video performance</div>
          <Button className="mt-2" variant="destructive">
            Try it Now
          </Button>
        </div>
      </div>
      <div>hi</div>
    </div>
  );
}

export default HeroSection2;
