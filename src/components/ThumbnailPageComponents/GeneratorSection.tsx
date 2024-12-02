import { useState } from "react";
import { Button } from "../ui/button";
import { GeneratedImgCarousel } from "./GeneratedImgCarousel";

function GeneratorSection() {
  const [idea, setIdea] = useState("");
  const [userStyle, setUserStyle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [images, setImages] = useState([]);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function generateImages(idea: string) {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/thumbnail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIdea: idea,
          userStyle: userStyle,
          targetAudience: targetAudience,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch images.");
      }

      const data = await response.json();

      if (data.success) {
        console.log(data.images);
        setImages(data.images);
      } else {
        throw new Error("Unexpected response format from the server.");
      }
    } catch (error) {
      console.error("Error generating images:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-slate-100 mx-4 md:mx-10 mb-8 rounded-2xl p-6 gap-6">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-center">
          Make Your Content Click-Worthy!
        </h2>
        <div className="flex flex-col md:flex-row items-center w-full gap-4">
          <div className="flex flex-col w-full space-y-3">
            <input
              placeholder="Type in your idea here"
              className="border rounded-xl p-3 h-10 w-full md:w-3/4 border-slate-400"
              onChange={(e) => setIdea(e.target.value)}
            />
            <input
              placeholder="Type in your style here"
              className="border rounded-xl p-3 h-10 w-full md:w-3/4 border-slate-400"
              onChange={(e) => setUserStyle(e.target.value)}
            />
            <input
              placeholder="Type in your target audience here"
              className="border rounded-xl p-3 h-10 w-full md:w-3/4 border-slate-400"
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>

          <Button
            onClick={() => generateImages(idea)}
            className="w-full md:w-auto"
          >
            Generate
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex justify-center items-center">
        <GeneratedImgCarousel images={images} />
      </div>
    </div>
  );
}

export default GeneratorSection;
