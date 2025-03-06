import React, { useState } from "react";
import useCounterStore from "../../store/counterstore";

interface ButtonProps {
  triggerFunction: () => void;
}

const Modalcontainer: React.FC<ButtonProps> = ({ triggerFunction }) => {
  const [selectedFilter, setSelectedFilter] = useState<number>(2);
  const { image_coming_from_BE } = useCounterStore();

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl shadow-md w-auto">
      {image_coming_from_BE &&
        image_coming_from_BE.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedFilter(index)}
            className={`flex flex-col items-center cursor-pointer transition-all rounded-xl p-1 
              ${
                selectedFilter === index
                  ? "border-2 border-purple-500"
                  : "border border-transparent"
              }
              overflow-hidden`}
          >
            <img
              src={img}
              className="w-14 h-14 rounded-md object-cover"
              alt={`Uploaded ${index}`}
            />
          </div>
        ))}

      {/* Responsive "Create new Model" Button */}
      <button
        onClick={triggerFunction}
        className="w-full sm:w-auto h-14 px-4 flex items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition text-base font-semibold whitespace-nowrap"
      >
        Create new Model
      </button>
    </div>
  );
};

export default Modalcontainer;
