"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    // Simulating API call to generate image
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGeneratedImage("/placeholder.svg?height=300&width=300");
    setIsGenerating(false);
  }, [prompt]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your image idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={!prompt || isGenerating}>
            {isGenerating ? "Generating..." : "Generate Image"}
          </Button>
          {generatedImage && (
            <div className="mt-4">
              <img
                src={generatedImage}
                alt="Generated"
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
