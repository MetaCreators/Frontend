import React, { useState } from "react";
import useCounterStore from "../../store/counterstore";
import { PlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonProps {
  triggerFunction: () => void; // Function passed as a prop
}

const Modalcontainer: React.FC<ButtonProps> = ({ triggerFunction }) => {
  const [selectedFilter, setSelectedFilter] = useState<number>(2);
  const { image_coming_from_BE } = useCounterStore();

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-3 space-x-2 rounded-xl w-auto hover:bg-gray-200 border-stone-300 border">
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="flex flex-col items-center justify-center text-gray-700 rounded-md transition border-2 border-stone-400 p-2"
            onClick={triggerFunction}
          >
            <PlusIcon className="h-full w-full" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new model</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Modalcontainer;
