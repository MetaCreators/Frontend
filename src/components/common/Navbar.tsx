import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const reRoute = (value: string) => {
    navigate(`/${value}`);
  };
  return (
    <div className="flex justify-between items-center px-10 py-4 sticky top-0 bg-white border border-b">
      <div className="text-2xl font-bold text-[#1a237e]">
        <img src="/logo.png" alt="logo" className="h-12 w-12" />
      </div>
      <div className="flex items-center space-x-3 font-medium text-slate-500">
        <div>About</div>
        <div>Contact</div>
        <Select onValueChange={reRoute}>
          <SelectTrigger className="border-none shadow-none">
            <SelectValue placeholder="Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thumbnail">Thumbnail generator</SelectItem>
            <SelectItem value="script">Script generator</SelectItem>
            <SelectItem value="description">Description generator</SelectItem>
            <SelectItem value="VirtualHouse">Virtual House</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Navbar;
