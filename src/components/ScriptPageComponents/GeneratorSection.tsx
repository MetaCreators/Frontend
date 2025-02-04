import { useState } from "react";
import { Button } from "../ui/button";
import { ScriptGeneratedCarousel } from "./ScriptGeneratedCarousel";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Loader } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { showToast } from "../common/ToastComponent";
import { useNavigate } from "react-router-dom";

function GeneratorSection() {
  const [points, setPoints] = useState<string[]>([""]);
  const [length, setLength] = useState<string>("10 minutes");
  const [style, setStyle] = useState<string>("Informative");
  const [targetAudience, setTargetAudience] = useState<string>("Teens (13-18)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [script, setScript] = useState<string>("");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const addPoint = () => {
    setPoints([...points, ""]);
  };

  const removePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints.length ? newPoints : [""]);
  };

  const updatePoint = (index: number, value: string) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validPoints = points.filter((point) => point.trim());

    if (validPoints.length === 0) {
      setError("Please add at least one point");
      setLoading(false);
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      console.log("user session access token", session.access_token);

      const response = await fetch(`${VITE_BACKEND_URL}api/script`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          points: validPoints,
          length,
          style,
          targetAudience,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          "response not ok for script gen " + data.message ||
            "Failed to generate script"
        );
      }

      setScript(data.content);
      showToast(
        "Script",
        () => navigate("/thumbnail"),
        () => navigate("/description"),
        "Thumbnail",
        "Description"
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? "could not generate script: " + err.message
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto bg-slate-100 mx-4 md:mx-10 mb-8 rounded-2xl p-6 md:p-8">
      <div className="w-full flex flex-col md:flex-row justify-center items-start md:items-center gap-6 md:gap-10">
        <div className="space-y-6 w-full md:w-1/2">
          <div className="text-lg md:text-xl font-semibold text-center md:text-left">
            YouTube Script Generator
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {points.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={point}
                    onChange={(e) => updatePoint(index, e.target.value)}
                    placeholder={`Point ${index + 1}`}
                    className="flex-1"
                  />
                  {points.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePoint(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Length</label>
                <Input
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g., 10 minutes"
                />
              </div>

              <div>
                <label className="block text-sm">Style</label>
                <Input
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="e.g., Informative"
                />
              </div>

              <div>
                <label className="block text-sm">Target Audience</label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Teens (13-18)"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={addPoint}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Point
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Script"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <ScriptGeneratedCarousel error={error} script={script} />
        </div>
      </div>
    </div>
  );
}

export default GeneratorSection;
