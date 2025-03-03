import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
