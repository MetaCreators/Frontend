// src/pages/SignUp.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
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
          emailRedirectTo: `${import.meta.env.VITE_FRONTEND_URL}/dashboard`,
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
          redirectTo: `${import.meta.env.VITE_FRONTEND_URL}/dashboard`,
          //redirectTo: "http://localhost:5174/dasboard",
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
