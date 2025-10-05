import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routers } from "./routers/routers";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routers}></RouterProvider>
  </StrictMode>
);
