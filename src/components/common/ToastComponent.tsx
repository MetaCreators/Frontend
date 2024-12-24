import { toast } from "sonner";
import { Button } from "@/components/ui/button";
//import { Toaster } from "@/components/ui/sonner";
export function ToastComponent() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
      {/* <Toaster closeButton={true} /> */}
    </Button>
  );
}
