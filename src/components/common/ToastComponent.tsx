import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const showToast = (
  item: string,
  onThumbnailClick: () => void,
  onScriptClick: () => void
) => {
  toast.custom(
    (t) => (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">
          {item} Generated Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your thumbnails are ready for review.
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
            View Thumbnails
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              onScriptClick();
              toast.dismiss(t);
            }}
          >
            Go to Script
          </Button>
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
