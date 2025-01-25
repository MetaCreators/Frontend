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
        <div className="w-full h-96 flex flex-col justify-center items-center">
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
        <div className="w-full h-96 flex justify-evenly items-center px-6">
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
        </div>
        <div className="w-full h-96 flex justify-evenly items-center px-6">
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="text-left w-full">AI Thumbnail Generator</div>
            <div className="text-left w-full">
              Create stunning, customized thumbnails effortlessly with our
              AI-powered thumbnail generator.
            </div>
            <div className="text-left w-full">
              <Button className="w-1/2">Try now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
