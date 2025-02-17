import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-destructive" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>

        <div className="space-y-2">
          <p className="text-xl text-muted-foreground">
            Sorry, something went wrong
          </p>
          <p className="text-sm text-muted-foreground">
            {error.statusText ||
              error.message ||
              "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="default"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <HomeIcon className="h-4 w-4" />
            Go Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
