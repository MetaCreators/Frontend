import { Button } from "@/components/ui/button";
import { Calendar, Linkedin, Twitter, Youtube } from "lucide-react";

function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-1/2 border-black border-[1] shadow-md rounded-full mt-4 flex justify-between px-6 py-4 items-center">
          <div>logo</div>
          <div className="flex space-x-3 text-slate-500 font-bold">
            <div>Products</div>
            <div>About us</div>
          </div>
          <div className="border-2 border-slate-400 shadow-md p-1 px-2 rounded-sm text-black font-bold">
            Book a call
          </div>
        </div>
        <div className="w-full h-96 flex flex-col space-y-8 justify-center items-center">
          <div className="flex space-x-4 text-7xl font-semibold">
            <div className=" text-gray-600 ">
              Create Better. Create Faster. Create
            </div>
            <div className="text-black">More.</div>
          </div>

          <div className="text-zinc-500 text-xl font-semibold">
            With our state of the art ,cutting edge, platform, you can create
            content faster than you can imagine
          </div>
          <div className="space-x-2">
            <Button>Create Account</Button>
            <Button className="bg-white text-black hover:bg-black hover:text-white">
              Book a call
            </Button>
          </div>
        </div>
        <div className="w-full h-96 flex justify-evenly items-center px-6 py-6 space-x-4">
          <div className="flex flex-col justify-start items-center w-1/3">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>

          <div className="flex justify-center border-8 border-violet-600 items-center w-2/3 h-full">
            <div className="w-1/2 h-full border-r-8 border-white relative bg-red-500 justify-center flex">
              <img
                src="/Shikhar_7.jpg"
                alt="shikhar_before"
                className="w-full h-full"
              />
              <div className="absolute">
                <img
                  src="https://s2.svgbox.net/pen-brushes.svg?ic=brush-1"
                  alt="Brush"
                  className="h-16 w-40 fill-slate-600 relative"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                  ORIGINAL
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full border-l-8 border-white relative bg-red-500 justify-center flex">
              <img
                src="/Shikhar_AI.png"
                alt="shikhar_before"
                className="w-full h-full"
              />
              <div className="absolute">
                <img
                  src="https://s2.svgbox.net/pen-brushes.svg?ic=brush-1"
                  alt="Brush"
                  className="h-16 w-52 fill-slate-600 relative"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                  AI GENERATED
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 flex justify-evenly items-center px-6 py-6 space-x-4">
          <div className="flex flex-col justify-start items-center w-1/3">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>

          <div className="flex justify-center border-8 border-violet-600 items-center w-2/3 h-full">
            <div className="w-1/2 h-full border-r-8 border-white relative bg-red-500 justify-center flex">
              <img
                src="/Shikhar_7.jpg"
                alt="shikhar_before"
                className="w-full h-full"
              />
              <div className="absolute">
                <img
                  src="https://s2.svgbox.net/pen-brushes.svg?ic=brush-1"
                  alt="Brush"
                  className="h-16 w-40 fill-slate-600 relative"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                  ORIGINAL
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full border-l-8 border-white relative bg-red-500 justify-center flex">
              <img
                src="/Shikhar_AI.png"
                alt="shikhar_before"
                className="w-full h-full"
              />
              <div className="absolute">
                <img
                  src="https://s2.svgbox.net/pen-brushes.svg?ic=brush-1"
                  alt="Brush"
                  className="h-16 w-52 fill-slate-600 relative"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
                  AI GENERATED
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 flex justify-evenly items-center px-24 space-x-6">
          <div className="w-full h-full flex justify-center items-center bg-teal-100 border rounded-2xl">
            <div className="w-1/2 h-1/2 flex justify-center items-center bg-white px-3 rounded-lg shadow">
              <div>
                <div>AI Script Generator</div>
                <div>
                  Create customized, high-quality scripts in seconds using our
                  AI Script Generator
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div>
              <div className="text-4xl font-semibold">AI Script Generator</div>
              <div className="text-lg">
                Create customized, high-quality scripts in seconds using our AI
                Script Generator
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 flex justify-evenly items-center px-24 space-x-6 my-14">
          <div className=" w-full h-full flex justify-center items-center bg-teal-100">
            <div className=" w-1/2 h-1/2 flex justify-center items-center bg-white px-3 rounded-lg shadow">
              <div>
                <div>AI Script Generator</div>
                <div>
                  Create customized, high-quality scripts in seconds using our
                  AI Script Generator
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full h-full flex flex-col justify-center items-center">
            <div>
              <div className="flex text-4xl font-semibold">
                AI Youtube Video Description Generator
              </div>
              <div className="text-lg">
                Craft engaging, tailored YouTube video descriptions effortlessly
                with our AI-powered generator.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-52 bg-gradient-to-r from-white from-50% via-slate-500 to-black to-80% flex items-center space-x-6 px-9">
          <div className="w-1/2 h-1/2 flex justify-start items-center bg-white flex-col px-8 py-5">
            <div className="flex space-x-3 w-full">
              <div>logo</div>
              <div>Lithouse</div>
            </div>
            <div className="w-full">
              Simplifies content creation with AI tools and a virtual space for
              collaboration, connecting creators and professionals seamlessly.
            </div>
          </div>
          <div className="w-1/2 h-1/2 flex justify-center items-center text-white space-x-11">
            <Linkedin />
            <Twitter />
            <Youtube />
            <Calendar />
          </div>
        </div>
        <div className="border border-black w-full h-40 flex justify-center bg-slate-950 items-center space-x-6 px-9 text-white">
          @2025 Lithouse in. All rights reserved
        </div>
      </div>
    </div>
  );
}

export default Home;
