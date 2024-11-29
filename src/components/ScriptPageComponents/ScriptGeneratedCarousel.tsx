import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface GeneratedScriptProps {
  error: string;
  script: string;
}

export function ScriptGeneratedCarousel({
  error,
  script,
}: GeneratedScriptProps) {
  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {script && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Script</h2>
          <Textarea
            value={script}
            readOnly
            className="min-h-[300px] whitespace-pre-wrap mb-4"
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(script)}
            >
              Copy to Clipboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
