import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";

interface GeneratedDescriptionProps {
  error: string;
  description: string;
}

export function DescriptionGeneratedCarousel({
  error,
  description,
}: GeneratedDescriptionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {description && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={description}
              readOnly
              className="h-40 resize-none"
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
