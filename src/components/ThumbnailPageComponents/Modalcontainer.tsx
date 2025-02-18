import React, { useState } from "react";
import useCounterStore from "../../store/counterstore";

interface ButtonProps {
  triggerFunction: () => void; // Function passed as a prop
}

const Modalcontainer: React.FC<ButtonProps> = ({ triggerFunction }) => {
  const [selectedFilter, setSelectedFilter] = useState<number>(2);
  const { image_coming_from_BE,  } = useCounterStore(); // ✅ Changed 'counter' to 'count'

  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md w-auto">
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

      {/* More Button */}
      <button
        onClick={triggerFunction}
        className="w-auto h-14 flex flex-col items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
      >
        <span className="text-lg font-bold">Create new Model</span>
       
      </button>
    </div>
  );
};

export default Modalcontainer;
