import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        })
        .then(() => {
          navigate("/dashboard", { replace: true });
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default AuthCallback;
