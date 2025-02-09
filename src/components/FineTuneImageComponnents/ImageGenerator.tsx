import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, ImageOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleImageError = (imageUrl: string) => {
    setImageLoadErrors((prev) => ({
      ...prev,
      [imageUrl]: true,
    }));
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `generated-image-${Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download image. Please try again.");
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setError(null);
    setImageLoadErrors({});

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("Please log in to generate images.");
        return;
      }

      const response = await fetch(`${VITE_BACKEND_URL}api/genpersonimage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userQuery: prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();
      console.log("Generated Image URLs:", data);

      if (data.urls && Array.isArray(data.urls)) {
        setGeneratedImages(data.urls);
        console.log("Updated generated images:", data.urls);
      } else {
        throw new Error("Invalid response format from server");
      }

      setPrompt("");
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate image. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your image idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              className="flex-1"
            />
            <Button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="min-w-[120px]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
          )}

          <div className="grid gap-6">
            {generatedImages.map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className="relative group rounded-lg overflow-hidden shadow-lg bg-gray-50"
              >
                {imageLoadErrors[imageUrl] ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-500">
                    <ImageOff className="h-12 w-12 mb-2" />
                    <p>Failed to load image</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(imageUrl)}
                      className="mt-2"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Anyway
                    </Button>
                  </div>
                ) : (
                  <>
                    <picture>
                      <source srcSet={imageUrl} type="image/webp" />
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-auto"
                        loading="lazy"
                        onError={() => handleImageError(imageUrl)}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDownload(imageUrl)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
