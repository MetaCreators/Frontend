import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";


const ImageGenerations: React.FC = () => {
    const [images, setImages] = useState<{id: string, cloudUrl: string | null}[]>([]);

    const getImgs = async () => { 
        try {
            const getImages = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/getgeneratedimages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId:"01f90e3d-171d-4313-8985-f25ccd5cd915",
                    modelId:"31c58651-e0a3-4ca1-a32e-0dad450f8171",
                }),
            });

            if (!getImages.ok) {
                throw new Error('Failed to get user generated images');
            }

            const { images } = await getImages.json();
            setImages(images);
            console.log(images);
            
        
        } catch (err) {
          console.error('Failed to get user generated images from backend', err);
        }
    }

    return (
        <>
            <Navbar />
            <Button onClick={getImgs}>
                    Get your images
            </Button>
            <div className="flex justify-center items-center h-screen">    
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-sm"
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                        <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {image.cloudUrl && (
                                        <img 
                                            src={image.cloudUrl} 
                                            alt={`Generated image ${index + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
      </>
     
  );
};

export default ImageGenerations;
