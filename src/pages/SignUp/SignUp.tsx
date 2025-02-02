// src/pages/SignUp.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

const GoogleLogo = () => (
  <svg
    className="w-5 h-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    />
  </svg>
);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/dashboard",
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user && data.user.identities?.length === 0) {
        setError("This email is already registered. Please log in instead.");
        return;
      }

      navigate("/email-confirmation", {
        state: { email },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/dashboard",
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Google authentication failed"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-[#1a237e] cursor-pointer"
          >
            LitHouse
          </h1>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-bold text-[#1a237e]">
              Create Account
            </h2>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="h-12"
                  required
                />
              </div>

              {error && <Alert variant="destructive">{error}</Alert>}

              <Button
                type="submit"
                className="w-full h-12 bg-[#ef5350] rounded-full hover:bg-blue-500 text-white"
                disabled={loading || googleLoading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full h-12 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center"
              disabled={googleLoading || loading}
            >
              <GoogleLogo />
              {googleLoading
                ? "Signing in with Google..."
                : "Continue with Google"}
            </Button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#1a237e] hover:underline font-medium"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-[#0F172A] p-12 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Simplifying Content Creation
            </h2>
            <p className="text-xl text-gray-300">
              Unleash your creativity with our suite of AI-powered tools.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 text-gray-500 text-sm">
          <a href="#" className="hover:text-gray-700">
            Terms of use
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-700">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
}
