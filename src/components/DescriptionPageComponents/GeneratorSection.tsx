import { useState } from "react";
import { Button } from "../ui/button";
import { DescriptionGeneratedCarousel } from "./DescriptionGeneratedCarousel";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

function GeneratorSection() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!script.trim()) {
      setError("Please provide a script.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate description");
      }

      setDescription(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-96 flex bg-slate-100 mx-10 mb-8 rounded-2xl">
      <div className="w-1/3 flex justify-center items-center">
        <div className="space-y-6 ">
          <div>YouTube Descripition Generator</div>
          <div className="flex justify-center items-center space-x-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="script" className="text-sm font-medium">
                  Video Script
                </label>
                <Textarea
                  id="script"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Paste your video script here..."
                  className="h-48 resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Description"
                )}
              </Button>
            </form>
            <DescriptionGeneratedCarousel
              error={error}
              description={description}
            />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex justify-center items-center"></div>
    </div>
  );
}

export default GeneratorSection;
