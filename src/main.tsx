import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThumbailPage from "./pages/Thumbnail/Thumbail.tsx";
import ScriptPage from "./pages/Script/Script.tsx";
import DescripitionPage from "./pages/Description/Description.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/thumbnail",
    element: <ThumbailPage />,
  },
  {
    path: "/script",
    element: <ScriptPage />,
  },
  {
    path: "/description",
    element: <DescripitionPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
