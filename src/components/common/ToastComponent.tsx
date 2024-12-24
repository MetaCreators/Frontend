import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const showToast = (
  item: string,
  onThumbnailClick: () => void,
  onScriptClick: () => void,
  other1: string,
  other2: string
) => {
  toast.custom(
    (t) => (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">
          Your {item} is ready for review!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Do you want try our other tools?
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              onThumbnailClick();
              toast.dismiss(t);
            }}
          >
            View {other1} Generator
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              onScriptClick();
              toast.dismiss(t);
            }}
          >
            Go to {other2} Generator
          </Button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
