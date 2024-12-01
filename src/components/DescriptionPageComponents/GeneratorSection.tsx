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
    <div className="flex flex-col md:flex-row bg-slate-100 mx-4 md:mx-10 mb-8 rounded-2xl p-6 gap-6">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-center">
          YouTube Description Generator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="space-y-2">
            <label htmlFor="script" className="text-sm font-medium">
              Video Script
            </label>
            <Textarea
              id="script"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste your video script here..."
              className="h-48 resize-none w-full border rounded-xl p-3"
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
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex justify-center items-center">
        <DescriptionGeneratedCarousel
          error={error}
          description={description}
        />
      </div>
    </div>
  );
}

export default GeneratorSection;
