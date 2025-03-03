import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
