import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="border w-1/2 border-black rounded-xl mt-2 flex justify-between px-2 py-1 items-center">
          <div>logo</div>
          <div className="flex space-x-3">
            <div>feature</div>
            <div>about us</div>
          </div>
          <div className="border border-black p-1 px-2 rounded-sm">
            book a call
          </div>
        </div>
        <div className="border border-black w-full h-96 flex flex-col justify-center items-center">
          <div>Create Better. Create Faster. Create More.</div>
          <div>
            With our state of the art ,cutting edge, platform, you can create
            content faster than you can imagine
          </div>
          <div className="space-x-2">
            <Button>Create Account</Button>
            <Button className="bg-white text-black">Book a call</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
