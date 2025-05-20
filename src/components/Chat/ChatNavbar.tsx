import { MenuSquare } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const ChatNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-chatOverlay font-sans my-2 mx-6 rounded-md flex justify-between py-2 px-4">
      <div className="flex space-x-2 justify-center items-center">
        <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-md border border-sky-500" />
        <div className="text-2xl">
          Lithouse
        </div>
      </div>
      <div className="flex space-x-7 justify-center items-center">
        <Button className="bg-inherit text-black border-black border-2">
          <img src="/credits.png" alt="logo" className="h-10 w-10 rounded-md" />
          40
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-12 w-12 p-0">
              <MenuSquare className="h-12 w-12"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            {/* Add other menu items here */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatNavbar;