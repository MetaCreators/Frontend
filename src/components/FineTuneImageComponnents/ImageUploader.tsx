import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageUploader() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setUploadedImages(Array.from(event.target.files));
      }
    },
    []
  );

  const handleUpload = useCallback(async () => {
    setIsTraining(true);
    // Simulating API call to train AI
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsTraining(false);
    alert("AI training completed!");
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p>{uploadedImages.length} images selected</p>
          <Button
            onClick={handleUpload}
            disabled={uploadedImages.length === 0 || isTraining}
          >
            {isTraining ? "Training AI..." : "Train AI with Uploaded Images"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
