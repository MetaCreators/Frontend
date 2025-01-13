import ImageGenerator from "@/components/FineTuneImageComponnents/ImageGenerator";
import ZipUpload from "@/components/FineTuneImageComponnents/ZipUpload";

function FineTuneImage() {
  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  return (
    <div style={{ backgroundColor: "#0B132B" }} className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <h1 className="text-4xl font-bold mb-8">AI File Processor</h1>
      <div className="w-full max-w-4xl space-y-12">
        <ZipUpload onUpload={handleFileUpload} />
        <ImageGenerator />
      </div>
    </div>
  );
}

export default FineTuneImage;
