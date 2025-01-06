import { StrictMode, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { useAuth } from "./context/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThumbnailPage from "./pages/Thumbnail/Thumbail.tsx";
import ScriptPage from "./pages/Script/Script.tsx";
import DescriptionPage from "./pages/Description/Description.tsx";
import Login from "./pages/LogIn/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import EmailConfirmation from "./pages/EmailConfirmation/EmailConfirmation.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import FineTuneImage from "./pages/FineTuneImage/FineTuneImage.tsx";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/email-confirmation",
    element: <EmailConfirmation />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/thumbnail",
    element: (
      <ProtectedRoute>
        <ThumbnailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/script",
    element: (
      <ProtectedRoute>
        <ScriptPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/description",
    element: (
      <ProtectedRoute>
        <DescriptionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/finetune",
    element: (
      <ProtectedRoute>
        <FineTuneImage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster visibleToasts={1} />
    </AuthProvider>
  </StrictMode>
);
