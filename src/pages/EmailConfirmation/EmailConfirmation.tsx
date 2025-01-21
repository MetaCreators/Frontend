import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "@/components/ui/alert";

export default function EmailConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [error, setError] = useState("");

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email address not found. Please try signing up again.");
      return;
    }

    setResendLoading(true);
    setResendMessage("");
    setError("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      setResendMessage("Confirmation email resent successfully!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resend confirmation email"
      );
    } finally {
      setResendLoading(false);
    }
  };

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

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        {resendMessage && (
          <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
            {resendMessage}
          </Alert>
        )}

        <div className="space-y-4">
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
            className="text-[#1a237e] hover:underline font-medium disabled:opacity-50"
            onClick={handleResendEmail}
            disabled={resendLoading}
          >
            {resendLoading ? "Resending..." : "Click to resend"}
          </button>
        </div>
      </div>
    </div>
  );
}
