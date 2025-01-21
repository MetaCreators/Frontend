// src/pages/SignUp.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const redirectUrl = import.meta.env.VITE_APP_URL + "/dashboard";

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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-[#1a237e] cursor-pointer"
          >
            LitHouse
          </h1>
        </div>

        {/* Form Container */}
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
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

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

      {/* Right Section */}
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

        {/* Privacy Links */}
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

{
  /* <div className="w-1/2 bg-[#0F172A] p-12 flex flex-col">
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
      </div> */
}
