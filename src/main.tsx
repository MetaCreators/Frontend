import { useEffect, ReactNode } from "react";
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
import AuthCallback from "./pages/SignUp/AuthCallback.tsx";
import Home from "./pages/Landing/home.tsx";
import Pricing from "./pages/Payment/Pricing.tsx";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import ImageGenerations from "./pages/UserImageGenerations/ImgGenerations.tsx";

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
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email-confirmation",
    element: <EmailConfirmation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      //   <Dashboard />
      // </ProtectedRoute>
      <Dashboard />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/thumbnail",
    element: (
      <ProtectedRoute>
        <ThumbnailPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/script",
    element: (
      <ProtectedRoute>
        <ScriptPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/description",
    element: (
      <ProtectedRoute>
        <DescriptionPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/imagefinetune",
    element: (
      <ProtectedRoute>
        <FineTuneImage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <Pricing />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

  {
    path: "/generations",
    element: (
      <ProtectedRoute>
        <ImageGenerations />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
 
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster visibleToasts={1} />
    </AuthProvider>

);
