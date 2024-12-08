import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmailConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#1a237e] mb-4">
          Check your email
        </h1>

        <p className="text-gray-600 mb-6">
          We've sent a confirmation email to:
          <span className="font-semibold block mt-2">{email}</span>
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Click the link in the email to confirm your account. The link will
          expire in 24 hours.
        </p>

        <div className="space-y-4">
          {/* <Button
            onClick={() => navigate("/login")}
            className="w-full h-12 bg-[#ef5350] hover:bg-[#e53935] text-white"
          >
            Back to Login
          </Button> */}

          <Button
            onClick={() => navigate("/signup")}
            variant="outline"
            className="w-full h-12"
          >
            Try different email
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Didn't receive the email?{" "}
          <button
            className="text-[#1a237e] hover:underline font-medium"
            onClick={() => {
              // Add resend email functionality here if needed
            }}
          >
            Click to resend
          </button>
        </div>
      </div>
    </div>
  );
}
