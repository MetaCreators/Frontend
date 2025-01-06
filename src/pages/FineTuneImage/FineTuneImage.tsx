import ImageGenerator from "@/components/FineTuneImageComponnents/ImageGenerator";
import ImageUploader from "@/components/FineTuneImageComponnents/ImageUploader";

function FineTuneImage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">AI Image Generator</h1>
      <div className="w-full max-w-4xl space-y-12">
        <ImageUploader />
        <ImageGenerator />
      </div>
    </div>
  );
}

export default FineTuneImage;
