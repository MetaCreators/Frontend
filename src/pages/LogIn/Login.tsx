import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-white p-8 flex flex-col jutify-between">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-[#1a237e] cursor-pointer"
        >
          LitHouse
        </h1>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-bold text-[#1a237e] mb-8">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#1a237e] hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0F172A] p-8">
        <div className="h-full flex items-center justify-center">
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
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
