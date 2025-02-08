import React, { useRef, useState } from "react";

interface ImageSliderProps {
  defaultImage: string; // Corrected the prop name
  generatedImage: string; // To pass the generated image
}

const ImageComparisonSlider: React.FC<ImageSliderProps> = ({
  defaultImage,
  generatedImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Default position (50%)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left; // X position relative to the container
    const width = rect.width;

    let newPosition = (offsetX / width) * 100; // Calculate percentage
    newPosition = Math.max(0, Math.min(newPosition, 100)); // Clamp between 0 and 100
    setSliderPosition(newPosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.touches[0].clientX - rect.left; // X position relative to the container
    const width = rect.width;

    let newPosition = (offsetX / width) * 100; // Calculate percentage
    newPosition = Math.max(0, Math.min(newPosition, 100)); // Clamp between 0 and 100
    setSliderPosition(newPosition);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        borderRadius: "12px",
        cursor: "grab",
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image */}
      <img
        src={generatedImage}
        alt="Before"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Before Image */}
      <img
        src={defaultImage}
        alt="After"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, // Clip the image
        }}
      />

      {/* Slider Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          width: "2px",
          height: "100%",
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      ></div>

      {/* Slider Handle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${sliderPosition}%`,
          transform: "translate(-50%, -50%)",
          width: "20px",
          height: "20px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          border: "2px solid #000",
          zIndex: 3,
          cursor: "pointer",
        }}
      ></div>

      {/* Before/After Labels */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#000",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "8px",
          zIndex: 4,
        }}
      >
        Before
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#000",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "8px",
          zIndex: 4,
        }}
      >
        After
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
