import { useState } from "react";
import { Button } from "../ui/button";
import { GeneratedImgCarousel } from "./GeneratedImgCarousel";
import { supabase } from "@/lib/supabase";
import { Loader } from "lucide-react";
import { showToast } from "../common/ToastComponent";
import { useNavigate } from "react-router-dom";

function GeneratorSection() {
  const [idea, setIdea] = useState("");
  const [userStyle, setUserStyle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [images, setImages] = useState([]);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function generateImages(idea: string) {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authentication");
      }

      setLoading(true);

      const response = await fetch(`${VITE_BACKEND_URL}/thumbnail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
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
        setLoading(false);
        setImages(data.images);
        showToast(
          "Thumbnail",
          () => navigate("/script"),
          () => navigate("/description"),
          "Script",
          "Description"
        );
      } else {
        throw new Error("Unexpected response format from the server.");
      }
    } catch (error) {
      console.error("Error generating images:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-slate-100 mx-4 md:mx-10 mb-8 rounded-2xl p-6 gap-6">
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
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Thumbnail"
            )}
          </Button>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex justify-center items-center">
        <GeneratedImgCarousel images={images} />
      </div>
    </div>
  );
}

export default GeneratorSection;
