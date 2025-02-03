import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const AnimatedButton = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group">
      {selected && (
        <div className="absolute h-[39px] w-full overflow-hidden rounded-full">
          <style>
            {`
              .pricing-toggle:before {
                content: "";
                position: absolute;
                top: -110%;
                left: 40%;
                width: 20%;
                height: 337%;
                background: linear-gradient(#1E88E5, #ef5350);
                animation: animate 3s linear infinite;
              }

              @keyframes animate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <div className="pricing-toggle absolute inset-0" />
          <div className="absolute inset-[1px] bg-background rounded-full" />
        </div>
      )}
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "relative rounded-full px-10 py-3 transition-all duration-200 z-10",
          selected && "text-foreground",
          !selected && "text-muted-foreground hover:text-blue-500"
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default AnimatedButton;
