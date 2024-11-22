import { useState } from "react";
import { Button } from "../ui/button";
import { GeneratedImgCarousel } from "./GeneratedImgCarousel";

function GeneratorSection() {
  const [idea, setIdea] = useState("");
  const [images, setImages] = useState([]);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function generateImages(idea: string) {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/thumbnail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdea: idea }),
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
    <div className="h-96 flex bg-slate-100 mx-10 mb-8 rounded-2xl">
      <div className="w-1/3 flex justify-center items-center">
        <div className="space-y-6 ">
          <div>Make Your Content Click-Worthy!</div>
          <div className="flex justify-center items-center space-x-6">
            <input
              placeholder="Type in your idea here"
              className="border rounded-xl p-3 h-10 w-3/4  border-slate-400"
              onChange={(e) => setIdea(e.target.value)}
            />
            <Button onClick={() => generateImages(idea)}>Generate</Button>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <GeneratedImgCarousel images={images} />
      </div>
    </div>
  );
}

export default GeneratorSection;
