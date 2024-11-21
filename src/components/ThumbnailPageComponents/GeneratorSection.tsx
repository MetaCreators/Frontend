import { GeneratedImgCarousel } from "./GeneratedImgCarousel";
import UserIdeaInput from "./UserIdeaInput";

function GeneratorSection() {
  return (
    <div className="h-96 flex bg-slate-100 mx-10 mb-8 rounded-2xl">
      <div className="w-1/3 flex justify-center items-center">
        <UserIdeaInput />
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <GeneratedImgCarousel />{" "}
      </div>
    </div>
  );
}

export default GeneratorSection;
